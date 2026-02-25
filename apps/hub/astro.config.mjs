import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hub.heliosuns404.com",
  trailingSlash: "never",
  integrations: [preact()],
});
