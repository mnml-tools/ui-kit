import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cx } from '../../lib/cx.ts'
import { Button } from '../atoms/Button.tsx'

type Props = {
  /** Zero-based. */
  page: number
  pageCount: number
  /** Left side, e.g. a row count and a page-size `<select>`, which the bar styles. */
  summary?: ReactNode
  disabled?: boolean
  onPrevious: () => void
  onNext: () => void
  className?: string
}

export function Pagination({ page, pageCount, summary, disabled = false, onPrevious, onNext, className }: Props) {
  return (
    <div className={cx('mnml-pagination', className)}>
      <span>{summary}</span>
      <div>
        <Button aria-label="Previous page" disabled={!page || disabled} onClick={onPrevious}>
          <ChevronLeft size={16} />
        </Button>
        <span>
          Page {page + 1} of {Math.max(1, pageCount)}
        </span>
        <Button aria-label="Next page" disabled={disabled || page + 1 >= pageCount} onClick={onNext}>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
