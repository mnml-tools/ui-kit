import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type BrandProps = { icon?: ReactNode; name: ReactNode; note?: ReactNode }

/** App icon, name and an optional note (hidden below 800px). */
export function Brand({ icon, name, note }: BrandProps) {
  return (
    <div className="mnml-brand">
      {icon && <span className="mnml-brand-icon">{icon}</span>}
      {name}
      {note && <span className="mnml-brand-note">{note}</span>}
    </div>
  )
}

type Props = {
  brand: ReactNode
  /** Centred content, e.g. the current document or a switcher. */
  center?: ReactNode
  /** Right-hand controls and status. */
  end?: ReactNode
  /** Leaves room for the macOS traffic lights in an overlay title bar. */
  macInset?: boolean
  className?: string
}

/**
 * The window's title bar. It is a Tauri drag region: its children ignore the pointer so the bar drags the window,
 * and controls that need clicks (the theme toggle, window controls) opt back in.
 */
export function TitleBar({ brand, center, end, macInset = false, className }: Props) {
  return (
    <header className={cx('mnml-titlebar', className)} data-tauri-drag-region data-mac-inset={macInset || undefined}>
      {brand}
      {center}
      <div className="mnml-titlebar-end">{end}</div>
    </header>
  )
}
