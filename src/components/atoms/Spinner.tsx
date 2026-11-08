import { Loader2 } from 'lucide-react'
import { cx } from '../../lib/cx.ts'

/** Add `spinClassName` to any other icon to rotate it the same way. */
export const spinClassName = 'mnml-spin'

export function Spinner({ size = 15, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cx(spinClassName, className)} />
}
