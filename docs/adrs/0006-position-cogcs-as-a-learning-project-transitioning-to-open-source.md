---
status: draft
date: 2026-03-18
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Position COGCS as a learning project transitioning to open source

## Context and Problem Statement

`COGCS` appeared across the monorepo with conflicting public framing. `apps/site` described it as a "coming soon" mobile architecture project, `apps/hub` described it like a live flashcards product with waitlist language, and `apps/tools` listed it as a product/platform surface. That combination made the work read like a second job or SaaS, which does not match the intended role of the project. We need one honest public framing that keeps the project visible as portfolio evidence while clarifying that it is a learning project opening up toward open source.

## Decision Drivers

* Avoid positioning `COGCS` as parallel employment, commercial SaaS, or a second product business.
* Preserve the project as public evidence of problem discovery, scoped experimentation, and engineering judgment.
* Match the copy to the current maturity level: transitioning toward open source, not fully public with a final repository URL yet.
* Provide two clear public paths: follow the GitHub opening and read a case study with context, scope, impact, and learnings.
* Remove contradictory product/platform labels from unrelated surfaces such as the tools catalog.

## Considered Options

* Keep the current product and SaaS framing across public surfaces.
* Remove `COGCS` from public portfolio surfaces until the repository is public.
* Position `COGCS` as a learning project transitioning to open source.
* Position `COGCS` as fully open source immediately, even without a public repository URL.

## Decision Outcome

Chosen option: "Position `COGCS` as a learning project transitioning to open source", because it keeps the project visible, aligns the narrative with its actual status, and avoids the false impression of a commercial side business or already-open repository.

### Consequences

* Good, because `apps/site` and `apps/hub` now describe the project with one consistent narrative centered on problem, scope, impact, and learnings.
* Good, because the website now exposes two explicit CTAs for the project: GitHub repository and case study context.
* Good, because `apps/tools` no longer misclassifies `COGCS` as a product/platform entry.
* Bad, because future copy must be updated again once the repository opens publicly and the transition phase ends.
* Neutral, because `apps/site` project content now supports optional primary and secondary CTA labels for future portfolio entries as well.

### Confirmation

Compliance is confirmed when:

* `apps/site` validates the new project content schema, CTA rendering, and case-study entry.
  * `pnpm -C apps/site astro check`
* `apps/hub` validates the updated `Craft` page and structured data changes.
  * `pnpm -C apps/hub check`
* `apps/tools` test coverage remains green after removing the `COGCS` catalog entry.
  * `pnpm -C apps/tools test`

## Pros and Cons of the Options

### Keep product and SaaS framing

* Good, because no public copy changes are required.
* Bad, because the project keeps reading like a side business or second job.
* Bad, because the framing is inconsistent with the intended open-source direction.

### Remove COGCS from public surfaces

* Good, because it eliminates the risk of misinterpretation immediately.
* Good, because no transitional copy is needed.
* Bad, because it removes a useful portfolio artifact that demonstrates problem finding and scoped execution.
* Bad, because it hides current work instead of explaining it honestly.

### Position COGCS as a learning project transitioning to open source

* Good, because it matches the actual project state and intent.
* Good, because it preserves public visibility without commercial framing.
* Neutral, because it introduces a short-lived transitional state in copy and links.

### Position COGCS as fully open source immediately

* Good, because it simplifies the message once the repository is public.
* Bad, because it overstates the current state while the final repository URL is not public yet.
* Bad, because it would require either inventing a repository URL or shipping misleading CTA text.

## More Information

Implemented files in this decision:

* `apps/site/src/content/config.ts`
* `apps/site/src/content/projects/cogcs.md`
* `apps/site/src/content/case-studies/cogcs-open-source-learning-project.md`
* `apps/site/src/pages/index.astro`
* `apps/site/src/pages/projetos/[slug].astro`
* `apps/site/src/pages/case-studies/index.astro`
* `apps/hub/src/pages/craft.astro`
* `apps/tools/src/data/tools.ts`
