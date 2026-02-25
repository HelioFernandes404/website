---
status: draft
date: 2026-02-25
decision-makers: [helio, codex]
consulted: []
informed: []
---

# Restore Homepage Parity and Remove Custom Cursor

## Context and Problem Statement

After the migration from `index.html` to Astro, the homepage at `/` was incomplete: only the hero section remained and key sections from the original page were missing.  
In the same session, a follow-up request required removing the custom cursor implementation entirely.  
The decision needed to recover content parity while simplifying interaction code and preserving the established visual language.

## Decision Drivers

* Restore missing homepage content and section-level navigation parity.
* Keep migration changes small and reviewable in the existing Astro structure.
* Improve usability by using native cursor behavior instead of custom pointer tracking.
* Reduce runtime JavaScript and CSS maintenance overhead.
* Keep build output stable and avoid regressions in current routes.

## Considered Options

* Keep the simplified homepage and keep custom cursor behavior.
* Restore homepage sections but keep custom cursor behavior.
* Restore homepage sections and remove custom cursor behavior.

## Decision Outcome

Chosen option: **"Restore homepage sections and remove custom cursor behavior"**, because it addresses both active gaps from this session with minimal architecture risk: homepage parity is recovered and pointer behavior is simplified without introducing new frameworks or route changes.

### Consequences

* Good, because homepage parity with the original composition was restored (`servicos`, `projetos`, and testimonials).
* Good, because native cursor behavior improves predictability and accessibility across devices.
* Good, because layout runtime logic is simpler after removing cursor tracking listeners and hover-state toggling.
* Bad, because one branded interaction effect (custom cursor) is no longer part of the visual identity.
* Neutral, because motion tokens related to cursor behavior may remain in design artifacts until a later cleanup pass.

### Confirmation

Decision compliance is confirmed by:

* `/` now includes the missing section anchors in [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro): `#servicos`, `#projetos`, and `#depoimentos`.
* Custom cursor elements and pointer-tracking script were removed from [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro).
* Custom cursor styles and `cursor: none` were removed from [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css).
* `npm run build` succeeds after these changes.

## Pros and Cons of the Options

### Keep the simplified homepage and keep custom cursor behavior

No additional migration work.

* Good, because no immediate edits are required.
* Bad, because homepage remains incomplete versus original content.
* Bad, because custom cursor complexity and maintenance cost remain.

### Restore homepage sections but keep custom cursor behavior

Recover missing content only.

* Good, because content parity improves.
* Good, because branded cursor effect is preserved.
* Bad, because cursor complexity remains in DOM, JS, and CSS layers.

### Restore homepage sections and remove custom cursor behavior

Recover content parity and simplify interaction model.

* Good, because both session goals are resolved in one pass.
* Good, because frontend runtime behavior is simpler and easier to maintain.
* Neutral, because hover-trigger classes remain for other UI effects.
* Bad, because removal of cursor effect may reduce perceived visual novelty.

## More Information

Implemented artifacts in this session include:

* Homepage parity updates in [src/pages/index.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/pages/index.astro)
* Cursor removal updates in [src/layouts/Layout.astro](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/layouts/Layout.astro)
* Cursor style cleanup in [src/styles/global.css](/home/helio/Work/HelioFernandes404/heliosuns404/website/src/styles/global.css)
* Session summary updates in [CHANGELOG.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/CHANGELOG.md)

Related records:

* Previous architecture decision: [ADR-0002](0002-adopt-build-time-tailwind-and-remove-deprecated-astro-image-integration.md)
* Session summary: [CHANGELOG.md](/home/helio/Work/HelioFernandes404/heliosuns404/website/CHANGELOG.md)

Open follow-up:

* [INVESTIGATE: Remove or repurpose unused cursor-related motion tokens from the design token layer if no longer referenced.]
