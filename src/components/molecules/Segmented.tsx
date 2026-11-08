import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type Props = {
  label: string
  /** `group` for toggle buttons (`aria-pressed`), `tablist` for tabs (`role="tab"` + `aria-selected`). */
  role?: 'group' | 'tablist'
  className?: string
  children: ReactNode
}

/** A row of joined buttons where one is selected. */
export function Segmented({ label, role = 'group', className, children }: Props) {
  return (
    <div className={cx('mnml-segmented', className)} role={role} aria-label={label}>
      {children}
    </div>
  )
}
