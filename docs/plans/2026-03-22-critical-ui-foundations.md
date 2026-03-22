# Critical UI Foundations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** corrigir problemas críticos de acessibilidade, foco e movimento nos apps `site`, `hub` e `tools` sem refatoração ampla.

**Architecture:** aplicar ajustes em layouts base e estilos globais para resolver skip links, foco visível e redução de movimento de forma transversal. Complementar com correções pontuais nos componentes mais críticos do `tools` e na hero image do `site`.

**Tech Stack:** Astro, CSS global, Tailwind utility classes.

---

### Task 1: Corrigir navegação estrutural

**Files:**
- Modify: `apps/site/src/layouts/Layout.astro`
- Modify: `apps/hub/src/layouts/BaseLayout.astro`
- Modify: `apps/tools/src/layouts/BaseLayout.astro`

**Step 1: Add skip links**

Inserir um link visível em foco antes do conteúdo principal em cada layout.

**Step 2: Add target anchors**

Garantir um destino consistente com `id="main-content"` e `tabindex="-1"` nos wrappers principais.

**Step 3: Keep semantics intact**

No `site`, usar wrapper focável para evitar aninhar `<main>` dentro de páginas que já declaram `<main>`.

### Task 2: Corrigir foco visível e CTA fixo no tools

**Files:**
- Modify: `apps/tools/src/components/tool-card.astro`
- Modify: `apps/tools/src/components/category-tabs.astro`
- Modify: `apps/tools/src/layouts/BaseLayout.astro`
- Modify: `apps/tools/src/styles/global.css`

**Step 1: Restore visible focus**

Remover `focus-visible:outline-none` sem substituição e usar anel de foco explícito.

**Step 2: Replace inline hover behavior**

Mover o CTA fixo para uma classe CSS dedicada sem `onmouseover` ou `onmouseout`.

**Step 3: Add shared skip-link/reduced-motion styles**

Criar classes globais reutilizáveis e fallback para `prefers-reduced-motion`.

### Task 3: Reduzir motion excessivo e ajustar imagem crítica

**Files:**
- Modify: `apps/site/src/styles/global.css`
- Modify: `apps/site/src/layouts/Layout.astro`
- Modify: `apps/site/src/pages/index.astro`
- Modify: `apps/hub/src/styles/global.css`

**Step 1: Add reduced-motion rules**

Desabilitar smooth scroll, animações decorativas e transições intensas quando `prefers-reduced-motion: reduce`.

**Step 2: Respect reduced motion in JS**

No `site`, evitar animação de scroll suave e revelar seções imediatamente quando o usuário preferir menos movimento.

**Step 3: Prevent layout shift**

Adicionar `width` e `height` explícitos à imagem hero acima da dobra em `apps/site/src/pages/index.astro`.

### Task 4: Verify

**Files:**
- Verify only

**Step 1: Run targeted checks**

Executar `pnpm check`.

**Step 2: Run app build validation if needed**

Executar builds dos apps tocados se `pnpm check` não cobrir algum problema estrutural.
