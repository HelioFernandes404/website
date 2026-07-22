import type { InspectInfo } from './inspect'

export function token(info: InspectInfo): string {
  return (
    `@sel <${info.tag}>` +
    (info.text ? ` · "${info.text}"` : '') +
    ` · ${info.bbox.w}×${info.bbox.h}`
  )
}
