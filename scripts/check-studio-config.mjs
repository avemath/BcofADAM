// Fails if the Studio config (.pages.yml) isn't valid YAML, or if a Studio
// field points at a file that doesn't exist. A broken .pages.yml breaks the
// Studio for the whole family, so CI runs this on every change.
import fs from 'node:fs';
import YAML from 'yaml';

const doc = YAML.parseDocument(fs.readFileSync('.pages.yml', 'utf8'));
if (doc.errors.length) {
  console.error('.pages.yml is not valid YAML:\n' + doc.errors.map((e) => `  ${e.message}`).join('\n'));
  process.exit(1);
}
const config = doc.toJS();
const missing = [];
const walk = (items) => {
  for (const item of items ?? []) {
    if (item.type === 'group') walk(item.items);
    else if (item.type === 'file' && !fs.existsSync(item.path)) missing.push(item.path);
    else if (item.type === 'collection' && !fs.existsSync(item.path)) missing.push(item.path);
  }
};
walk(config.content);
if (missing.length) {
  console.error('.pages.yml points at files that do not exist:\n  ' + missing.join('\n  '));
  process.exit(1);
}
console.log(`Studio config OK (${config.content.length} sections).`);
