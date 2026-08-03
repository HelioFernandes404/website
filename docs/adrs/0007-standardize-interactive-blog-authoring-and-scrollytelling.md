# Standardize MDX blog authoring and fixed architecture diagrams

All blog posts will use MDX inside a shared article shell. Visual explanations will use fixed React Flow diagrams with readable narrative notes beside them; simpler editorial blocks remain Astro/HTML. This replaces ASCII diagrams and per-post handcrafted visuals with a reusable system while preserving SEO, accessibility, theme support, bilingual parity, and the existing heliosuns404 visual identity.

## Considered Options

- Keep plain Markdown and ASCII diagrams.
- Build bespoke HTML/SVG interactions for each article, following the NaGringa pages directly.
- Standardize MDX authoring with a bounded editorial component kit and React Flow only for graph diagrams.

## Consequences

- Existing and future posts share one authoring and reading model.
- Diagrams are optional; content must not invent a graph when another editorial component explains it better.
- Scenario topology is shared by PT/EN while visible copy remains localized.
- Fixed graphs cost more to build than static diagrams, requiring progressive enhancement, reduced-motion behavior, and focused tests.
