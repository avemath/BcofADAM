import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { url } from '../lib/url';

/** The web app manifest, built from Site settings so the name and theme color live in one place. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: `${site.name}: ${site.tagline}`,
        short_name: site.name,
        start_url: url('/'),
        icons: [
          { src: url('/icon-192.png'), sizes: '192x192', type: 'image/png' },
          { src: url('/icon-512.png'), sizes: '512x512', type: 'image/png' },
        ],
        theme_color: site.themeColor,
        background_color: '#fbf6ee',
        display: 'browser',
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
