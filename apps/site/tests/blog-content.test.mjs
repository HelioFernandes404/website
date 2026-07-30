import { access, readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, "../src/content/blog");
const locales = ["pt", "en"];
const expectedSlugs = [
  "k3s-multi-tenant-migration-checklist",
  "rbac-centralizing-vs-federating-authorization",
];

describe("site blog content migration", () => {
  it("ships every localized post as an MDX entry", async () => {
    for (const locale of locales) {
      for (const slug of expectedSlugs) {
        await access(path.join(blogRoot, locale, `${slug}.mdx`));
      }
    }
  });

  it("stores required frontmatter keys in migrated entries", async () => {
    for (const locale of locales) {
      for (const slug of expectedSlugs) {
        const file = path.join(blogRoot, locale, `${slug}.mdx`);
        const content = await readFile(file, "utf8");

        assert.match(content, /^---\n[\s\S]*title:/m);
        assert.match(content, /^---\n[\s\S]*description:/m);
        assert.match(content, /^---\n[\s\S]*pubDate:/m);
        assert.match(content, /^---\n[\s\S]*category:/m);
      }
    }
  });

  it("contains no legacy ASCII diagrams", async () => {
    for (const locale of locales) {
      for (const slug of expectedSlugs) {
        const file = path.join(blogRoot, locale, `${slug}.mdx`);
        const content = await readFile(file, "utf8");

        assert.doesNotMatch(content, /[┌┐└┘─▶▼▲│]/u);
        assert.doesNotMatch(content, /```text/);
      }
    }
  });
});
