# Personal Link Hub (Astro) - SEO-First Link in Bio Website

Personal Link Hub is an Astro link-in-bio and portfolio site focused on technical SEO, clean metadata, and fast page delivery. It is a practical base for developers who want a personal website with projects, writing, and social links in one place.

## Why this project

- Build a personal landing page with a strong SEO baseline.
- Publish projects, resources, and blog posts from a single codebase.
- Keep the site fast and simple with Astro static output.

## SEO Features

- Unique page titles and meta descriptions through `src/layouts/BaseLayout.astro`.
- Canonical URLs generated from `astro.config.mjs` site config.
- Open Graph and Twitter card tags for social sharing.
- `Person` JSON-LD structured data on the home page in `src/pages/index.astro`.
- Dynamic crawl directives in `src/pages/robots.txt.ts`.
- Dynamic XML sitemap in `src/pages/sitemap.xml.ts` with blog URLs.

## Tech Stack

- Astro 5
- Preact
- TypeScript

## Quick Start

1. Install dependencies:
   `npm install`
2. Start local development:
   `npm run dev`
3. Open local site:
   `http://localhost:4321`

## Build and Preview

1. Build production files:
   `npm run build`
2. Preview production build:
   `npm run preview`

## Scripts

- `npm run dev`: Run local dev server.
- `npm run build`: Build static output.
- `npm run preview`: Preview production build.
- `npm run check`: Run Astro type and project checks.

## Project Structure

```text
src/
  components/      # UI pieces (icons, reusable components)
  data/            # Profile and blog content
  layouts/         # Shared SEO metadata and page shell
  pages/           # Route files: /, /craft, /blog, /blog/[slug], /robots.txt, /sitemap.xml
```

## SEO Checklist (Production)

- Confirm `site` in `astro.config.mjs` matches the production domain.
- Keep each page title, description, and canonical URL unique.
- Keep `src/data/posts.ts` updated so `/sitemap.xml` includes all blog posts.
- Validate structured data using Google Rich Results Test.
- Re-submit sitemap in Google Search Console after major updates.

## License

Private project.
