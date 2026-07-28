import { access, readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.resolve(__dirname, "../src/content/blog");
// The migrated set was trimmed down to a single curated post; the rest were
// removed from the site on purpose.
const expectedSlugs = ["k3s-multi-tenant-migration-checklist"];

describe("site blog content migration", () => {
  it("ships all migrated hub slugs as markdown entries", async () => {
    for (const slug of expectedSlugs) {
      await access(path.join(blogDir, `${slug}.md`));
    }
  });

  it("stores required frontmatter keys in migrated entries", async () => {
    const sampleFile = path.join(blogDir, "k3s-multi-tenant-migration-checklist.md");
    const content = await readFile(sampleFile, "utf8");

    assert.match(content, /^---\n[\s\S]*title:/m);
    assert.match(content, /^---\n[\s\S]*description:/m);
    assert.match(content, /^---\n[\s\S]*pubDate:/m);
    assert.match(content, /^---\n[\s\S]*category:/m);
  });
});
