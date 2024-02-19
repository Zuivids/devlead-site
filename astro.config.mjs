import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // TODO: Split these off to an environment variable - only necessary for
  // production builds
  // site: '',
  // base: '',
  integrations: [tailwind(), icon(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'lv'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
