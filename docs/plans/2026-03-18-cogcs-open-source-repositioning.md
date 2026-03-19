# Cogcs Open Source Repositioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** alinhar todas as referencias ao `Cogcs` para a leitura de projeto de estudo em transicao para open source.

**Architecture:** ajustar a camada de conteudo do `site`, criar um case study dedicado, atualizar a pagina `Craft` no `hub` e remover a entrada indevida em `apps/tools`. O template de projetos do `site` precisa aceitar CTA principal e secundario para suportar abertura no GitHub + case.

**Tech Stack:** Astro, Astro Content Collections, TypeScript, Markdown

---

### Task 1: Suportar dois CTAs em projetos do site

**Files:**
- Modify: `apps/site/src/content/config.ts`
- Modify: `apps/site/src/pages/projetos/[slug].astro`

**Step 1: Expandir o schema de projects**

Adicionar campos opcionais para `urlLabel`, `secondaryUrl` e `secondaryUrlLabel`.

**Step 2: Renderizar CTA secundario**

Atualizar o template de projeto para mostrar:
- CTA principal com label customizavel;
- CTA secundario quando existir.

**Step 3: Validar tipagem**

Run: `pnpm -C apps/site astro check`
Expected: sem erros de schema ou de props.

### Task 2: Reposicionar o Cogcs dentro do site

**Files:**
- Modify: `apps/site/src/pages/index.astro`
- Modify: `apps/site/src/content/projects/cogcs.md`
- Add: `apps/site/src/content/case-studies/cogcs-open-source-learning-project.md`
- Modify: `apps/site/src/pages/case-studies/index.astro`

**Step 1: Atualizar o card da home**

Trocar categoria, descricao, metrica e remover `comingSoon`.

**Step 2: Reescrever a pagina do projeto**

Trocar a narrativa de produto por:
- problema real;
- escopo pequeno;
- transicao para open source;
- aprendizado publico.

**Step 3: Criar case study**

Documentar:
- contexto;
- problema;
- solucao escolhida;
- escopo inicial;
- impacto observado;
- aprendizados.

**Step 4: Ajustar descricao da pagina de case studies**

Ampliar o texto para acomodar impacto tecnico, nao apenas impacto de negocio.

**Step 5: Validar renderizacao**

Run: `pnpm -C apps/site astro check`
Expected: sem erros de conteudo, rotas e templates.

### Task 3: Reposicionar o Cogcs no hub

**Files:**
- Modify: `apps/hub/src/pages/craft.astro`

**Step 1: Atualizar SEO e JSON-LD**

Trocar descricao para transicao para open source e remover modelagem de produto comercial.

**Step 2: Substituir CTA de produto**

Listar:
- CTA para acompanhar abertura no GitHub;
- CTA para o case study.

**Step 3: Reescrever os paragrafos**

Explicar que o projeto esta em abertura para open source, nao e um SaaS paralelo.

**Step 4: Validar**

Run: `pnpm -C apps/hub astro check`
Expected: sem erros de frontmatter ou JSX.

### Task 4: Remover leitura errada em apps/tools

**Files:**
- Modify: `apps/tools/src/data/tools.ts`

**Step 1: Remover entrada do Cogcs**

Excluir a entrada do `Cogcs` do catalogo de tools porque ela reforca a classificacao errada de produto/plataforma.

**Step 2: Validar**

Run: `pnpm -C apps/tools test`
Expected: a suite continua passando.

### Task 5: Verificacao final

**Files:**
- Modify: nenhum adicional

**Step 1: Rodar verificacoes focadas**

Run: `pnpm -C apps/site astro check`
Expected: PASS

Run: `pnpm -C apps/hub astro check`
Expected: PASS

Run: `pnpm -C apps/tools test`
Expected: PASS

**Step 2: Revisar diff**

Run: `git diff -- apps/site apps/hub apps/tools docs/plans`
Expected: apenas mudancas ligadas ao reposicionamento do `Cogcs`.
