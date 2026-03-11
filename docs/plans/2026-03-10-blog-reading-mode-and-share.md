# Blog Reading Mode And Share Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** adicionar nas páginas de post do blog um modo de leitura com preferências `light`, `dark` e `system`, além de uma ação simples de compartilhamento com fallback para copiar link.

**Architecture:** a lógica de preferência e resolução de tema ficará em um utilitário pequeno e testável. O layout aplicará o tema cedo no `<html>` apenas nas páginas de post para evitar flash, enquanto a página `[slug]` renderizará os controles de leitura e acionará a interatividade no browser com `<script>` nativo do Astro.

**Tech Stack:** Astro 5, content collections, JavaScript ESM, Node test runner, Tailwind utilities e CSS global.

---

### Task 1: Cobrir a lógica mínima com testes

**Files:**
- Create: `apps/site/tests/blog-reading-utils.test.mjs`
- Create: `apps/site/src/utils/blog-reading.js`

**Step 1: Write the failing test**

Escrever testes para:
- normalizar preferência inválida para `system`
- preservar `light`, `dark` e `system`
- resolver tema ativo correto para preferência + preferência do sistema
- escolher URL canônica para compartilhamento com fallback para `window.location.href`

**Step 2: Run test to verify it fails**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: FAIL porque o módulo ainda não existe.

**Step 3: Write minimal implementation**

Implementar no utilitário:
- `READING_THEME_STORAGE_KEY`
- `normalizeReadingThemePreference(value)`
- `resolveReadingTheme(preference, systemPrefersDark)`
- `getShareUrl(canonicalUrl, currentUrl)`

**Step 4: Run test to verify it passes**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: PASS.

### Task 2: Aplicar o tema cedo no layout do blog

**Files:**
- Modify: `apps/site/src/layouts/Layout.astro`
- Modify: `apps/site/src/styles/global.css`
- Use: `apps/site/src/utils/blog-reading.js`

**Step 1: Write the failing test**

Expandir os testes para validar a chave de storage e a resolução de tema usada pelo layout.

**Step 2: Run test to verify it fails**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: FAIL caso novos comportamentos ainda não estejam refletidos no utilitário.

**Step 3: Write minimal implementation**

No layout:
- aceitar uma prop como `readingModeEnabled`
- marcar o `<html>` com atributo para escopo do modo leitura
- injetar script inline curto no `<head>` apenas quando habilitado
- atualizar `data-reading-theme-preference` e `data-reading-theme-active`

No CSS global:
- adicionar estilos condicionais para o estado escuro em páginas de leitura
- manter o restante do site intacto

**Step 4: Run test to verify it passes**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: PASS.

### Task 3: Renderizar controles do post e ação de compartilhar

**Files:**
- Modify: `apps/site/src/pages/blog/[slug].astro`
- Modify: `apps/site/src/styles/global.css`
- Use: `apps/site/src/utils/blog-reading.js`

**Step 1: Write the failing test**

Expandir os testes do utilitário para cobrir o fallback de URL de compartilhamento quando a URL canônica estiver ausente ou vazia.

**Step 2: Run test to verify it fails**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: FAIL até a função refletir o comportamento esperado.

**Step 3: Write minimal implementation**

Na página do post:
- habilitar `readingModeEnabled` no layout
- renderizar grupo de botões `light / dark / system`
- renderizar botão de compartilhar com feedback textual
- usar `navigator.share()` quando disponível
- usar `navigator.clipboard.writeText()` como fallback
- fazer fallback final com seleção manual do link se clipboard falhar

**Step 4: Run test to verify it passes**

Run: `pnpm -C apps/site test -- --test-name-pattern "blog reading utils"`
Expected: PASS.

### Task 4: Verificar integração

**Files:**
- Verify: `apps/site/src/pages/blog/[slug].astro`
- Verify: `apps/site/src/layouts/Layout.astro`
- Verify: `apps/site/src/styles/global.css`
- Verify: `apps/site/tests/blog-reading-utils.test.mjs`

**Step 1: Run focused tests**

Run: `pnpm -C apps/site test`
Expected: PASS.

**Step 2: Run static validation**

Run: `pnpm -C apps/site check`
Expected: PASS.

**Step 3: Run production build**

Run: `pnpm -C apps/site build`
Expected: PASS.
