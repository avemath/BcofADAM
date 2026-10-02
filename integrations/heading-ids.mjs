import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Gives every h2 and h3 in the built pages an id (from its own words) when it
 * doesn't have one. Search results can then jump straight to a section, and
 * people can link to one. Markdown headings already have ids; this covers the
 * pages built from components.
 */
export default function headingIds() {
  return {
    name: 'heading-ids',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const walk = (d) =>
          fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []));
        let added = 0;
        for (const file of walk(root)) {
          const before = fs.readFileSync(file, 'utf8');
          const used = new Set([...before.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
          const after = before.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (m, tag, attrs = '', inner) => {
            if (/\sid=/.test(attrs)) return m;
            const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/[’'‘]/g, '').trim();
            const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
            if (!base) return m;
            let id = base;
            for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
            used.add(id);
            added++;
            return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
          });
          if (after !== before) fs.writeFileSync(file, after);
        }
        logger.info(`${added} heading ids added`);
      },
    },
  };
}
