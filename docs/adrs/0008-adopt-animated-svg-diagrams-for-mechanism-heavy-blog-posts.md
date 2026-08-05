# Adopt animated SVG diagrams for mechanism-heavy blog posts

ADR 0007 standardized MDX blog authoring and settled on fixed (non-animated) React
Flow diagrams after an earlier scrollytelling attempt (see `77f6ab6`, `301d244`)
proved harder to read than a static graph with narrative notes beside it. That
decision fit graphs that explain a static topology: which service calls which,
where governance sits.

Some posts explain a *mechanism over time* — a protocol that behaves differently
depending on system state (healthy, degraded, recovered). A single static graph
cannot show that difference; three separate static graphs lose the throughline
between them. This class of diagram benefits from lightweight motion (a pulse
along an edge, a broken/dashed link) that a fixed diagram cannot express, while
keeping the same discipline ADR 0007 established: optional, notes-beside-diagram
layout, bilingual parity, accessibility, reduced-motion support.

## Considered Options

- Keep `FixedDiagram` (React Flow) for every diagram, including mechanism/state
  comparisons, describing state changes only in prose.
- Reintroduce scroll-driven animation (rejected once already in `77f6ab6`/`301d244`).
- Add a second diagram component, `AnimatedDiagram`, for state/mechanism
  comparisons, built as static inline SVG with CSS/SMIL motion instead of React
  Flow, sharing the existing scenario data model and validator.

## Decision

Adopt `AnimatedDiagram` (`src/components/blog/AnimatedDiagram.astro`) as the
diagram component for posts that need to show a mechanism changing state. It
reuses the `blog-scenarios` data shape (`nodes`/`edges`/`steps`/`copy`, validated
by `validateScenario`) so scenario data, PT/EN parity, and the notes-beside-diagram
layout stay identical to ADR 0007's model. It renders as inline SVG with CSS
keyframe/SMIL animation on edges, gated behind
`@media (prefers-reduced-motion: no-preference)`, and needs no client-side
hydration or React runtime.

`FixedDiagram` (React Flow) is retired: `AnimatedDiagram` also covers static
topology diagrams (an edge with no animated state is just a static line), so
maintaining two diagram components was unnecessary duplication. The existing
RBAC posts (`rbac-centralizing-vs-federating-authorization`, PT/EN) are migrated
to `AnimatedDiagram`, and the `@xyflow/react` dependency is removed once nothing
else references it.

## Consequences

- One diagram component going forward; scenario data model and validator are
  unchanged, so existing scenario files migrate without a schema change.
- Diagrams no longer require React hydration on the client, reducing shipped JS.
- Motion is opt-in per edge (`tone`, `active`, `animated` fields on the scenario
  edge) and fully disabled under `prefers-reduced-motion: reduce`.
- Hand-authored inline SVG per diagram trades React Flow's automatic layout for
  manual node coordinates; this was already true of `FixedDiagram`'s fixed `x`/`y`
  positions, so no new authoring cost is introduced.
