import type { AstroIntegration } from 'astro'

/**
 * Design Mode — overlay dev-only.
 *
 * Click-and-point: ative o seletor (botão flutuante ou Alt+A), passe o mouse
 * para destacar, clique para capturar. O elemento vira um "token de seleção"
 * (tag + texto + tamanho) copiado para o clipboard. Cole no chat do Claude
 * Code pra apontar o elemento exato.
 *
 * Sem file:linha por enquanto: o único candidato nativo do Astro
 * (`data-astro-source-file`/`-loc`) só existe com o dev toolbar ligado, e o
 * próprio dev toolbar apaga esses atributos ao carregar a página (seu audit
 * app roda em todo page-load) — não dá pra ler de forma confiável sem um
 * stamping próprio (fora de escopo por ora).
 *
 * Implementado como Astro integration (não Vite plugin): o dev server do
 * Astro renderiza cada página pelo próprio pipeline e nunca chama o
 * `transformIndexHtml` do Vite, então esse hook não tem efeito aqui.
 * `injectScript('page', ...)` é o seam certo — injeta um `<script
 * type="module">` em toda página renderizada. Guardado por
 * `command !== 'dev'` pra nunca entrar no build estático.
 */
export default function designMode(): AstroIntegration {
  return {
    name: 'site-design-mode',
    hooks: {
      'astro:config:setup': ({ command, injectScript }) => {
        if (command !== 'dev') return
        injectScript('page', `import '/design-mode/client/overlay.ts'`)
      },
    },
  }
}
