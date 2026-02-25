---
status: draft
date: 2026-02-25
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Establish SEO baseline for Astro monorepo apps

## Context and Problem Statement

The monorepo has three public Astro apps (`site`, `hub`, `tools`) with uneven SEO implementations. `apps/tools` lacked foundational head metadata and crawler directives, while `apps/hub` and `apps/site` had partial gaps (schema quality, internal linking depth, and social metadata consistency). We need a consistent baseline so crawlability, indexation, canonicalization, and rich-result signals are reliable across all public domains.

## Decision Drivers

* Ensure all public pages emit canonical and indexation signals consistently.
* Improve social and search preview quality with complete OG/Twitter metadata.
* Increase structured-data quality to improve rich-results eligibility.
* Strengthen internal linking on content pages to improve discoverability.
* Reduce performance-related SEO regressions from render-blocking font loading.

## Considered Options

* Keep per-app SEO implementation differences and patch issues ad hoc.
* Establish a shared SEO baseline and patch each app to meet that baseline now.
* Centralize all apps into one shared SEO package/component before fixing gaps.

## Decision Outcome

Chosen option: "Establish a shared SEO baseline and patch each app to meet that baseline now", because it resolves current crawl/index risks quickly while preserving app autonomy and minimizing migration risk.

### Consequences

* Good, because every public app now has explicit crawl/index/canonical metadata behavior.
* Good, because `apps/tools` moved from minimal metadata to a production SEO baseline.
* Good, because `apps/hub` gains better schema semantics and deeper internal linking on posts.
* Bad, because metadata logic is still duplicated across apps and can diverge over time.
* Bad, because a later refactor may still be needed to centralize SEO components.
* Neutral, because the decision optimizes near-term quality without changing deployment topology.

### Confirmation

Compliance is confirmed when:

* `apps/tools` serves `robots.txt` with Host and Sitemap.
  * `pnpm -C apps/tools build && cat apps/tools/dist/robots.txt`
* Built HTML for all apps contains canonical, robots, OG, and Twitter tags where expected.
  * `rg -n 'rel="canonical"|name="robots"|property="og:|name="twitter:' apps/tools/dist apps/hub/dist apps/site/dist`
* Structured data is emitted for updated routes.
  * `rg -n 'application/ld\\+json' apps/tools/dist apps/hub/dist apps/site/dist`
* Quality gates remain green.
  * `pnpm -C apps/tools check && pnpm -C apps/hub check && pnpm -C apps/site check`

## Pros and Cons of the Options

### Keep per-app SEO differences and patch ad hoc

* Good, because it has the lowest immediate implementation effort.
* Bad, because inconsistencies persist and regressions are harder to detect.
* Bad, because similar issues are likely to reappear across apps.

### Establish baseline now per app

* Good, because it addresses current SEO gaps immediately with small, reviewable changes.
* Good, because it preserves each app's existing architecture and release process.
* Neutral, because duplication remains manageable in the short term.
* Bad, because long-term maintenance still benefits from shared abstractions.

### Build shared SEO package first

* Good, because it can eliminate duplicated metadata logic in the future.
* Good, because consistency enforcement becomes easier once adopted.
* Bad, because it delays fixing active SEO gaps and increases upfront refactor scope.
* Bad, because cross-app integration risk is higher during urgent remediation work.

## More Information

Implemented files in this session:

* `apps/tools/src/layouts/BaseLayout.astro`
* `apps/tools/src/pages/robots.txt.ts`
* `apps/tools/src/pages/index.astro`
* `apps/tools/src/pages/about.astro`
* `apps/tools/src/pages/category/[slug].astro`
* `apps/hub/src/layouts/BaseLayout.astro`
* `apps/hub/src/pages/blog/[slug].astro`
* `apps/hub/src/styles/global.css`
* `apps/site/src/components/SEOHead.astro`
