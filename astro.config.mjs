import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.MARKET_SITE_URL || 'https://market.chinausedautohub.com';
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ru', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  vite: { server: { fs: { allow: ['/home/openclaw/carexport'] } } },
});
