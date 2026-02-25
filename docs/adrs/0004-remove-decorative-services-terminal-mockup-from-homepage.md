---
status: draft
date: 2026-02-25
decision-makers: [helio, codex]
consulted: []
informed: []
---

# Remove Decorative Services Terminal Mockup from Homepage

## Context and Problem Statement

The homepage `#servicos` section included an absolutely positioned, low-opacity terminal mockup shown on extra-large screens.  
During this session, the element was reported as a strange image in the corner near "Minha Expertise" / "Solucoes end-to-end".  
The decision was needed to remove visual confusion while preserving content, layout structure, and current route behavior.

## Decision Drivers

* Remove confusing visual noise from the homepage services section.
* Preserve the existing service cards and section hierarchy.
* Keep the implementation minimal and localized to one file.
* Avoid introducing new dependencies or styling regressions.

## Considered Options

* Keep the decorative terminal mockup as-is.
* Keep the mockup but reduce visibility (position/opacity/breakpoint tuning).
* Remove the decorative terminal mockup from `#servicos`.

## Decision Outcome

Chosen option: **"Remove the decorative terminal mockup from `#servicos`"**, because it directly resolves the reported UX issue with the lowest risk and smallest code change.

### Consequences

* Good, because the services section is visually cleaner and less confusing.
* Good, because section content and grid layout remain unchanged.
* Good, because the change is fully contained in `src/pages/index.astro`.
* Bad, because one decorative branded effect is no longer present.
* Neutral, because this does not change SEO, routing, or content model behavior.

### Confirmation

Decision compliance is confirmed by:

* The absolute-positioned terminal mockup block was removed from [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro).
* The removed block class signature is no longer present in source/build outputs.
* `npm run build` succeeds after the change.

## Pros and Cons of the Options

### Keep the decorative terminal mockup as-is

No code changes.

* Good, because current visual style remains unchanged.
* Bad, because the confusing corner image issue persists.
* Bad, because the section keeps unnecessary decorative noise.

### Keep the mockup but reduce visibility (position/opacity/breakpoint tuning)

Retain the element with softer styling.

* Good, because some visual flavor is preserved.
* Good, because changes remain limited to styling classes.
* Bad, because tuning does not guarantee issue removal across screen sizes.
* Bad, because it keeps maintenance burden for a non-essential element.

### Remove the decorative terminal mockup from `#servicos`

Delete the block from page markup.

* Good, because reported issue is fully removed.
* Good, because implementation is small and reviewable.
* Neutral, because section spacing remains controlled by existing wrappers.
* Bad, because there is less decorative variation in that section.

## More Information

Implemented artifact in this session:

* Homepage services cleanup in [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro)

Related records:

* Previous decision: [ADR-0003](0003-restore-homepage-parity-and-remove-custom-cursor.md)
* Session summary: [CHANGELOG.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/CHANGELOG.md)
