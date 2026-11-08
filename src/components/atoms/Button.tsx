import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx.ts'

export type ButtonVariant = 'default' | 'primary'

export type ButtonProps = ComponentProps<'button'> & { variant?: ButtonVariant }

/** A native button with the kit look. Like `<button>`, it submits inside a form unless `type="button"` is set. */
export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cx('mnml-button', className)}
      data-variant={variant === 'default' ? undefined : variant}
    />
  )
}
