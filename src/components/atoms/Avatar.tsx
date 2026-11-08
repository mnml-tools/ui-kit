import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

type Props = { color: string; size?: 'small' | 'normal'; children: ReactNode; className?: string }

/** A square tinted from `color`, usually holding an initial. Decorative: the name belongs next to it. */
export function Avatar({ color, size = 'normal', children, className }: Props) {
  return (
    <span
      className={cx('mnml-avatar', className)}
      data-size={size === 'normal' ? undefined : size}
      style={{ '--avatar-color': color } as CSSProperties}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
