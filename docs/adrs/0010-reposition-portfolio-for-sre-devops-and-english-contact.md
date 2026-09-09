---
status: accepted
date: 2026-09-09
---

# Reposition the portfolio for SRE/DevOps and an English contact experience

The owner requested a complete portfolio redesign centered on SRE/DevOps, grounded in earlier software engineering experience, with every visible page in English and existing routes and functionality preserved.

Keep the existing static Astro architecture, two-app pnpm workspace, content collections, and deployment configuration. Express career progression through documented project work instead of inferring employment history. Centralize editable professional copy in `apps/site/src/data/profile.ts`.

English routes remain canonical. Portuguese and older project routes redirect to the corresponding English route, with Portuguese source data retained. This supersedes ADR-0009's public bilingual routing policy while retaining its MDX and shared reading-shell decisions. Redirect-only URLs are excluded from the sitemap and language-switch links are no longer displayed.

The homepage, shared navigation/footer, project archive/details, and blog archive adopt a shared visual system. Article reading controls, sharing, interactive diagrams, and checklists remain functional. The hub keeps its separate links/Craft purpose and adopts the same professional positioning.

The current contact integration is email-only. Add a validated form that honestly prepares a draft by default and supports a configurable public submission endpoint for direct delivery. Never show delivery confirmation unless the endpoint explicitly accepts the submission. Credentials and provider setup are not inferred or created.

No new application dependencies or deployment services are required. Verification consists of the existing full QA gate, focused contact tests, and browser checks across mobile, tablet, and desktop sizes. See `docs/reviews/portfolio-redesign/README.md` for the audit, provenance, configuration, and validation record.
