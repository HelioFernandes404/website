// Entry module do overlay dev do Design Mode. Injetado via
// `<script type="module" src="...">` por ../vite-plugin-design-mode.ts.
import { copy } from './clipboard'
import { inspect } from './inspect'
import { token } from './token'

const mark = <T extends HTMLElement>(el: T): T => {
  el.setAttribute('data-dm', '')
  return el
}

const box = mark(document.createElement('div'))
Object.assign(box.style, {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: '2147483646',
  border: '1px solid #2F73FF',
  background: 'rgba(47,115,255,.12)',
  borderRadius: '4px',
  display: 'none',
  boxShadow: '0 0 0 1px rgba(47,115,255,.4)',
})

const tip = mark(document.createElement('div'))
Object.assign(tip.style, {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: '2147483647',
  font: '11px JetBrains Mono, monospace',
  color: '#fff',
  background: '#161618',
  border: '1px solid #2A2A30',
  borderRadius: '6px',
  padding: '4px 8px',
  display: 'none',
  whiteSpace: 'nowrap',
})

document.body.append(box, tip)

function toast(msg: string, ok = true): void {
  const t = mark(document.createElement('div'))
  Object.assign(t.style, {
    position: 'fixed',
    bottom: '64px',
    right: '16px',
    zIndex: '2147483647',
    pointerEvents: 'none',
    font: '12px JetBrains Mono, monospace',
    color: '#fff',
    background: ok ? 'rgba(53,200,120,.16)' : 'rgba(255,92,92,.16)',
    border: `1px solid ${ok ? '#35C878' : '#FF5C5C'}`,
    borderRadius: '8px',
    padding: '8px 12px',
    maxWidth: '420px',
    whiteSpace: 'pre-wrap',
    boxShadow: '0 6px 18px rgba(0,0,0,.55)',
  })
  t.textContent = msg
  document.body.append(t)
  setTimeout(() => t.remove(), 2600)
}

const fab = mark(document.createElement('button'))
fab.textContent = '◎ pick'
Object.assign(fab.style, {
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  zIndex: '2147483647',
  font: '12px JetBrains Mono, monospace',
  fontWeight: '600',
  color: '#9BA1AC',
  background: '#161618',
  border: '1px solid #2A2A30',
  borderRadius: '10px',
  padding: '8px 14px',
  cursor: 'pointer',
})
document.body.append(fab)

let active = false
let picks: string[] = []
let hovered: Element | null = null

function fabLabel(): string {
  if (!active) return '◎ pick'
  return picks.length ? `◎ picking… (${picks.length})` : '◎ picking… (esc)'
}

function setActive(v: boolean): void {
  active = v
  picks = []
  fab.style.color = v ? '#fff' : '#9BA1AC'
  fab.style.borderColor = v ? '#2F73FF' : '#2A2A30'
  fab.textContent = fabLabel()
  if (!v) {
    box.style.display = 'none'
    tip.style.display = 'none'
  }
}

fab.onclick = () => setActive(!active)

function move(e: MouseEvent): void {
  if (!active) return
  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (!el || el.closest('[data-dm]')) return // ignora overlay (fab/box/tip/toast)
  hovered = el
  const r = el.getBoundingClientRect()
  Object.assign(box.style, {
    display: 'block',
    left: `${r.x}px`,
    top: `${r.y}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  })
  const info = inspect(el)
  tip.textContent = info.tag
  Object.assign(tip.style, {
    display: 'block',
    left: `${r.x}px`,
    top: `${Math.max(0, r.y - 24)}px`,
  })
}

async function pick(e: MouseEvent): Promise<void> {
  if (!active || !hovered) return
  e.preventDefault()
  e.stopPropagation()
  const tk = token(inspect(hovered))
  if (e.shiftKey) {
    if (!picks.includes(tk)) picks.push(tk) // dedupe
  } else {
    picks = [tk]
  }
  const payload = picks.join('\n')
  const ok = await copy(payload)
  toast(`${ok ? 'copiado — cole no chat:' : 'copie manualmente:'}\n${payload}`, ok)
  if (e.shiftKey) fab.textContent = fabLabel()
  else setActive(false)
}

document.addEventListener('mousemove', move, true)
document.addEventListener('click', pick, true)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setActive(false)
  if (e.altKey && e.code === 'KeyA') setActive(true) // Alt+A liga (layout-proof)
})
