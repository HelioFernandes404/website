---
status: draft
date: 2026-03-10
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Consolidate blog publishing on heliosuns404.com

## Context and Problem Statement

The monorepo exposed blog behavior in two public apps at the same time. `apps/hub` contained the actual article dataset and rendered public blog pages, while `apps/site` already had a `/blog` section designed to become the long-term publishing destination. Keeping content in `hub` created split canonical ownership, duplicated maintenance, and unnecessary friction for future editorial work. We need one canonical blog origin on the main website while preserving existing article slugs and old hub URLs.

## Decision Drivers

* Use one canonical public domain for blog content.
* Preserve existing article slugs to minimize SEO and sharing regressions.
* Move authoring to `astro:content` Markdown entries on the website.
* Keep migration scope reviewable without introducing a shared content package.
* Ensure old `hub` blog URLs continue to resolve via redirects.

## Considered Options

* Keep the blog source of truth in `apps/hub` and remove the website blog.
* Keep both apps serving the same articles in parallel.
* Move canonical blog publishing to `apps/site` and redirect old `hub` blog URLs.
* Extract blog data to a shared package consumed by both apps.

## Decision Outcome

Chosen option: "Move canonical blog publishing to `apps/site` and redirect old `hub` blog URLs", because it aligns content with the main website, centralizes SEO/canonical behavior, and simplifies future publishing with Astro content collections.

### Consequences

* Good, because blog content now lives under `heliosuns404.com/blog`, the main brand domain.
* Good, because articles are authored as Markdown content entries in `apps/site/src/content/blog`.
* Good, because the migration preserves public slugs while retiring duplicated rendering logic from `apps/hub`.
* Bad, because `apps/hub` no longer has local post data for featured-post rendering.
* Bad, because redirect behavior must be kept in sync if blog URL conventions change later.
* Neutral, because `apps/hub` still references the blog, but only as a navigation target to the website.

### Confirmation

Compliance is confirmed when:

* `apps/site/src/content/blog` contains the migrated article set with preserved slugs.
  * `pnpm -C apps/site test`
* `apps/hub/public/_redirects` redirects `/blog` and `/blog/*` to `https://heliosuns404.com/blog/`.
  * `pnpm -C apps/hub test`
* Website blog pages build from `astro:content` without diagnostics.
  * `pnpm -C apps/site check && pnpm -C apps/site build`
* Hub no longer publishes its own blog URLs in its sitemap.
  * `pnpm -C apps/hub check && pnpm -C apps/hub build`

## Pros and Cons of the Options

### Keep blog ownership in `apps/hub`

* Good, because no content migration is required.
* Bad, because the portfolio website keeps a dormant blog section and canonical ownership stays split.
* Bad, because future publishing remains coupled to the hub app instead of the main site.

### Keep both apps serving the same articles

* Good, because migration risk is lower in the short term.
* Bad, because duplicate public content complicates canonicalization and maintenance.
* Bad, because editorial ownership remains ambiguous.

### Move blog ownership to `apps/site` with redirects

* Good, because the main website becomes the clear publishing source of truth.
* Good, because Astro content collections fit Markdown-based editorial workflows.
* Neutral, because redirect rules add a small amount of deployment-specific maintenance.

### Extract a shared content package

* Good, because it can reduce duplication if both apps must render the same content long term.
* Bad, because it adds architecture and tooling overhead that the chosen product direction does not need.
* Bad, because it keeps both apps coupled to blog rendering concerns.

## More Information

Implemented files in this decision:

* `apps/site/src/content/blog/`
* `apps/site/src/content/config.ts`
* `apps/site/src/pages/blog/index.astro`
* `apps/site/src/pages/blog/[slug].astro`
* `apps/site/src/styles/global.css`
* `apps/hub/public/_redirects`
* `apps/hub/src/lib/blog-links.ts`
* `apps/hub/src/pages/index.astro`
* `apps/hub/src/pages/sitemap.xml.ts`
