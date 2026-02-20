# TECH SPEC - Dev Toolbox MVP

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + CSS tokens (`src/styles/tokens.css`)
- ESLint + Prettier
- Vitest + Testing Library (unit)
- Playwright (e2e)

## Architecture

- `src/app`: route handlers and pages
- `src/components`: reusable UI parts (header, footer, card, tabs, section)
- `src/data`: static seed datasets for categories/tools
- `src/lib`: pure helpers for slugs, sort, and lookups
- `src/types`: domain model (`Category`, `Tool`)

## Rendering strategy

- Static content-driven render from in-repo dataset
- Home page rendered server-side with static arrays
- Category route uses dynamic segment only for placeholder copy

## Data model

### Category

- `id: string`
- `name: string`
- `slug: string`
- `order: number`

### Tool

- `id: string`
- `name: string`
- `description: string`
- `url: string`
- `tags: string[]`
- `categoryId: string`
- `order: number`

## UX and accessibility

- Sticky glass header with visible keyboard focus
- Category anchor tabs for in-page navigation
- Entire tool card clickable, external links in new tab with `noopener noreferrer`
- Semantic headings and landmarks (`header`, `main`, `section`, `footer`)

## Performance choices

- CSS-driven visual effects (no animation libraries)
- No client data fetching for MVP
- Minimal client-only logic (header scroll state)

## Testing scope

- Unit: slug/order utilities and tool card link behavior
- E2E: home smoke, category tab navigation, category placeholder flow
