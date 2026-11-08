import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type Props = {
  icon?: ReactNode
  title: ReactNode
  /** Shown above the icon, e.g. an error `Message`. */
  notice?: ReactNode
  className?: string
  children?: ReactNode
}

/** A centred placeholder for an empty area: icon, title and a short hint. */
export function EmptyState({ icon, title, notice, className, children }: Props) {
  return (
    <div className={cx('mnml-empty-state', className)}>
      {notice}
      {icon}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}
