# Portfolio redesign — September 9, 2026

## Audit completed before implementation

This repository is a pnpm workspace containing two separately deployed, static Astro applications. No repository dependencies, package scripts, or deployment platform were changed.

| Surface | Existing routes and functionality | Treatment |
| --- | --- | --- |
| Main portfolio | `/`, `/projects/`, three project details | Redesigned homepage, reusable project cards, revised case-study presentation |
| Blog | `/blog/`, three MDX articles | New archive design; preserved article contents, tables, glossary, reading progress, theme selection, sharing, previous/next navigation |
| Interactive content | React Flow architecture diagrams; animated SVG scenarios; session-persisted checklists | Preserved functionality, keyboard interaction, and text alternatives; improved mobile diagram readability |
| Portuguese routes | `/pt/`, `/pt/projetos/`, `/pt/blog/`, all six detail pages | Redirect to corresponding English routes; original source content retained |
| Earlier route aliases | `/en/*`, `/projetos/*` | Preserved; Portuguese project aliases now go directly to English |
| Link hub | `/`, `/craft`; former `/blog/*` redirects | Preserved links, OpenFlashcards content, and blog redirects; aligned positioning and visuals |
| Contact | `mailto:heliodevhub@gmail.com`; no form, API, or configured delivery provider | Added three-field form, English validation/status feedback, retained email flow, optional direct-delivery endpoint |
| External links | LinkedIn, GitHub, Instagram in schema, OpenFlashcards site/repository, hub | Preserved destinations |
| SEO | Shared metadata, structured data, robots, sitemaps, social image | Revised professional metadata, production-origin image URLs, English social image, filtered redirect routes from sitemap |
| Development | Astro design-mode overlay; CI workflow; Node tests | Preserved; no overlay code in production builds |

### Technology and reusable surfaces

- `apps/site`: Astro 5, TypeScript, Tailwind CSS, React, React Flow, MDX, Astro sitemap integration. Fonts and portrait already available locally.
- `apps/hub`: Astro 5, Preact, TypeScript, data-driven profile links. Unused interactive counter retained and translated.
- Existing layouts: `Layout.astro`, `BlogPostShell.astro`, `BaseLayout.astro`.
- Existing editorial components: AnimatedDiagram, ComparisonTable, MetricBars, Glossary, Accordion, InteractiveChecklist, TradeoffCompare, DecisionCard, Callout.
- New reusable components: ProjectCard, ContactForm, ContactCallout.

### Professional content and provenance

The owner explicitly supplied the current SRE/DevOps positioning and earlier software engineering foundation. Other claims come from the existing repository:

- **Dai Tec AI:** July 2022–December 2024; Node.js/TypeScript, MongoDB, billing integrations, AWS ECR/ECS, GitHub Actions, Docker; deployment time 40 to 8 minutes.
- **SystemFrame:** operated since December 2024; K3s, Helm, ArgoCD, Ansible, custom exporters, Prometheus/VictoriaMetrics, Alertmanager, GLPI/ServiceNow; 12+ clients, 390+ endpoints; recovery time 50 to 20 minutes.
- **OpenFlashcards:** learning project transitioning toward open source, deliberately presented without production outcome claims.
- The three existing testimonials are retained verbatim.
- Cloud/tool mentions also draw on the previous homepage and SEO schema. No new qualifications or technologies have been attributed to the owner.
- The timeline describes **project periods**, not inferred employment dates. Empty `employer` and `jobTitle` fields in `apps/site/src/data/profile.ts` are editable and hidden until populated.

## Contact configuration

The existing site had no backend or form provider. The default form validates the visitor's name, email, and message, then prepares an email draft for the existing address. The button says **Continue to email**, and feedback explicitly tells the visitor to send the draft from their email app. Opening a draft is never described as successful delivery.

To enable direct submission, set `PUBLIC_CONTACT_ENDPOINT` in the existing hosting project's build environment and rebuild. A public form URL is required, not a private API key. `apps/site/.env.example` documents the setting.

The endpoint must accept JSON `{ name, email, message }`, allow requests from the deployed site, and return HTTP success with `{ "ok": true }` or `{ "success": true }` only after accepting the message. The selected provider is responsible for email delivery, spam filtering, and any origin/rate limits. No provider account was created, credentials configured, or real messages sent during this work.

The form supports pending/success/error feedback, duplicate-click prevention while sending, a 15-second request timeout, accessible inline validation, and an email fallback containing the visitor's message. Failed requests keep the entered text. Successful confirmed requests reset the form.

## Editing guide

| Change | Location |
| --- | --- |
| Professional positioning, skills, project timeline, testimonials, contact/social links | `apps/site/src/data/profile.ts` |
| Case-study details, outcomes, architecture data | `apps/site/src/content/projects/en/` |
| Articles and interactive content | `apps/site/src/content/blog/en/` |
| Main visual system and responsive styles | `apps/site/src/styles/portfolio.css` |
| Contact delivery URL | `apps/site/.env.example` and hosting build environment |
| Hub profile | `apps/hub/src/data/profile.json` |

## Validation

- Production route checks cover the homepage, project archive, all three projects, blog archive, all three articles, and custom 404 page at **320, 390, 768, and 1440px**.
- Hub homepage and Craft checked at the same four widths.
- Checks include horizontal overflow, page language, one primary heading, image loading, metadata, and internal destinations.
- Menu opening/closing, Escape and focus return tested.
- Contact empty-field/email validation, focus on first invalid field, failure preserving input, and confirmed success resetting the form tested in-browser. Delivery responses were mocked locally; no live email was sent.
- Architecture decisions selected with the keyboard; full-text alternatives retained.
- Reading light/dark/system preference and persistence, checklist persistence, sharing through clipboard, and legacy redirects tested.
- Core source-content, scenario, reading utility, and hub redirect tests retained; focused contact tests added.
- **Final gate passed:** `pnpm run qa` — lint, Astro check, all 20 tests, and both production builds. Astro reports no errors or warnings; one existing deprecation hint remains in the development clipboard fallback.
- **48 responsive route checks passed**, plus 217 internal link/anchor checks across both apps.
- Axe WCAG A/AA checks passed on the tested homepage, archive, case-study, hub, and article surfaces after fixing contrast in light and dark reading modes. Automated checks complement the manual keyboard and visual review; they are not a certification.
- Navigation and case-study text alternatives also verified with JavaScript disabled.

Screenshots and the exact changed-file list are stored beside this report. The redesign is local source work; it has not been deployed.

## Review artifacts

- [Complete changed-file list](changed-files.md)
- [Static route, link, and metadata audit](static-audit.json)
- [Desktop homepage](screenshots/home-desktop.png)
- [Mobile homepage](screenshots/home-mobile.png)
- [Tablet homepage](screenshots/home-tablet.png)
- [Mobile contact form](screenshots/contact-mobile.png)
- [Case study](screenshots/case-study-desktop.png)
- [Mobile article diagram](screenshots/article-mobile.png)
- [Desktop hub](screenshots/hub-desktop.png)
- [Mobile hub](screenshots/hub-mobile.png)
