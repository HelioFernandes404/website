# Changelog

All notable changes to this repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

* Monorepo workspace structure with `apps/site`, `apps/hub`, and `apps/tools`.
* Root `pnpm` workspace files: `package.json`, `pnpm-workspace.yaml`, and unified `pnpm-lock.yaml`.
* ADR documenting the monorepo migration decision at `docs/adrs/0001-adopt-pnpm-monorepo-for-three-astro-sites.md`.
* ADR documenting QA and CI pipeline standardization at `docs/adrs/0002-standardize-monorepo-qa-and-root-ci-pipeline.md`.
* ADR documenting Git artifact ignore policy at `docs/adrs/0003-ignore-build-and-dependency-artifacts-in-git.md`.
* `apps/tools/src/pages/robots.txt.ts` now exposes crawler directives and sitemap location for `tools.heliosuns404.com`.
* Structured data coverage for `apps/tools` homepage with `WebSite` and `CollectionPage` (`ItemList`) schema blocks.
* ADR documenting cross-app SEO baseline decisions at `docs/adrs/0004-establish-seo-baseline-for-astro-monorepo-apps.md`.

### Changed

* Imported project histories into app folders using `git subtree`.
* Aligned Astro site URLs for deployed domains:
  * `apps/site` -> `https://heliosuns404.com`
  * `apps/hub` -> `https://hub.heliosuns404.com`
  * `apps/tools` -> `https://tools.heliosuns404.com`
* Standardized monorepo QA commands through root scripts: `lint`, `check`, `test`, and `qa`.
* Added missing app QA scripts for monorepo execution:
  * `apps/site`: `check`, `lint` and required check dependencies.
  * `apps/hub`: `lint`.
  * `apps/tools`: `lint` now combines Prettier + `astro check`.
* Standardized SEO head metadata in `apps/tools` layout to include canonical URL, robots directives, Open Graph, and Twitter cards for all pages.
* Improved `apps/hub` blog detail pages with `Organization` publisher schema and related-post internal linking.
* Switched `apps/hub` font loading from CSS `@import` to preconnect/preload + stylesheet links in the document head.

### Fixed

* Moved CI workflow to repository root (`.github/workflows/ci.yml`) so GitHub Actions executes pipeline checks in monorepo layout.
* Fixed formatting in `apps/tools/wrangler.jsonc` to satisfy QA formatting checks.
* Updated `apps/site/src/components/SEOHead.astro` with explicit `is:inline` in JSON-LD script to remove Astro diagnostics hints during QA.
* Added `dist` to root `.gitignore` and verified no tracked files under `**/node_modules/**` or `**/dist/**`.
* Added missing Twitter card tags and `og:image:alt` in `apps/site/src/components/SEOHead.astro`.
* Added per-page canonical path wiring for `apps/tools` `about` and category routes to avoid metadata drift.

### Removed

* Per-app `package-lock.json` files in favor of a single pnpm lockfile.
