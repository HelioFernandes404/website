// copia com fallback legacy p/ contexto não-seguro (acesso via IP)
export async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {}

  const ta = document.createElement('textarea')
  ta.setAttribute('data-dm', '')
  ta.value = text
  Object.assign(ta.style, { position: 'fixed', top: '0', opacity: '0', pointerEvents: 'none' })
  document.body.append(ta)
  ta.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {}
  ta.remove()
  return ok
}
