# Interactive Blog Scrollytelling Plan

## Goal

Turn every current and future blog post into an **Artigo interativo**: MDX content rendered inside a shared shell, using scroll-guided visuals and reusable editorial blocks without adding audio or forcing a diagram into every post.

## Product Contract

- Prose stays readable in a `max-w-3xl` column.
- Complex visual blocks may expand to `max-w-6xl`.
- Desktop scrollytelling places narrative steps beside a sticky canvas.
- Mobile places a sticky canvas above its narrative steps.
- Scroll selects the active visual step. No player, autoplay, or media controls.
- The final step offers **Modo explorar**: inline expansion on desktop, full-screen canvas on mobile.
- Explore mode supports pan, zoom, node selection, decisions, and trade-offs without capturing the article's wheel scroll before activation.
- Light, dark, and system themes share the site tokens and lime accent.
- `prefers-reduced-motion`, keyboard use, focus restoration, and screen-reader text are required.
- Without JavaScript, every narrative step and its meaning remains available as server-rendered text.

## Editorial Kit

- `ScrollyFlow`: React Flow scenario controlled by article scroll.
- `DecisionCard`: decision, rationale, and consequence.
- `TradeoffCompare`: bounded comparison between alternatives.
- `Callout`: tip, warning, context, or key insight.
- `InteractiveChecklist`: progressive checklist stored only for the current page session unless later requirements say otherwise.
- `Accordion`: optional supporting detail.
- `Glossary`: article-specific terms.
- Shared table of contents and reading progress in the article shell.

Only `ScrollyFlow` needs React. Other blocks should render as Astro/HTML with minimal native browser behavior.

## Content Model

Each graph-based explanation is a **Cenário** containing:

- stable scenario ID;
- localized title, summary, labels, decisions, and trade-offs;
- shared node and edge topology;
- ordered **Etapas visuais**;
- active nodes and edges per step;
- accessible textual explanation per step;
- optional exploration metadata.

PT and EN posts import the same scenario definition and select localized copy. Scenario validation must reject missing translations, duplicate IDs, references to unknown nodes, and empty step sequences.

## Architecture

1. Add Astro MDX integration and convert all four current `.md` entries to `.mdx` without changing slugs or frontmatter contracts.
2. Extract duplicated blog-page structure into a shared article shell while retaining locale-specific URLs, dates, translations, canonical links, and previous/next navigation.
3. Keep scroll-state calculation outside React Flow in a small testable state module.
4. Render narrative step text on the server. Hydrate `ScrollyFlow` during browser idle time only on posts that contain a scenario; posts without scenarios ship no React Flow JavaScript.
5. Use `IntersectionObserver` to select steps. Keep wheel zoom disabled during guided reading.
6. Enable React Flow pan, zoom, and node details only after entering explore mode.
7. Scope component styling through blog classes and existing design tokens. Avoid copying NaGringa branding or monolithic page HTML.

## Migration

### RBAC PT/EN

- Replace both ASCII diagrams with two shared scenarios: centralized authorization and federated authorization.
- Reorganize existing prose into scroll-linked steps.
- Preserve technical claims and article thesis.
- Use decision and trade-off blocks for availability, ownership, governance, and critical-path consequences.

### K3s PT/EN

- Convert to MDX and shared shell.
- Present migration order as an interactive rollout/checklist.
- Use callouts and trade-off blocks for pilot tenant, resource isolation, observability, smoke tests, and rollback.
- Do not invent a graph unless the migrated narrative exposes a real relationship that prose/checklist cannot explain clearly.

## Proposed Files

- Modify `apps/site/package.json`
- Modify `apps/site/astro.config.mjs`
- Modify `apps/site/src/pages/blog/[slug].astro`
- Modify `apps/site/src/pages/pt/blog/[slug].astro`
- Modify `apps/site/src/styles/global.css`
- Create `apps/site/src/layouts/BlogPostShell.astro`
- Create `apps/site/src/components/blog/ScrollyFlow.tsx`
- Create Astro editorial components under `apps/site/src/components/blog/`
- Create scenario types, validation, and RBAC scenario data under `apps/site/src/data/blog-scenarios/`
- Create a testable scroll-state utility under `apps/site/src/utils/`
- Rename current blog content from `.md` to `.mdx`
- Add focused tests under `apps/site/tests/`

Exact boundaries may change after code inspection, but shared scenario data must remain independent from locale page routing and React rendering.

## Verification

- Unit tests: step selection, scenario validation, locale completeness, and explore-mode state.
- Content tests: all posts load, slugs remain unchanged, PT/EN pairs remain valid, no ASCII diagrams remain.
- Static checks: `pnpm -C apps/site check`.
- Production build: `pnpm -C apps/site build`.
- Workspace gate: `pnpm run qa`.
- Manual browser matrix: desktop/mobile, light/dark/system, keyboard-only, reduced motion, JavaScript disabled.
- Confirm posts without `ScrollyFlow` do not request React Flow JavaScript.

## Parallel Implementation Map

Use low-effort `gpt-5.6-terra` subagents with non-overlapping file ownership:

1. **Foundation agent**: MDX integration, shared shell, Astro editorial components.
2. **Flow agent**: scenario model, state utility, `ScrollyFlow`, focused tests.
3. **Content agent**: PT/EN migration and scenario copy/data after foundation contracts are available.

Primary agent owns integration points, resolves overlaps, runs full QA, reviews accessibility/performance, and performs final corrections. If contracts are not yet stable, run foundation and flow in parallel first; start content migration only after their public interfaces are fixed.

## Out of Scope

- Audio, TTS, media player, or play/pause controls.
- Copying NaGringa visual branding.
- Requiring a React Flow graph in every article.
- Per-post handcrafted HTML applications.
- Changing public blog URLs, canonical ownership, or article claims.
