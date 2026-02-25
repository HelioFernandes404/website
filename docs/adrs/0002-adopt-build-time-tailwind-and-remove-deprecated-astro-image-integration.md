---
status: draft
date: 2026-02-25
decision-makers: [helio, codex]
consulted: []
informed: []
---

# Adopt Build-Time Tailwind and Remove Deprecated Astro Image Integration

## Context and Problem Statement

After the Astro migration, layout styling still depended on Tailwind CDN scripts injected in `Layout.astro`.  
This produced production warnings (`cdn.tailwindcss.com should not be used in production`) and unstable runtime behavior (`tailwind is not defined`) when script loading failed.  
In parallel, the project still included deprecated `@astrojs/image`, generating warnings about injected `/_image` route behavior and API deprecations.

## Decision Drivers

* Remove runtime warnings and errors from local development and production browser console.
* Align styling pipeline with production-safe Astro/Tailwind practices.
* Preserve existing design language and utility classes without visual regression.
* Reduce dependency risk by removing deprecated/incompatible integrations.
* Keep changes minimal and reviewable inside the current migration scope.

## Considered Options

* Keep Tailwind via CDN and keep `@astrojs/image` as-is.
* Keep Tailwind via CDN with temporary script fixes and postpone full migration.
* Adopt local build-time Tailwind (PostCSS) and remove deprecated `@astrojs/image`.

## Decision Outcome

Chosen option: **"Adopt local build-time Tailwind (PostCSS) and remove deprecated `@astrojs/image`"**, because it resolves both warning classes immediately with low product risk while preserving existing classes and visual behavior.

### Consequences

* Good, because styles are now generated at build time and no longer depend on runtime CDN script execution.
* Good, because browser console warning about Tailwind CDN in production is removed.
* Good, because Astro deprecation warning from `@astrojs/image` integration is removed.
* Bad, because build tooling complexity increased with Tailwind/PostCSS config files and dev dependencies.
* Bad, because the project now owns theme config maintenance in `tailwind.config.js`.
* Neutral, because migration cleanup sequencing can keep temporary extracted artifacts until a dedicated cleanup pass.

### Confirmation

Decision compliance is confirmed by:

* `npm run dev` starts without `@astrojs/image` deprecation warning.
* Rendered HTML no longer includes `https://cdn.tailwindcss.com`.
* `npm run build` succeeds with local Tailwind CSS generation.
* Existing utility classes (`bg-brand-lime`, `font-display`, animations) are present in generated output.

## Pros and Cons of the Options

### Keep Tailwind via CDN and keep `@astrojs/image` as-is

No immediate migration work.

* Good, because it minimizes short-term edits.
* Good, because current visual output may remain unchanged in ideal network conditions.
* Bad, because production warning persists for Tailwind CDN usage.
* Bad, because runtime script availability can break styling setup.
* Bad, because deprecated Astro image integration warning persists.

### Keep Tailwind via CDN with temporary script fixes and postpone full migration

Patch runtime behavior only.

* Good, because can reduce one runtime error quickly.
* Neutral, because requires fewer config files than full Tailwind setup.
* Bad, because still keeps production warning about CDN usage.
* Bad, because still keeps technical debt and mixed styling strategy.
* Bad, because image integration deprecation remains unresolved.

### Adopt local build-time Tailwind (PostCSS) and remove deprecated `@astrojs/image`

Use local Tailwind config and remove unsupported image integration.

* Good, because removes both warning families in one controlled change.
* Good, because styling pipeline becomes deterministic and framework-aligned.
* Good, because theme tokens remain available via Tailwind config extension.
* Neutral, because introduces additional config files (`tailwind.config.js`, `postcss.config.js`).
* Bad, because dependency/toolchain surface area increases.

## More Information

Implemented artifacts in this session include:

* Local Tailwind/PostCSS setup in [tailwind.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/tailwind.config.js) and [postcss.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/postcss.config.js)
* Layout updates removing CDN/runtime scripts in [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro)
* Tailwind directives in [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css)
* Astro integration cleanup in [astro.config.mjs](/home/helio/Work/HelioFernandes404/heliosuns404/website/astro.config.mjs) and [package.json](/home/helio/Work/HelioFernandes404/heliosuns404/website/package.json)

Related records:

* Previous architecture decision: [ADR-0001](0001-adopt-astro-static-architecture-and-tokenized-design-system.md)
* Session summary: [CHANGELOG.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/CHANGELOG.md)

Open follow-up:

* [RESOLVED 2026-02-25: Removed `src/styles/tailwind-theme.ts` during migration cleanup once `tailwind.config.js` became the single source of Tailwind configuration.]
