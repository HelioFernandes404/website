export interface InspectInfo {
  tag: string
  text: string
  bbox: { w: number; h: number }
}

// Sem framework JS (Astro puro) e sem stamping próprio de file:line ainda —
// o único candidato nativo (data-astro-source-file/-loc) é estampado pelo
// Astro só quando o dev toolbar está ligado, e o próprio dev toolbar apaga
// esses atributos ao carregar a página (seu audit app roda em todo
// page-load). Não dá pra ler de forma confiável sem stamping próprio.
export function inspect(el: Element): InspectInfo {
  const r = el.getBoundingClientRect()
  return {
    tag: el.tagName.toLowerCase(),
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
    bbox: { w: Math.round(r.width), h: Math.round(r.height) },
  }
}
