# PRD — Dev Toolbox (clone funcional + novo estilo)

**Estado:** Draft  
**Última atualização:** 2026-02-20  
**Referência funcional:** `https://devtoolboxproject.vercel.app/`  
**Princípio:** paridade funcional com a referência (estrutura e comportamento); mudanças apenas de UI/branding.

---

## 1) Visão do produto

Um diretório curado de ferramentas para desenvolvedores, organizado por categorias, com cards que direcionam para os sites oficiais das ferramentas.

---

## 2) Objetivos

### 2.1 Objetivos do usuário

- Encontrar ferramentas por categoria rapidamente.
- Entender o propósito da ferramenta em poucos segundos (nome + descrição curta + tags).
- Abrir o site oficial em 1 clique.

### 2.2 Objetivos do produto

- Landing/diretório simples, rápido e “scanável”.
- Maximizar cliques qualificados nos links externos das ferramentas.

---

## 3) Escopo (MVP)

### 3.1 Páginas / rotas

1. **Home (`/`)**
   - Header com nome do site e link **About**.
   - Hero (título + subtítulo).
   - Navegação por categorias (abas/pills ou âncoras para seções).
   - Seções por categoria com CTA **View all**.
   - Cards de ferramenta (nome, descrição curta, tags).
   - Footer curto.

2. **Categoria (`/category/:slug`)**
   - Placeholder **Coming Soon** (paridade com a referência).

3. **About (`/about`)**
   - Página curta com propósito do projeto e links (ex.: repo/contato). Sem features extras.

### 3.2 Conteúdo seed (MVP)

Manter as mesmas categorias e itens (para paridade funcional do MVP):

- **Vibe Coding:** Claude Code, v0, Cursor, Gemini CLI, Warp, Codex
- **Hosting:** Vercel, Railway, Supabase, Render, Neon Database
- **AI Tools:** Claude, ChatGPT, Perplexity, Midjourney, Grok
- **Components:** shadcn/ui, Radix UI, Tailwind UI, Framer Motion, Aceternity UI, Magic UI

---

## 4) Fora de escopo (MVP)

- Login/contas de usuário.
- Favoritos/salvar ferramentas.
- Busca, filtros avançados, ordenação.
- Painel admin/CMS.
- Página de detalhe por ferramenta (no MVP, o card vai direto para o site externo).
- i18n.
- Blog/newsletter.

---

## 5) Personas

- **Dev generalista (Front/Fullstack):** quer acelerar entrega com boas ferramentas.
- **DevOps/Plataforma:** procura hosting/serviços.
- **Design Engineer:** procura bibliotecas de componentes e motion.
- **Curador interno:** mantém a lista (no MVP, via arquivo estático versionado no repo).

---

## 6) Principais jornadas

1. **Entrar na home → escolher categoria → clicar em uma ferramenta**
2. **Entrar na home → rolar → comparar cards → clicar em 2–3 ferramentas**
3. **Clicar em “View all” → ver “Coming Soon” (paridade)**

---

## 7) Requisitos funcionais

### RF-01 — Header

- Exibir nome do produto (link para `/`).
- Exibir link **About** (navega para `/about`).

### RF-02 — Hero

- Exibir título e subtítulo (copy equivalente à referência; pode ajustar texto sem mudar intenção).

### RF-03 — Navegação de categorias

- Exibir lista de categorias e permitir navegação rápida para cada seção.

### RF-04 — Seções de categoria (home)

- Para cada categoria:
  - título da categoria;
  - CTA **View all** que navega para `/category/:slug`.

### RF-05 — Cards de ferramenta

Cada card deve exibir:

- Nome da ferramenta.
- Descrição curta (1–2 linhas).
- Tags (chips).

Comportamento:

- Clique em qualquer área do card abre o **link externo** da ferramenta.
- Abrir em nova aba.
- Usar `rel="noopener noreferrer"`.

### RF-06 — Página de categoria (placeholder)

- Renderizar header padrão.
- Exibir texto “Coming Soon”.

### RF-07 — Footer

- Exibir footer curto (conteúdo leve e estável).

---

## 8) UI e Estilo (tema padrão do projeto)

### 8.1 Fonte de verdade

O tema padrão deve seguir o documento de estilo do projeto:

- `docs/DESIGN_DOCUMENTATION.md` (auditoria de `index.html`: tokens, componentes, motion e camadas visuais)

Regra: **tokens primeiro**. Evitar hardcode de cores/spacing/radius em componentes (exceto casos isolados).

### 8.2 Direção visual

- Linguagem “high-contrast” com acento **lime**.
- Neutros bem definidos (fundo claro, texto escuro, bordas/superfícies sutis).
- Motivos “técnicos”: tags mono, painéis tipo terminal, pequenos “LEDs”/status, e fundos com padrões discretos (dot grid, scanline, noise film).
- Header com “glass” (translúcido + blur).

### 8.3 Sistema de cores (tokens)

Tokens mínimos (semânticos), conforme o guia em `docs/DESIGN_DOCUMENTATION.md`:

- `accent.primary` — cor de destaque (CTA/hover/foco/glow).
- `neutral.*` — fundo, texto e superfícies.
- `success.*` — estados positivos/indicadores.
- `terminal.*` — motivo visual (opcional) para “terminal panel”.
- Overlays: dot grid, scanline, halo hover, glow.

Acessibilidade:

- Estados de foco visíveis usando `accent.primary`.
- Contraste consistente em texto e elementos de UI.

### 8.4 Tipografia

Famílias:

- Body: **Inter**
- Display: **Space Grotesk**
- Mono (labels/tags): **JetBrains Mono**

Hierarquia:

- Hero grande (tight tracking/leading curto).
- Títulos de seção (3xl–4xl).
- Títulos de card (lg–xl).
- Tags/meta em `text-xs` mono.

### 8.5 Layout, spacing e grid

- Escala de spacing baseada em 4px + meia etapa onde necessário.
- Padrões:
  - Seções: `py-24`
  - Gutter: `px-6`
  - Card padding: `p-8`
  - Containers: `max-w-3xl/max-w-5xl/max-w-7xl`

### 8.6 Radius, sombras e blur

- Radius:
  - Cards/superfícies: `rounded-2xl`/`rounded-3xl`
  - Chips/tags: `rounded-full`
- Sombras:
  - `shadow.sm/lg/2xl` para elevação
  - `shadow.accent.glow` para hover/CTA
- Blur:
  - `blur.lg/2xl` para halos
  - `backdrop-blur` em header glass

### 8.7 Padrões visuais (camadas)

Aplicar como camadas discretas (opacidade baixa):

- Noise film (muito sutil)
- Dot grid (40×40)
- Scanline/linhas horizontais (sutil)
- Header glass com borda/sombra reagindo ao scroll

### 8.8 Motion e micro-interações

- Entrada de conteúdo: `fadeInUp`
- Scroll reveal em seções
- Pulse do acento (discreto)
- Float (discreto) onde fizer sentido (ex.: detalhes decorativos)
- Durações: 300/500/700/2000ms; hovers com leve translate/scale

### 8.9 Componentes (spec visual)

- **Header:** glass (translúcido + blur), foco com acento.
- **Tabs/categorias:** pills com borda sutil; hover com halo; estado ativo destacado.
- **Cards:** superfície clara + borda leve + radius grande; hover com elevação + glow + transform leve.
- **Tags:** chips `text-xs` mono; borda leve; radius full.
- **CTAs (“View all”):** neutro por padrão; hover/active com acento e glow.

### 8.10 Regra de customização por marca

`accent.primary` deve ser trocável sem alterar a hierarquia de neutros e tipografia.

---

## 9) Modelo de dados (MVP)

Fonte: arquivo estático (JSON/TS) versionado no repositório.

### Category

- `id`, `name`, `slug`, `order`

### Tool

- `id`, `name`, `description`, `url`, `tags[]`, `categoryId`, `order`

---

## 10) Requisitos não-funcionais

- **Performance:** home leve; efeitos implementados de forma simples (CSS/SVG), evitando bibliotecas pesadas.
- **Responsivo:** mobile-first; grid adaptável.
- **Acessibilidade:** foco visível, navegação por teclado, contraste adequado.
- **SEO básico:** title/description, OG tags.
- **Confiabilidade:** links externos abrem com `noopener/noreferrer`.

---

## 11) Métricas (sucesso)

- CTR em cards (cliques em ferramentas / visitas à home)
- CTR por categoria
- Scroll depth por seção

Eventos sugeridos:

- `tool_click` (tool_id, category_slug)
- `view_category_section` (category_slug)
- `view_all_click` (category_slug)
- `about_open`

---

## 12) Critérios de aceite

- Home contém hero, categorias, seções e cards em paridade funcional.
- “View all” navega para `/category/:slug` e renderiza “Coming Soon”.
- Card abre link externo em nova aba com `noopener/noreferrer`.
- Layout responsivo (mobile/tablet/desktop).
- Navegação por teclado com foco visível.
- Estilo aplicado via tokens (sem hardcode recorrente fora do sistema).

---

## 13) Riscos e mitigação

- **Links externos quebrados:** health-check simples no CI (opcional).
- **Escopo “só style” virar mudança funcional:** checklist de PR com RF-01…RF-07.
- **A11y negligenciada:** checklist obrigatório (contraste + foco + teclado).

---

# Anexo A — Design Tokens e estrutura esperada do repositório

## A.1 Convenção (obrigatória)

- CSS: `--{category}-{role}-{scale}`
- JS/TS: `{category}.{role}.{scale}`

## A.2 Arquivos recomendados

Estrutura mínima para operacionalizar o tema do `docs/DESIGN_DOCUMENTATION.md`:

- `docs/DESIGN_DOCUMENTATION.md`  
  Fonte de verdade do tema (tokens e decisões).

- `src/styles/tokens.css`  
  CSS custom properties (`:root { ... }`) exportando tokens.

- `src/theme/tokens.ts`  
  Export `tokens` (shape JS/TS) para uso em runtime onde necessário.

- `src/styles/globals.css`  
  Aplicações globais: camadas de fundo (noise/dot/scanline), selection, foco padrão.

- `tailwind.config.ts` (se Tailwind)  
  Mapear tokens para tema (cores, fontes, radius, shadow, keyframes).

## A.3 Regras práticas

- Componentes consomem **tokens semânticos** (ex.: `bg.canvas`, `text.default`, `border.subtle`) em vez de valores diretos.
- Troca de marca deve exigir, no máximo, alteração de `accent.primary` e de assets (logo), sem refatorar componentes.
