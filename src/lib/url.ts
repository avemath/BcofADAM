/**
 * Builds a link that works whether the site is served from a sub-folder
 * (https://avemath.github.io/BcofADAM/) or a custom domain root.
 * Leaves full URLs (https://…, mailto:, tel:, #anchors) untouched.
 */
export function url(path: string): string {
  if (/^([a-z]+:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${withSlash(clean)}` || '/';
}

/**
 * Pages live at /about/, so link there directly: GitHub Pages answers /about with a redirect,
 * which slows every click. Files like /images/logo.png are left alone.
 */
function withSlash(path: string): string {
  const [, route = '', rest = ''] = path.match(/^([^?#]*)(.*)$/) ?? [];
  if (route.endsWith('/') || /\.[a-z0-9]+$/i.test(route)) return path;
  return `${route}/${rest}`;
}

/**
 * Fixes an address typed into the Studio without https:// (like www.facebook.com/events/123)
 * or an email address without mailto:. Otherwise the browser treats it as a page on our own
 * site and the link breaks.
 */
export function webLink(link: string): string {
  const s = link.trim();
  if (!s || /^([a-z][a-z0-9+.-]*:|#|\/)/i.test(s)) return s;
  if (/^[^\s/@]+@[^\s/@]+\.[a-z]{2,}$/i.test(s)) return `mailto:${s}`;
  if (/^[^\s/@]+\.[a-z]{2,}([/?#]|$)/i.test(s)) return `https://${s}`;
  return s;
}

/** A link typed into the Studio: a web address, or a page on this site like /water-watcher. */
export function href(link: string): string {
  return url(webLink(link));
}

/**
 * Lets Markdown files use simple links like /images/adam.jpg or /contact and
 * still work when the site is served from a sub-folder.
 */
export function withBase(html: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return html.replace(/\b(src|href)="(\/(?!\/)[^"]*)"/g, (match, attr: string, path: string) =>
    base && (path === base || path.startsWith(`${base}/`))
      ? match
      : `${attr}="${base}${attr === 'href' ? withSlash(path) : path}"`,
  );
}
