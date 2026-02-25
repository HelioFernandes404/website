---
status: draft
date: 2026-02-25
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Standardize monorepo QA and root CI pipeline

## Context and Problem Statement

After migrating to a monorepo, CI checks were not reliably validating all apps. The previous workflow location under `apps/tools/.github/workflows` was not the canonical root workflow path for repository-wide checks, and QA coverage across `apps/site`, `apps/hub`, and `apps/tools` was inconsistent. We need one deterministic CI entrypoint that validates all apps with the pnpm workspace.

## Decision Drivers

* Ensure CI runs from the repository root for all pull requests and pushes.
* Keep QA deterministic with `pnpm install --frozen-lockfile`.
* Validate lint/check/test/build stages with minimal app-level refactor.
* Preserve app autonomy while standardizing quality gates.
* Minimize maintenance overhead for pipeline configuration.

## Considered Options

* Keep per-app workflow under `apps/tools/.github/workflows` and run checks manually for other apps.
* Define one root GitHub Actions workflow that executes a shared `pnpm run qa` script.
* Create three independent root workflows (one per app) with separate commands and policies.

## Decision Outcome

Chosen option: "Define one root GitHub Actions workflow that executes a shared `pnpm run qa` script", because it enforces consistent QA gates from one place, matches pnpm workspace behavior, and keeps implementation changes minimal.

### Consequences

* Good, because QA execution is now centralized and reproducible (`lint`, `check`, `test`, and app builds).
* Good, because all three apps are validated in CI without duplicating workflow logic.
* Bad, because a failure in one app blocks the entire shared QA job.
* Bad, because QA runtime can be longer than app-specific parallel jobs.
* Neutral, because per-app scripts remain local; only orchestration moved to root.

### Confirmation

Compliance is confirmed when:

* Root workflow exists at `.github/workflows/ci.yml` and runs on `pull_request` and `push` to `main`.
* Workflow installs with `pnpm install --frozen-lockfile` and executes `pnpm run qa`.
* Local execution succeeds from repository root:
  * `pnpm run lint`
  * `pnpm run check`
  * `pnpm run test`
  * `pnpm run build:site`
  * `pnpm run build:hub`
  * `pnpm run build:tools`

## Pros and Cons of the Options

### Keep per-app workflow and manual checks elsewhere

* Good, because no migration work is required.
* Bad, because coverage remains inconsistent across apps.
* Bad, because root monorepo guarantees are not enforced in CI.

### One root workflow with shared `qa` script

* Good, because all quality gates are explicit and versioned in one place.
* Good, because command parity between local and CI runs improves debugging.
* Bad, because one combined job can be slower and less granular.
* Neutral, because app scripts still define app-specific checks.

### Three independent workflows

* Good, because failures are isolated per app.
* Good, because workflows can run in parallel for faster feedback.
* Bad, because maintenance overhead and duplication increase.
* Bad, because cross-app standards can drift over time.

## More Information

* Related files:
  * `.github/workflows/ci.yml`
  * `package.json` (root `qa`, `lint`, `check`, `test`)
  * `apps/site/package.json`
  * `apps/hub/package.json`
  * `apps/tools/package.json`
* Related ADR: `docs/adrs/0001-adopt-pnpm-monorepo-for-three-astro-sites.md`
