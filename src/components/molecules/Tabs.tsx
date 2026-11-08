import type { MouseEventHandler, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cx } from '../../lib/cx.ts'
import { DirtyIndicator } from '../atoms/DirtyIndicator.tsx'

/** The strip that holds the open `Tab`s; it scrolls sideways when they overflow. */
export function Tabs({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mnml-tabs', className)}>{children}</div>
}

type TabProps = {
  title: ReactNode
  icon?: ReactNode
  active: boolean
  dirty?: boolean
  disabled?: boolean
  closeDisabled?: boolean
  closeLabel: string
  onSelect: () => void
  onClose: () => void
  onContextMenu?: MouseEventHandler<HTMLDivElement>
}

/** A closable document tab: the title selects it, the cross closes it. */
export function Tab({
  title,
  icon,
  active,
  dirty = false,
  disabled = false,
  closeDisabled = disabled,
  closeLabel,
  onSelect,
  onClose,
  onContextMenu
}: TabProps) {
  return (
    <div className="mnml-tab" data-active={active || undefined} onContextMenu={onContextMenu}>
      <button type="button" className="mnml-button" disabled={disabled} onClick={onSelect}>
        {icon}
        {title}
        {dirty && <DirtyIndicator />}
      </button>
      <button
        type="button"
        className="mnml-button mnml-tab-close"
        aria-label={closeLabel}
        disabled={closeDisabled}
        onClick={onClose}
      >
        <X size={13} />
      </button>
    </div>
  )
}
