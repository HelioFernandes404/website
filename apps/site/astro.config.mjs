// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import designMode from './design-mode/vite-plugin-design-mode';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://heliosuns404.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          pt: 'pt-BR',
          en: 'en-US',
        },
      },
    }),
    react(),
    designMode(),
  ],
});
