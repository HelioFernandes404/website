---
status: draft
date: 2026-02-25
decision-makers: [helio, codex]
consulted: []
informed: []
---

# Adopt Astro Static Architecture and Tokenized Design System

## Context and Problem Statement

The project started as a single `index.html` file with mixed concerns: markup, inline style/theme config, SEO metadata, and client-side interaction code in one place.  
The migration requirement for this session was to move to Astro while preserving the visual design and behavior (no new product features), and to introduce maintainable structure for content, SEO, images, and routes.

## Decision Drivers

* Preserve existing visual identity and interaction language from `index.html`.
* Keep behavior stable (zero feature expansion).
* Improve maintainability by separating content, layout, SEO, and styling concerns.
* Enable route-level SEO metadata and static generation.
* Support content growth through typed collections.
* Improve media delivery through optimized assets.

## Considered Options

* Keep the single `index.html` architecture and patch incrementally.
* Migrate to Astro static architecture with content collections and a tokenized design system.
* Migrate to a different framework (for example, Next.js) during the same session.

## Decision Outcome

Chosen option: **"Migrate to Astro static architecture with content collections and a tokenized design system"**, because it satisfies the migration goals with the lowest product-risk path: static routes, typed content, reusable SEO/layout components, and extracted design tokens while preserving the original UI language.

### Consequences

* Good, because the codebase now has clear boundaries (`content`, `components`, `layouts`, `pages`, `styles`) and route-level rendering.
* Good, because SEO and metadata are centralized via `SEOHead` + layout props.
* Good, because image assets are optimized and build validation is explicit.
* Bad, because migration introduced multiple new files and conventions, increasing onboarding surface.
* Bad, because compatibility compromises were needed (for example, `@astrojs/image` version mismatch risk in the current dependency set).
* Neutral, because `blog` and `case-studies` collections are structurally ready but currently empty.

### Confirmation

Decision compliance is confirmed by:

* `npm run build` succeeds with generated static routes.
* `dist/` includes required paths and sitemap.
* Generated HTML includes `title`, `description`, and canonical tags.
* Build output no longer references `.svg`/`.jpg` in HTML where `.webp` replacements were required.
* Design-token extraction artifacts exist and are wired into runtime styling.

## Pros and Cons of the Options

### Keep the single `index.html` architecture and patch incrementally

Minimal-change path in file count and tooling.

* Good, because no framework migration overhead is required.
* Good, because direct parity with the original file is easy to preserve.
* Bad, because maintainability remains poor (mixed concerns and scaling limitations).
* Bad, because route-level static generation and typed content modeling stay limited.

### Migrate to Astro static architecture with content collections and a tokenized design system

Framework migration plus structural cleanup while preserving design.

* Good, because content modeling is explicit and typed (`blog`, `projects`, `case-studies`).
* Good, because reusable layout/SEO components reduce duplication.
* Good, because static generation and sitemap integration align with portfolio-style site needs.
* Neutral, because existing interaction patterns still require client-side scripts in layout.
* Bad, because migration complexity and file count increase.

### Migrate to a different framework (for example, Next.js) during the same session

Alternative migration with broader runtime features.

* Good, because ecosystem options are broad.
* Neutral, because could support future dynamic features if needed later.
* Bad, because it introduces unnecessary scope for this requirement set.
* Bad, because it increases parity and delivery risk within one session.

## More Information

Implemented artifacts in this session include:

* Astro setup/config and static routes under `src/pages/**`
* Content collections under `src/content/**`
* Shared SEO/layout components under `src/components` and `src/layouts`
* Tokenized style artifacts in `src/styles/design-tokens.css` and `docs/design-style-map.md`
* Design mapping document in `docs/design-style-map.md`

Open follow-up:

* [INVESTIGATE: Replace placeholder `site` value in `astro.config.mjs` with production canonical domain configuration strategy.]
