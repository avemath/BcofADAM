import type { APIRoute } from 'astro';
import { url } from '../lib/url';

/**
 * robots.txt: points search engines to the sitemap and keeps them out of the Studio.
 * While the site is in preview, every page also has a "noindex" tag (see BaseLayout),
 * which is what actually keeps it out of search results until launch.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', `Disallow: ${url('/studio')}`, '', `Sitemap: ${new URL(url('/sitemap-index.xml'), site).href}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
