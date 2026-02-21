# Tasks — Dev Toolbox (Spec-Driven Development)

**Última atualização:** 2026-02-20  
**Regra:** executar em sequência; cada tarefa deve ser pequena, revisável e testável.

---

## Fase 0 — Setup e base do repositório

### T0.1 — Inicializar projeto

**Saída:** projeto Astro + TS, scripts padrão, commit inicial  
**Aceite:**

- `npm run dev` sobe app
- `npm run check` roda sem erro

### T0.2 — Configurar lint/format

**Saída:** Prettier (ou Biome) com regras mínimas  
**Aceite:**

- `npm run format` funciona
- Não há regras conflitantes com Tailwind/Astro

### T0.3 — Adicionar docs no repo

**Saída:** `docs/PRD.md`, `docs/TECH_SPEC.md`, `docs/DESIGN_DOCUMENTATION.md`, `docs/TASKS.md`  
**Aceite:** arquivos presentes e referenciados no README

---

## Fase 1 — Tema e tokens (UI foundation)

### T1.1 — Criar `tokens.css` (fonte de verdade)

**Saída:** `src/styles/tokens.css` com `:root` (copiado do guia)  
**Aceite:** build sem erro; tokens acessíveis no browser

### T1.2 — Criar `globals.css` com camadas de fundo

**Saída:** fundo com noise/dot/scanlines, selection, focus ring padrão  
**Aceite:** visual aplicado em todas as rotas; contraste OK

### T1.3 — Mapear tokens no Tailwind (se aplicável)

**Saída:** `tailwind.config.ts` usando CSS vars  
**Aceite:** classes semânticas funcionando

---

## Fase 2 — Dados estáticos (conteúdo)

### T2.1 — Modelos e dataset

**Saída:** `src/data/categories.ts`, `src/data/tools.ts`, types (Category/Tool)  
**Aceite:**

- dataset bate com o PRD (mesmas categorias e itens)
- `categoryId` consistente

### T2.2 — Helpers de slug/ordenação

**Saída:** `src/lib/slugs.ts` e utilitários de ordenação/lookup  
**Aceite:** funções puras (testes simples opcional)

---

## Fase 3 — Layout e componentes

### T3.1 — Layout base (Astro)

**Saída:** `src/layouts/BaseLayout.astro` com `Header`, `Footer`, `main`  
**Aceite:** rotas renderizando com semântica e foco visível

### T3.2 — Componentes de UI

**Saída:** `Header`, `Footer`, `TagChip`, `ToolCard`  
**Aceite:**

- `ToolCard` abre link externo com `noopener/noreferrer`
- Hover/focus conforme tokens

### T3.3 — Seções e navegação de categorias

**Saída:** `CategoryTabs`, `CategorySection` (âncoras no MVP)  
**Aceite:** clicar na tab rola para seção correspondente (ou navega)

---

## Fase 4 — Páginas

### T4.1 — Home (`/`)

**Saída:** hero + tabs + seções + cards + CTAs  
**Aceite:** RF-02 a RF-05 atendidos

### T4.2 — About (`/about`)

**Saída:** texto curto + links  
**Aceite:** RF-01 (nav) atendido

### T4.3 — Category placeholder (`/category/[slug]`)

**Saída:** “Coming Soon”  
**Aceite:** RF-06 atendido

---

## Fase 5 — QA e hardening

### T5.1 — Testes unitários (mínimo)

**Saída:** Vitest com smoke tests  
**Aceite:** `npm run test` passa

### T5.2 — E2E (mínimo)

**Saída:** Playwright com 3 cenários principais  
**Aceite:** `npm run test:e2e` passa

### T5.3 — A11y checklist

**Saída:** checklist aplicado + correções  
**Aceite:** foco visível; teclado funciona; headings coerentes

---

## Fase 6 — Release

### T6.1 — README e scripts

**Saída:** README com setup, scripts e referência aos docs  
**Aceite:** onboarding em 5 minutos

### T6.2 — CI (opcional)

**Saída:** GitHub Actions (format/check/test/build)  
**Aceite:** pipeline verde no PR
