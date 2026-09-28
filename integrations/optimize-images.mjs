// @ts-check
/**
 * Image optimizer: runs after every build.
 *
 * Family photos are uploaded through the Studio into public/images/uploads,
 * which Astro's own <Image> component can't process. So after the site is
 * built, this finds every uploaded photo on every page and:
 *   - makes AVIF and WebP copies at a few widths (in /_img/),
 *   - wraps the <img> in a <picture> so browsers pick the smallest good one,
 *   - adds width and height so the page doesn't jump while photos load,
 *   - keeps loading="lazy" on everything except the first photo on a page.
 * The original JPG or PNG stays as the fallback. Nothing in the repo changes.
 * Converted images are cached in node_modules/.cache so rebuilds are quick.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const WIDTHS = [480, 800, 1200, 1600];
const FORMATS = /** @type {const} */ (['avif', 'webp']);
const DEFAULT_SIZES = '(min-width: 840px) 800px, 100vw';
const CACHE = path.resolve('node_modules/.cache/optimized-images');

/** @param {string} dir */
function htmlFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** @param {string} tag @param {string} name */
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

/**
 * @param {{ base?: string }} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function optimizeImages({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return {
    name: 'optimize-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const outDir = path.join(root, '_img');
        fs.mkdirSync(outDir, { recursive: true });
        fs.mkdirSync(CACHE, { recursive: true });

        /** @type {Map<string, { width: number; height: number; variants: Record<string, string> }>} */
        const done = new Map();
        let made = 0;
        let bytesBefore = 0;
        let bytesAfter = 0;

        /** Make (or reuse) the AVIF and WebP copies of one uploaded photo. @param {string} src */
        async function optimize(src) {
          if (done.has(src)) return done.get(src);
          const file = path.join(root, decodeURIComponent(src.slice(prefix.length)));
          if (!fs.existsSync(file)) return undefined;
          const buf = fs.readFileSync(file);
          const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
          const meta = await sharp(buf).rotate().metadata();
          // .rotate() applies the phone's orientation, so width and height match what people see.
          const upright = (meta.orientation ?? 1) >= 5;
          const width = (upright ? meta.height : meta.width) ?? 0;
          const height = (upright ? meta.width : meta.height) ?? 0;
          const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1) ?? width)])];
          const name = path.basename(file, path.extname(file));
          /** @type {Record<string, string>} */
          const variants = {};
          // Convert every size and format of this photo at once (sharp uses all CPU cores).
          const jobs = FORMATS.flatMap((format) =>
            widths.map(async (w) => {
              const out = `${name}-${hash}-${w}.${format}`;
              const cached = path.join(CACHE, out);
              if (!fs.existsSync(cached)) {
                const img = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
                await (format === 'avif' ? img.avif({ quality: 55, effort: 2 }) : img.webp({ quality: 78 })).toFile(cached);
                made++;
              }
              fs.copyFileSync(cached, path.join(outDir, out));
              if (format === 'webp' && w === widths.at(-1)) bytesAfter += fs.statSync(cached).size;
              return { format, entry: `${prefix}/_img/${out} ${w}w` };
            }),
          );
          const results = await Promise.all(jobs);
          for (const format of FORMATS) {
            variants[format] = results
              .filter((r) => r.format === format)
              .map((r) => r.entry)
              .join(', ');
          }
          bytesBefore += buf.length;
          const info = { width, height, variants };
          done.set(src, info);
          return info;
        }

        const uploads = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/images/uploads/[^"]+\\.(jpe?g|png)$`, 'i');
        for (const file of htmlFiles(root)) {
          let html = fs.readFileSync(file, 'utf8');
          const inMain = html.indexOf('<main');
          let first = true;
          /** @type {{ at: number; from: string; to: string }[]} */
          const swaps = [];
          for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
            const tag = match[0];
            const src = attr(tag, 'src');
            if (!src || !uploads.test(src)) continue;
            // Already inside a <picture>? Leave it alone.
            const before = html.slice(Math.max(0, (match.index ?? 0) - 200), match.index);
            if (/<picture[^>]*>\s*(<source[^>]*>\s*)*$/i.test(before)) continue;
            const info = await optimize(src);
            if (!info) continue;
            const sizes = attr(tag, 'sizes') ?? DEFAULT_SIZES;
            let img = tag;
            if (!attr(img, 'width')) img = img.replace(/^<img\b/i, `<img width="${info.width}" height="${info.height}"`);
            // The first photo in the page's main content loads right away; the rest wait until they're near.
            const isFirst = first && (match.index ?? 0) > inMain;
            if (isFirst) {
              img = img.replace(/\sloading="lazy"/i, '').replace(/^<img\b/i, '<img loading="eager" fetchpriority="high"');
              first = false;
            } else if (!attr(img, 'loading')) {
              img = img.replace(/^<img\b/i, '<img loading="lazy"');
            }
            if (!attr(img, 'decoding')) img = img.replace(/^<img\b/i, '<img decoding="async"');
            const sources = FORMATS.map(
              (f) => `<source type="image/${f}" srcset="${info.variants[f]}" sizes="${sizes}">`,
            ).join('');
            swaps.push({ at: match.index ?? 0, from: tag, to: `<picture>${sources}${img}</picture>` });
          }
          if (!swaps.length) continue;
          // Swap from the end so earlier positions stay correct.
          for (const { at, from, to } of swaps.reverse()) html = html.slice(0, at) + to + html.slice(at + from.length);
          fs.writeFileSync(file, html);
        }

        logger.info(
          `${done.size} photos served as AVIF/WebP (${made} new conversions). Largest WebP copies total ${(bytesAfter / 1e6).toFixed(1)} MB vs ${(bytesBefore / 1e6).toFixed(1)} MB of originals.`,
        );
      },
    },
  };
}
