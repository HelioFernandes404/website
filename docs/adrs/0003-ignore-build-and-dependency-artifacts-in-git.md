---
status: draft
date: 2026-02-25
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Ignore build and dependency artifacts in Git

## Context and Problem Statement

Monorepo apps generate `dist/` directories and dependencies under `node_modules/` at root and app level. These folders are large, machine-generated, and environment-specific, and accidental staging increases repository noise and review risk. We need a consistent rule to keep generated artifacts out of version control while preserving local build workflows.

## Decision Drivers

* Prevent accidental commits of generated or vendor files.
* Keep pull requests readable and focused on source changes.
* Reduce repository size growth and clone time.
* Keep CI and local workflows reproducible from lockfiles and source, not committed build output.
* Support the existing `pnpm` monorepo structure with multiple apps.

## Considered Options

* Rely on manual review to avoid committing `node_modules/` and `dist/`.
* Ignore generated artifact directories in Git and remove tracked entries from the index when necessary.
* Commit selected build artifacts (`dist/`) for deployment or debugging convenience.

## Decision Outcome

Chosen option: "Ignore generated artifact directories in Git and remove tracked entries from the index when necessary", because it gives a deterministic guardrail across all apps with minimal maintenance and aligns with monorepo QA/CI practices.

### Consequences

* Good, because repository history avoids large generated diffs from installs and builds.
* Good, because contributors get a predictable safeguard through `.gitignore`.
* Bad, because troubleshooting built output requires reproducing builds locally instead of inspecting committed `dist/`.
* Bad, because if artifacts were previously tracked, one cleanup commit is required to untrack them.
* Neutral, because deployment pipelines continue to consume generated output from build steps, not from Git-tracked artifacts.

### Confirmation

Compliance is confirmed when:

* `.gitignore` excludes root artifact directories (`node_modules`, `dist`) and app-level ignores remain in place.
* Git index contains no tracked artifact files:
  * `git ls-files ':(glob)**/dist/**' ':(glob)**/node_modules/**'`
* Ignore rules resolve for root and app paths:
  * `git check-ignore -v node_modules apps/hub/node_modules dist apps/hub/dist`

## Pros and Cons of the Options

### Rely on manual review

* Good, because no config changes are required.
* Bad, because mistakes are likely and usually discovered late during review.
* Bad, because enforcement depends on contributor discipline.

### Ignore artifact directories and untrack if needed

* Good, because prevention is automatic at staging and commit time.
* Good, because the policy is explicit and versioned in the repository.
* Bad, because existing repositories may need one cleanup commit.

### Commit selected build artifacts

* Good, because built output is directly inspectable in Git history.
* Bad, because repository size and diff noise grow quickly.
* Bad, because committed build output can drift from source and lockfile state.

## More Information

* Related file: `.gitignore`
* Related cleanup command when needed:
  * `git rm -r --cached node_modules apps/**/node_modules apps/**/dist dist`
* Related ADRs:
  * `docs/adrs/0001-adopt-pnpm-monorepo-for-three-astro-sites.md`
  * `docs/adrs/0002-standardize-monorepo-qa-and-root-ci-pipeline.md`
