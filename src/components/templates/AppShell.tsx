import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type Props = {
  /** Draws a 1px border round the window, for undecorated windows (e.g. Tauri on Linux). */
  framed?: boolean
  className?: string
  children: ReactNode
}

/** The full-window column: title bar, content, status bar. */
export function AppShell({ framed = false, className, children }: Props) {
  return (
    <div className={cx('mnml-app', className)} data-framed={framed || undefined}>
      {children}
    </div>
  )
}
