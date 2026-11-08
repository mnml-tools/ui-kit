import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx.ts'

/** A borderless square button for a single icon. Give it an `aria-label`. */
export function IconButton({ className, ...props }: ComponentProps<'button'>) {
  return <button {...props} className={cx('mnml-button', 'mnml-icon-button', className)} />
}
