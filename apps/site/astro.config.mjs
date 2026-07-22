// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import designMode from './design-mode/vite-plugin-design-mode';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://heliosuns404.com',
  integrations: [sitemap(), designMode()],
});
