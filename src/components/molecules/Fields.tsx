import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

/**
 * A two-column form grid of `<label>`s, each holding its text and control. Give a child the
 * `mnml-field-full` class to span both columns.
 */
export function Fields({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mnml-fields', className)}>{children}</div>
}
