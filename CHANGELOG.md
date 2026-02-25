# Changelog

All notable changes to this repository will be documented in this file.

## [Unreleased]

### Added

* Monorepo workspace structure with `apps/site`, `apps/hub`, and `apps/tools`.
* Root `pnpm` workspace files: `package.json`, `pnpm-workspace.yaml`, and unified `pnpm-lock.yaml`.
* ADR documenting the monorepo migration decision at `docs/adrs/0001-adopt-pnpm-monorepo-for-three-astro-sites.md`.

### Changed

* Imported project histories into app folders using `git subtree`.
* Aligned Astro site URLs for deployed domains:
  * `apps/site` -> `https://heliosuns404.com`
  * `apps/hub` -> `https://hub.heliosuns404.com`
  * `apps/tools` -> `https://tools.heliosuns404.com`

### Removed

* Per-app `package-lock.json` files in favor of a single pnpm lockfile.
