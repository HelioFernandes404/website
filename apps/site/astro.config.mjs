// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
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
      filter: (page) => !new URL(page).pathname.startsWith('/pt/') && !new URL(page).pathname.startsWith('/404'),
    }),
    mdx(),
    react(),
    designMode(),
  ],
});
