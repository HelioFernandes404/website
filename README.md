# heliosuns404 monorepo

Monorepo containing three independent Astro apps deployed to Cloudflare Pages.

## Apps

- `apps/site` -> `heliosuns404.com` (portfolio + canonical blog)
- `apps/hub` -> `hub.heliosuns404.com` (profile hub; blog routes redirect to `apps/site`)
- `apps/tools` -> `tools.heliosuns404.com`

## Workspace

- Package manager: `pnpm`
- Install: `pnpm install`
- Test all workspace suites: `pnpm test`
- Build all:
  - `pnpm build:site`
  - `pnpm build:hub`
  - `pnpm build:tools`
- Run CI-equivalent checks: `pnpm run qa`

## Content Ownership

- Canonical blog publishing lives in `apps/site/src/content/blog`.
- `apps/hub` should link to `https://heliosuns404.com/blog/` and preserve old blog URLs through redirects only.
