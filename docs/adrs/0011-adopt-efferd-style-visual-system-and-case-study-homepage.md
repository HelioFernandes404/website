---
status: accepted
date: 2026-11-24
---

# Adopt an Efferd-style visual system and a case-study homepage

The owner prototyped a new portfolio with shadcn/ui and Efferd blocks (Next.js, outside this repo) and asked to bring it to `heliosuns404.com` across the whole site.

Keep the static Astro architecture, routes, content collections, contact form and English-only policy from ADR-0010. Port the design instead of the framework: a new `apps/site/src/styles/efferd.css` layer loads after `portfolio.css` and re-skins shared surfaces (header, footer, project archive and case studies, blog archive) with a neutral palette, Geist / Geist Mono, a 64rem frame with hairline borders, hairline grids and corner plus marks. Blog articles keep their reading shell and reading modes; only fonts and brand colors change through the Tailwind theme.

The homepage is rewritten around two end-to-end case studies (Docker → K3s migration, znvet platform and incident), shorter results, about, testimonials, writing, experience and contact. Homepage copy lives in `apps/site/src/data/home.ts`; numbers come from the owner's verified story bank and keep its wording rules (no client names, estimates marked, "in validation" for unreleased work).

No new dependencies. The previous Inter, Space Grotesk and JetBrains Mono files stay in `public/fonts/` until older styles are removed.
