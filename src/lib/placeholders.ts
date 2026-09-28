const TODO = /\{\{\s*TODO[^}]*\}\}/g;

/**
 * Makes {{TODO: ...}} notes easy to spot in preview: each one gets a yellow
 * highlight. Only text is touched, never tag attributes. The launch guard
 * stops the build if any are left once the site is marked launchReady.
 */
export function withPlaceholders(html: string): string {
  return html.replace(/>[^<]+/g, (text) => text.replace(TODO, (todo) => `<mark class="placeholder">${todo}</mark>`));
}
