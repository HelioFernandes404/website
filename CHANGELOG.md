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
* Fourteen blog articles migrated into `apps/site/src/content/blog` as Markdown entries managed by `astro:content`.
* Redirect coverage and regression tests for the blog migration in `apps/site/tests` and `apps/hub/tests`.
* ADR documenting the canonical blog migration from `hub` to `site` at `docs/adrs/0005-consolidate-blog-publishing-on-heliosuns404-com.md`.
* ADR documenting the `COGCS` positioning decision at `docs/adrs/0006-position-cogcs-as-a-learning-project-transitioning-to-open-source.md`.
* Dedicated `COGCS` case study content in `apps/site/src/content/case-studies/cogcs-open-source-learning-project.md`.
* Optional primary and secondary CTA labels for `apps/site` project entries in `apps/site/src/content/config.ts`.

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
* Moved the canonical blog origin from `hub.heliosuns404.com` to `heliosuns404.com/blog`, keeping `apps/site` as the editorial source of truth.
* Updated `apps/site` blog list/detail pages to render migrated metadata (`category`, `lead`, and `tags`) from frontmatter.
* Updated `apps/hub` navigation and homepage Writing section to point directly to the website blog.
* Repositioned `COGCS` across `apps/site` and `apps/hub` as a learning project transitioning to open source, replacing product and waitlist framing with problem, scope, impact, and documentation language.
* Updated `apps/site/src/pages/projetos/[slug].astro` to render primary and secondary project CTAs from content metadata.
* Broadened `apps/site/src/pages/case-studies/index.astro` copy to describe technical impact, not only business impact.
* Published `https://github.com/HelioFernandes404/cogcs` and replaced `COGCS` GitHub search placeholders with the live repository URL.

### Fixed

* Moved CI workflow to repository root (`.github/workflows/ci.yml`) so GitHub Actions executes pipeline checks in monorepo layout.
* Fixed formatting in `apps/tools/wrangler.jsonc` to satisfy QA formatting checks.
* Updated `apps/site/src/components/SEOHead.astro` with explicit `is:inline` in JSON-LD script to remove Astro diagnostics hints during QA.
* Added `dist` to root `.gitignore` and verified no tracked files under `**/node_modules/**` or `**/dist/**`.
* Added missing Twitter card tags and `og:image:alt` in `apps/site/src/components/SEOHead.astro`.
* Added per-page canonical path wiring for `apps/tools` `about` and category routes to avoid metadata drift.

### Removed

* Per-app `package-lock.json` files in favor of a single pnpm lockfile.
* Legacy `apps/hub` blog pages and in-repo post dataset now that the website owns blog publishing.
* Removed the `COGCS` entry from `apps/tools/src/data/tools.ts` so the tools catalog no longer presents it as a product/platform surface.
