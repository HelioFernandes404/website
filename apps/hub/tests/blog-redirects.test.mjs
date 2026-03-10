import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getWebsiteBlogUrl, WEBSITE_BLOG_ROOT } from "../src/lib/blog-links.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.resolve(__dirname, "../public/_redirects");

describe("hub blog migration", () => {
  it("maps hub blog URLs to the website blog", () => {
    assert.equal(WEBSITE_BLOG_ROOT, "https://heliosuns404.com/blog/");
    assert.equal(getWebsiteBlogUrl(), "https://heliosuns404.com/blog/");
    assert.equal(
      getWebsiteBlogUrl("victoriametrics-vs-prometheus-at-scale"),
      "https://heliosuns404.com/blog/victoriametrics-vs-prometheus-at-scale/",
    );
  });

  it("declares permanent redirects for old hub blog routes", async () => {
    const redirects = await readFile(redirectsPath, "utf8");

    assert.match(redirects, /^\/blog\s+https:\/\/heliosuns404\.com\/blog\/\s+301$/m);
    assert.match(redirects, /^\/blog\/\s+https:\/\/heliosuns404\.com\/blog\/\s+301$/m);
    assert.match(redirects, /^\/blog\/\*\s+https:\/\/heliosuns404\.com\/blog\/:splat\/\s+301$/m);
  });
});
