# Repository Guidelines

## Project Structure & Module Organization
This repository is a `pnpm` workspace with three Astro apps under `apps/`: `site` (`heliosuns404.com`), `hub` (`hub.heliosuns404.com`), and `tools` (`tools.heliosuns404.com`). Each app keeps source in `src/`, static assets in `public/`, and app-specific notes in local `docs/`. Root architectural decisions live in `docs/adrs/`. Treat `dist/`, `.astro/`, and `node_modules/` as generated output: do not edit them by hand.

## Build, Test, and Development Commands
Install dependencies once from the root with `pnpm install`.

- `pnpm dev:site`, `pnpm dev:hub`, `pnpm dev:tools`: run one app locally.
- `pnpm build:site`, `pnpm build:hub`, `pnpm build:tools`: create production builds for each app.
- `pnpm lint`: run workspace lint/check scripts where available.
- `pnpm check`: run `astro check` across apps.
- `pnpm test`: run workspace tests; today this mainly exercises `apps/tools`.
- `pnpm run qa`: full CI-equivalent gate used by `.github/workflows/ci.yml`.

For `apps/tools`, you can also run `pnpm -C apps/tools test:e2e` for Playwright coverage.

## Coding Style & Naming Conventions
Preserve the style already used in the app you touch instead of reformatting across the monorepo. Use spaces, keep semicolons in TypeScript, and follow Astro file-based routing conventions such as `src/pages/[slug].astro` and `src/pages/robots.txt.ts`. Prefer PascalCase for Astro components/layouts (`BaseLayout.astro`, `SEOHead.astro`) and descriptive kebab-case or camelCase for utility modules (`tool-card-utils.ts`, `categories.ts`).

## Testing Guidelines
Automated unit and component tests currently live in `apps/tools` and use Vitest with `*.test.ts` or `*.test.tsx` naming near the source. End-to-end tests use Playwright in `apps/tools/e2e/*.spec.ts`. `apps/site` and `apps/hub` currently rely on `astro check` and build validation, so add focused tests when new interactive logic is introduced. No repository-wide coverage threshold is enforced today.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits, for example `feat(site): ...`, `fix(ci): ...`, `docs(seo): ...`, and `chore(monorepo): ...`. Keep scopes aligned to the affected app or concern. Pull requests should include a short summary, impacted app(s), validation commands run, and screenshots for visual changes. Link related issues or ADRs when relevant, and make sure `pnpm run qa` passes before requesting review.
