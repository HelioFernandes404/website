# Changelog

All notable changes in this project are documented in this file.

## [Unreleased]

### Added
- Migrated the project from a single `index.html` to an Astro static site structure.
- Added Astro content collections for `blog`, `projects`, and `case-studies` in [src/content/config.ts](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/content/config.ts).
- Added collection content files for projects:
  - [src/content/projects/dai-tec-ai.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/content/projects/dai-tec-ai.md)
  - [src/content/projects/systemframe.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/content/projects/systemframe.md)
  - [src/content/projects/cogcs.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/content/projects/cogcs.md)
- Added SEO component and shared layout:
  - [src/components/SEOHead.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/components/SEOHead.astro)
  - [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro)
- Added dynamic/static Astro routes for:
  - `/`, `/blog/`, `/blog/[slug]`, `/projetos/`, `/projetos/[slug]`, `/case-studies/`, `/case-studies/[slug]`
- Added optimized assets to `public/`:
  - `og-image.webp`, `eu.min.svg`, `sobre.min.svg`, `eu.webp`, `sobre.webp`, `robots.txt`
- Added design system extraction artifacts:
  - [src/styles/design-tokens.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/design-tokens.css)
  - [docs/design-style-map.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/docs/design-style-map.md)
- Added migration tracking checklist in [AGENTS.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/AGENTS.md).
- Added ADR for this session's architecture updates: [docs/adrs/0002-adopt-build-time-tailwind-and-remove-deprecated-astro-image-integration.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/docs/adrs/0002-adopt-build-time-tailwind-and-remove-deprecated-astro-image-integration.md).
- Added ADR for homepage parity and interaction cleanup in this session: [docs/adrs/0003-restore-homepage-parity-and-remove-custom-cursor.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/docs/adrs/0003-restore-homepage-parity-and-remove-custom-cursor.md).
- Added ADR for homepage services section visual cleanup in this session: [docs/adrs/0004-remove-decorative-services-terminal-mockup-from-homepage.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/docs/adrs/0004-remove-decorative-services-terminal-mockup-from-homepage.md).
- Added local Tailwind build configuration files:
  - [tailwind.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/tailwind.config.js)
  - [postcss.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/postcss.config.js)

### Changed
- Replaced inline CSS extraction with global style pipeline in [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css), now importing design tokens.
- Updated [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro) to:
  - Use local Tailwind theme configuration
  - Apply shared shell design (noise overlay, fixed header/nav, footer)
  - Keep route-based navigation for Astro pages
- Updated page templates under `src/pages/**` to align with extracted visual language from `index.html` while preserving existing content and behavior.
- Updated [package.json](/home/helio/Work/HelioFernandes404/heliosuns404/website/package.json) build script to ensure `dist/sitemap.xml` is present (`astro build && cp dist/sitemap-0.xml dist/sitemap.xml`).
- Updated [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro) to remove Tailwind CDN/runtime config scripts and rely on local build-time Tailwind.
- Updated [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css) to include `@tailwind base`, `@tailwind components`, and `@tailwind utilities`.
- Updated [tailwind.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/tailwind.config.js) with project content globs and extracted theme extension (colors, fonts, keyframes, animations).
- Updated [package.json](/home/helio/Work/HelioFernandes404/heliosuns404/website/package.json) dependencies to remove deprecated `@astrojs/image` and add Tailwind/PostCSS toolchain (`tailwindcss`, `postcss`, `autoprefixer`).
- Updated [astro.config.mjs](/home/helio/Work/HelioFernandes404/heliosuns404/website/astro.config.mjs) to remove deprecated `@astrojs/image` integration.
- Updated [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro) and [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css) to remove the custom cursor (DOM, JS, and CSS) and restore the native browser cursor.
- Updated [src/components/SEOHead.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/components/SEOHead.astro) default OG image fallback from `/og-image.jpg` to `/og-image.webp` to align with current public assets.

### Fixed
- Restored missing homepage sections on `/` during migration parity work in [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro): `#servicos`, `#projetos`, and testimonials.
- Added scroll-reveal activation in [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro) so `.reveal-on-scroll` elements become visible when entering viewport.
- Removed the decorative terminal mockup block from the homepage services section (`#servicos`) in [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro) to prevent unintended "strange image" rendering on Home.
- Restored missing source SVGs (`eu.svg`, `sobre.svg`) required by the image optimization pipeline.
- Resolved Phase 4 validation requirement for explicit `dist/sitemap.xml`.
- Ensured generated HTML pages include required SEO tags (`title`, `description`, `canonical`) and no `.svg`/`.jpg` references in built HTML.
- Fixed browser runtime issue where `tailwind` was undefined when CDN script loading failed.
- Fixed Astro warning from injected `/_image` route by removing the deprecated `@astrojs/image` integration.
- Removed legacy root static-site artifacts (`index.html`, old root media copies, root `robots.txt`, root `sitemap.xml`) in favor of Astro `src/` + `public/` structure.
- Removed obsolete migration artifact `src/styles/tailwind-theme.ts` after consolidating Tailwind config in [tailwind.config.js](/home/helio/Work/HelioFernandes404/heliosuns404/website/tailwind.config.js).
