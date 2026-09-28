/**
 * Builds a link that works whether the site is served from a sub-folder
 * (https://avemath.github.io/BcofADAM/) or a custom domain root.
 * Leaves full URLs (https://…, mailto:, tel:, #anchors) untouched.
 */
export function url(path: string): string {
  if (/^([a-z]+:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/**
 * Lets Markdown files use simple links like /images/adam.jpg or /contact and
 * still work when the site is served from a sub-folder.
 */
export function withBase(html: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base) return html;
  return html.replace(/\b(src|href)="(\/(?!\/)[^"]*)"/g, (match, attr: string, path: string) =>
    path === base || path.startsWith(`${base}/`) ? match : `${attr}="${base}${path}"`,
  );
}
