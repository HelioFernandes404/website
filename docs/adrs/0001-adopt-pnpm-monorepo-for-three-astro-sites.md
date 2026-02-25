---
status: draft
date: 2026-02-25
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Adopt pnpm monorepo for three Astro sites

## Context and Problem Statement

The website, hub, and tools projects were maintained in separate repositories and deployed as separate Cloudflare Pages projects. This increased duplicated maintenance effort for dependency management, tooling, and cross-project updates. We need a repository structure that keeps independent deployability while centralizing version control and workspace management.

## Decision Drivers

* Preserve existing git history for each project.
* Keep independent Cloudflare Pages deployments and domains.
* Minimize changes to existing Astro app behavior and adapters.
* Use deterministic dependency installation with a single lockfile.
* Keep migration risk low and reversible.

## Considered Options

* Keep three independent repositories.
* Create a monorepo with `git subtree` imports and pnpm workspaces.
* Rebuild all projects into one single Astro app.

## Decision Outcome

Chosen option: "Create a monorepo with `git subtree` imports and pnpm workspaces", because it preserves history, keeps independent app boundaries (`apps/site`, `apps/hub`, `apps/tools`), and supports existing deployment topology with minimal code-level changes.

### Consequences

* Good, because shared workspace tooling and one lockfile reduce dependency drift.
* Good, because each app still builds and deploys independently using root directories in Cloudflare Pages.
* Bad, because CI/build setup in Cloudflare Pages must be reconfigured for each project.
* Bad, because one repository now has mixed history from formerly separate repos, which can make git history navigation denser.
* Neutral, because app-specific scripts/configs remain mostly unchanged inside each `apps/*` directory.

### Confirmation

Compliance is confirmed by:

* Root workspace install succeeds: `pnpm install --frozen-lockfile`.
* Each app builds successfully from monorepo:
  * `pnpm -C apps/site build`
  * `pnpm -C apps/hub build`
  * `pnpm -C apps/tools build`
* Cloudflare Pages projects are reconfigured to the monorepo with per-app root directories and `dist` outputs.

## Pros and Cons of the Options

### Keep three independent repositories

* Good, because no migration effort is needed.
* Good, because repository scope stays narrow.
* Bad, because dependency and tooling duplication continues.
* Bad, because cross-project changes remain harder to coordinate.

### Create a monorepo with `git subtree` imports and pnpm workspaces

* Good, because commit history is preserved for each imported project.
* Good, because shared tooling can be centralized at root without forcing app rewrites.
* Good, because deployment boundaries remain explicit via `apps/*`.
* Bad, because initial migration and Cloudflare reconfiguration are required.
* Neutral, because apps still retain local package scripts and Astro configs.

### Rebuild all projects into one single Astro app

* Good, because there could be one runtime and one deployment target.
* Bad, because this is high-risk and requires significant refactor work.
* Bad, because independent domain/app deployment requirements become harder to preserve cleanly.
* Bad, because behavior regressions are more likely during consolidation.

## More Information

* Source app mapping:
  * `heliosuns404_website` -> `apps/site`
  * `linktree` -> `apps/hub`
  * `DevtoolsBoxes` -> `apps/tools`
* [INVESTIGATE: Confirm final archival policy and timeline for legacy repositories.]
