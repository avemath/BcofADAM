// @ts-check
/**
 * Launch guard: runs after every build and checks the finished site for things
 * that must never go public by accident.
 *
 * - "Family, please review" boxes: always counted and reported.
 * - {{TODO ...}} placeholders (including the EIN), a missing contact email or
 *   location, and review boxes: while the site is in preview (launchReady is
 *   false) these are only warnings. Once launchReady is true, any of them
 *   stops the build, so the live site stays on the last good version.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REVIEW_MARKERS = [/Family, please review/gi, /class="todo\b/gi];
const TODO_PATTERN = /\{\{\s*TODO[^}]*\}\}/g;

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

/** Strip tags so a TODO split across markup still reads as one line. */
const plain = (/** @type {string} */ html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

/**
 * @param {{ launchReady: boolean; email?: string; location?: string; ein?: string; tagline?: string }} settings
 * @returns {import('astro').AstroIntegration}
 */
export default function launchGuard(settings) {
  return {
    name: 'launch-guard',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        /** @type {Map<string, Set<string>>} */
        const todos = new Map();
        /** @type {Map<string, number>} */
        const reviews = new Map();

        for (const file of htmlFiles(root)) {
          const page = '/' + path.relative(root, file).replace(/\\/g, '/').replace(/index\.html$/, '');
          const html = fs.readFileSync(file, 'utf8');
          let boxes = 0;
          for (const marker of REVIEW_MARKERS) boxes += (html.match(marker) || []).length;
          if (boxes) reviews.set(page, boxes);
          for (const todo of plain(html).match(TODO_PATTERN) || []) {
            if (!todos.has(todo)) todos.set(todo, new Set());
            todos.get(todo)?.add(page);
          }
        }

        /** @type {string[]} */
        const problems = [];
        if (!settings.email?.trim()) problems.push('No contact email in Site settings.');
        if (!settings.location?.trim()) problems.push('No location in Site settings.');
        if (!settings.tagline?.trim()) problems.push('No full name ("Allies in the Drowning Awareness Movement") in Site settings.');
        for (const [todo, pages] of todos) {
          const list = [...pages];
          problems.push(`${todo} on ${list.slice(0, 4).join(', ')}${list.length > 4 ? ` and ${list.length - 4} more pages` : ''}`);
        }
        const reviewTotal = [...reviews.values()].reduce((a, b) => a + b, 0);
        if (reviewTotal) {
          problems.push(
            `${reviewTotal} "Family, please review" box(es) on ${[...reviews.keys()].join(', ')}`,
          );
        }

        logger.info(`${reviewTotal} "Family, please review" box(es) remain.`);
        if (!problems.length) {
          logger.info('Launch guard: nothing left to fix before launch.');
          return;
        }
        const report = `Launch guard: ${problems.length} item(s) left before launch:\n  - ${problems.join('\n  - ')}`;
        if (settings.launchReady) {
          throw new Error(
            `${report}\nThe site is marked launchReady, so the build stops here. Fix these (or turn launchReady off) and try again.`,
          );
        }
        logger.warn(report);
      },
    },
  };
}
