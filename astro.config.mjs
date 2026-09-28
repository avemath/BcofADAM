// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are filled in automatically by the GitHub Pages
// deploy workflow (.github/workflows/deploy.yml). Locally they fall back to
// the values below. Once you connect a custom domain (e.g. becauseofadam.org),
// GitHub Pages reports an empty base path and everything keeps working.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
