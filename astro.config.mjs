import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.MARKET_SITE_URL || 'https://market.chinausedautohub.com';
export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: { server: { fs: { allow: ['/home/openclaw/carexport'] } } },
});
