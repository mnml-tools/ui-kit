import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

export type MessageTone = 'error' | 'success'

type Props = { tone: MessageTone; children: ReactNode; className?: string }

/** `error` is a boxed alert; `success` is a quiet status line, usually with a leading icon. */
export function Message({ tone, children, className }: Props) {
  return (
    <div className={cx('mnml-message', className)} data-tone={tone} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  )
}
