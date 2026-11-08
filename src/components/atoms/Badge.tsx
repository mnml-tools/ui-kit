import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx('mnml-badge', className)}>{children}</span>
}
