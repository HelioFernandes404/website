---
status: accepted
date: 2026-08-05
decision-makers: [heliofernandes404]
consulted: []
informed: []
---

# Flip default site locale to English and adopt MDX editorial content

## Context and Problem Statement

`apps/site` shipped its first bilingual routing pass with pt-BR as the
unprefixed default locale and en-US under `/en/`, to protect the
already-indexed Portuguese URLs. Shortly after, the site's positioning
shifted toward an English-first audience for career and portfolio
visibility, so the routing was inverted: en-US is now the unprefixed
default and pt-BR moved under `/pt/`. In the same pass, blog content
moved from flat `.md` to `.mdx` so posts can use reusable editorial
components (callouts, decision cards, trade-off comparisons, checklists,
accordions, glossaries, metric bars, comparison tables) and
scenario-driven animated architecture diagrams, instead of plain
prose and one-off hand-built diagrams per post.

## Decision Drivers

* Portfolio and career content reads primarily to an English-speaking
  audience; the default (unprefixed, no-redirect) URL should serve
  that audience without a detour.
* Duplicating the full blog-post page markup per locale (as the first
  i18n pass did) doubled maintenance cost for every future change to
  the reading toolbar, share button, or table of contents.
* Case studies and technical posts (e.g. the Alertmanager gossip
  dedup-window post) benefit from richer, reusable editorial blocks
  and interactive diagrams instead of static images or ad hoc markup
  per post.

## Considered Options

* Keep pt-BR as the unprefixed default (the original i18n decision)
  and continue adding en-US under `/en/`.
* Flip en-US to the unprefixed default and move pt-BR under `/pt/`,
  with 301 redirects from the old unprefixed pt-BR paths.
* Split locales across subdomains (`en.heliosuns404.com` /
  `pt.heliosuns404.com`).

## Decision Outcome

Chosen option: "Flip en-US to the unprefixed default and move pt-BR
under `/pt/`", because it matches the site's English-first audience
without the operational cost of a subdomain split, and the redirect
cost of inverting the prefix is a one-time fix (`public/_redirects`)
rather than a recurring one.

### Consequences

* Good, because the default, no-redirect experience now matches the
  audience the portfolio is written for.
* Good, because `BlogPostShell.astro` replaced duplicated per-locale
  blog-post page markup, so toolbar/share/reading-mode changes are
  made once instead of twice.
* Good, because `.mdx` plus the new `src/components/blog/*` set
  (`Accordion`, `Callout`, `ComparisonTable`, `DecisionCard`,
  `Glossary`, `InteractiveChecklist`, `MetricBars`, `TradeoffCompare`,
  `AnimatedDiagram`) lets case studies use structured, reusable
  editorial blocks instead of one-off markup per post.
* Good, because `AnimatedDiagram`'s scenario data
  (`src/data/blog-scenarios/*.js`, validated by `validate.js`) is
  locale-aware copy driving a single diagram implementation, rather
  than a diagram baked per language.
* Bad, because this is the second locale-routing scheme in two
  iterations; any external links or bookmarks to the first pass's
  `/en/...` URLs need the 301s in `public/_redirects` to keep working.
* Bad, because the URL segment for projects still diverges by locale
  (`/projects/` in English, `/projetos/` under `/pt/`), which keeps
  the sitemap's automatic hreflang pairing (`@astrojs/sitemap`'s
  `i18n` option) unable to pair project routes across locales — the
  per-page `<link rel="alternate" hreflang>` tags in `SEOHead.astro`
  remain the authoritative signal for that gap.
* Neutral, because the switcher-hides-when-untranslated behavior and
  the pt-BR/en-US `<html lang>` mapping from the first i18n pass carry
  over unchanged.

### Confirmation

Compliance is confirmed when:

* Default (unprefixed) routes serve English and `/pt/` serves
  Portuguese.
  * `pnpm -C apps/site build && ls apps/site/dist/blog apps/site/dist/pt/blog`
* Legacy first-pass URLs redirect instead of 404ing.
  * `cat apps/site/public/_redirects`
* Blog posts render through the shared shell, not duplicated markup.
  * `rg -n "BlogPostShell" apps/site/src/pages`
* `AnimatedDiagram` renders as a single stacked column (diagram above,
  steps below) rather than the earlier sticky two-column scroll.
  * `rg -n "animated-diagram-layout" apps/site/src/components/blog/AnimatedDiagram.astro`

## Pros and Cons of the Options

### Keep pt-BR as unprefixed default

* Good, because it required no further routing change after the
  first i18n pass.
* Bad, because it kept the default experience in the language the
  primary intended audience does not read.

### Flip to en-US default, pt-BR under `/pt/`

* Good, because the default experience matches the intended audience
  immediately.
* Good, because the redirect cost is a one-time fix, not ongoing.
* Bad, because it invalidates the routing assumptions documented for
  the first i18n pass.

### Subdomain split

* Good, because each locale gets a fully independent origin.
* Bad, because it adds DNS/cert/hosting operational cost with no
  clear benefit at this site's traffic scale.
* Bad, because it fragments analytics and backlink equity across two
  origins instead of one.

## More Information

Implemented in this pass:

* `apps/site/astro.config.mjs` (`defaultLocale: 'en'`, MDX integration)
* `apps/site/src/layouts/BlogPostShell.astro`
* `apps/site/src/pages/pt/**`, `apps/site/src/pages/blog/**`,
  `apps/site/src/pages/projects/**`
* `apps/site/src/components/blog/*.astro`
* `apps/site/src/data/blog-scenarios/*.js`
* `apps/site/public/_redirects`
* `apps/site/src/content/blog/{pt,en}/alertmanager-gossip-dedup-window.mdx`

Superseded: the routing shape recorded in commit `a3cf88b` (pt-BR
unprefixed default, en-US under `/en/`), which was never captured in
its own ADR before being replaced.
