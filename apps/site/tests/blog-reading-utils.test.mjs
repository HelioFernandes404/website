import assert from "node:assert/strict";
import { describe, it } from "node:test";

const loadModule = () => import("../src/utils/blog-reading.js");

describe("blog reading utils", () => {
  it("normalizes invalid theme preferences to system", async () => {
    const { normalizeReadingThemePreference } = await loadModule();

    assert.equal(normalizeReadingThemePreference("sepia"), "system");
    assert.equal(normalizeReadingThemePreference(""), "system");
    assert.equal(normalizeReadingThemePreference(undefined), "system");
  });

  it("preserves supported theme preferences", async () => {
    const { normalizeReadingThemePreference } = await loadModule();

    assert.equal(normalizeReadingThemePreference("light"), "light");
    assert.equal(normalizeReadingThemePreference("dark"), "dark");
    assert.equal(normalizeReadingThemePreference("system"), "system");
  });

  it("resolves the active theme from preference and system preference", async () => {
    const { resolveReadingTheme } = await loadModule();

    assert.equal(resolveReadingTheme("light", true), "light");
    assert.equal(resolveReadingTheme("dark", false), "dark");
    assert.equal(resolveReadingTheme("system", true), "dark");
    assert.equal(resolveReadingTheme("system", false), "light");
  });

  it("prefers the canonical URL when building a share link", async () => {
    const { getShareUrl } = await loadModule();

    assert.equal(
      getShareUrl("https://heliosuns404.com/blog/post/", "https://example.com/fallback"),
      "https://heliosuns404.com/blog/post/",
    );
  });

  it("falls back to the current URL when canonical is missing", async () => {
    const { getShareUrl } = await loadModule();

    assert.equal(
      getShareUrl("", "https://example.com/current"),
      "https://example.com/current",
    );
    assert.equal(
      getShareUrl(undefined, "https://example.com/current"),
      "https://example.com/current",
    );
  });
});
