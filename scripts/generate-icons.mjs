#!/usr/bin/env node
/**
 * Makes every site icon from one square logo file.
 *
 *   npm run icons -- path/to/logo.png            (or .svg)
 *   npm run icons -- path/to/logo.svg --bg "#ffffff" --out public --preview .icon-previews
 *
 * Writes to --out (default: public/):
 *   favicon.ico            16, 32 and 48 px inside one file
 *   favicon.svg            only when the source is an SVG
 *   apple-touch-icon.png   180 px, on a solid background (iPhones don't do transparency)
 *   icon-192.png, icon-512.png
 *
 * Writes to --preview (default: .icon-previews/, not committed):
 *   favicon-16.png, favicon-32.png at real size, plus 8x zoomed copies,
 *   so you can check the logo still reads at tab size.
 *
 * The web manifest (site.webmanifest) is built by the site itself from Site
 * settings (src/pages/site.webmanifest.ts), so the theme color lives in one place.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const source = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
const out = opt('out', 'public');
const preview = opt('preview', '.icon-previews');
const bg = opt('bg', '#ffffff');

if (!source) {
  console.log('No logo file given, so the current icons stay as they are.');
  console.log('Usage: npm run icons -- path/to/logo.png   (a square PNG at least 512 px, or an SVG)');
  process.exit(0);
}
if (!fs.existsSync(source)) {
  console.error(`Can't find ${source}.`);
  process.exit(1);
}

const isSvg = source.toLowerCase().endsWith('.svg');
const input = isSvg ? { density: 384 } : {};
const meta = await sharp(source, input).metadata();
if (!isSvg && (meta.width ?? 0) < 512) console.warn(`Heads up: ${source} is only ${meta.width}px wide. 512px or more looks sharper.`);
if (meta.width !== meta.height) console.warn(`Heads up: ${source} isn't square (${meta.width}x${meta.height}). It will be centered with transparent edges.`);

/** A square PNG of the logo at `size`, with transparent padding if the source isn't square. */
const square = (size, background = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(source, input)
    .resize(size, size, { fit: 'contain', background })
    .png()
    .toBuffer();

/** An .ico file that holds PNG images (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(preview, { recursive: true });

const icoSizes = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await square(size) })));
fs.writeFileSync(path.join(out, 'favicon.ico'), ico(icoSizes));
if (isSvg) fs.copyFileSync(source, path.join(out, 'favicon.svg'));
fs.writeFileSync(path.join(out, 'apple-touch-icon.png'), await sharp(await square(180)).flatten({ background: bg }).png().toBuffer());
fs.writeFileSync(path.join(out, 'icon-192.png'), await square(192));
fs.writeFileSync(path.join(out, 'icon-512.png'), await square(512));

for (const size of [16, 32]) {
  const data = await square(size);
  fs.writeFileSync(path.join(preview, `favicon-${size}.png`), data);
  await sharp(data)
    .resize(size * 8, size * 8, { kernel: 'nearest' })
    .toFile(path.join(preview, `favicon-${size}-zoom.png`));
}

console.log(`Icons written to ${out}/: favicon.ico${isSvg ? ', favicon.svg' : ''}, apple-touch-icon.png, icon-192.png, icon-512.png`);
console.log(`Previews written to ${preview}/: favicon-16.png, favicon-32.png (and 8x zoomed copies)`);
