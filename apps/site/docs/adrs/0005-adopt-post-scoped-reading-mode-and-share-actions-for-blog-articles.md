---
status: draft
date: 2026-03-11
decision-makers: [helio, codex]
consulted: []
informed: []
---

# Adopt post-scoped reading mode and share actions for blog articles

## Context and Problem Statement

The website blog already renders article pages in Astro, but it did not provide a dedicated reading mode or a simple sharing action. The user request for this session was explicit: keep the implementation native to the current Astro app, add `light`, `dark`, and `system` reading preferences, and add an easy way to share the current article link. We need to improve the reading experience for blog detail pages without migrating the blog to another stack or introducing a larger theming system across the whole site.

## Decision Drivers

* Keep the solution inside the existing `apps/site` Astro app.
* Add `light`, `dark`, and `system` preferences only where they matter: blog article pages.
* Avoid a framework migration or a second content stack such as Hugo.
* Keep the change small, reviewable, and compatible with the current layout and content collections.
* Provide progressive enhancement for sharing: native share when available, clipboard fallback otherwise.

## Considered Options

* Keep the current light-only article experience and add only a copy-link button.
* Introduce a full site-wide theme system affecting every route in `apps/site`.
* Add a post-scoped reading mode and share actions directly in the existing Astro blog pages.

## Decision Outcome

Chosen option: "Add a post-scoped reading mode and share actions directly in the existing Astro blog pages", because it satisfies the requested behavior with the lowest architectural impact. It keeps the current Astro content model, avoids a migration to Hextra or another documentation/blog framework, and limits the new client-side behavior to article pages where the reading preference is relevant.

### Consequences

* Good, because blog posts now support `light`, `dark`, and `system` reading preferences without changing the rest of the site architecture.
* Good, because article sharing now follows progressive enhancement through `navigator.share()`, clipboard copy, and final prompt fallback.
* Good, because the layout applies the resolved reading theme before the page fully paints, reducing visible theme flash on article routes.
* Bad, because the app now owns a small amount of custom client-side theme and sharing logic instead of delegating that behavior to a specialized theme.
* Bad, because dark-mode styling for article pages requires ongoing maintenance in the shared global stylesheet.
* Neutral, because the reading preference is persisted in browser storage but intentionally scoped to article reading experience rather than a full site theme policy.

### Confirmation

Compliance is confirmed when:

* Article pages render the reading controls and sharing action in `apps/site/src/pages/blog/[slug].astro`.
  * `pnpm -C apps/site build`
* Reading preference normalization and share URL fallback are covered by automated tests in `apps/site/tests/blog-reading-utils.test.mjs`.
  * `pnpm -C apps/site test`
* Astro diagnostics remain clean after wiring the page script and layout theme bootstrap.
  * `pnpm -C apps/site check`

## Pros and Cons of the Options

### Keep the current light-only article experience and add only a copy-link button

Minimal product change.

* Good, because implementation effort is very low.
* Good, because it avoids any new theme state or styling work.
* Bad, because it does not satisfy the requested `light / dark / system` reading mode.
* Bad, because it leaves the article reading experience unchanged for users who prefer dark mode.

### Introduce a full site-wide theme system affecting every route in `apps/site`

Expand theme controls to the whole website.

* Good, because it creates a single consistent theme model for the entire app.
* Good, because it could be reused beyond the blog in the future.
* Bad, because it increases scope beyond the session request.
* Bad, because it introduces more visual regression risk across non-blog pages.

### Add a post-scoped reading mode and share actions directly in the existing Astro blog pages

Target the requested behavior only where it is needed.

* Good, because it keeps the change focused on `/blog/[slug]`.
* Good, because it preserves the existing Astro architecture and content collections.
* Neutral, because the layout still needs a conditional theme bootstrap to avoid flash before paint.
* Bad, because the implementation uses custom script and CSS that must be maintained locally.

## More Information

Implemented artifacts for this decision:

* `apps/site/src/pages/blog/[slug].astro`
* `apps/site/src/layouts/Layout.astro`
* `apps/site/src/styles/global.css`
* `apps/site/src/utils/blog-reading.js`
* `apps/site/tests/blog-reading-utils.test.mjs`

Related records:

* `apps/site/docs/adrs/0001-adopt-astro-static-architecture-and-tokenized-design-system.md`
* `apps/site/docs/adrs/0002-adopt-build-time-tailwind-and-remove-deprecated-astro-image-integration.md`
