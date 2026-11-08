import { useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useContextMenu } from '../../hooks/useContextMenu.ts'
import { cx } from '../../lib/cx.ts'

export type ContextMenuItem = {
  label: string
  icon?: ReactNode
  shortcut?: string
  disabled?: boolean
  onSelect: () => void
}

type Props = {
  /** Accessible name of the menu, e.g. "Actions for people". */
  label: string
  x: number
  y: number
  items: ContextMenuItem[]
  onDismiss: () => void
  /** Opens upwards, with its bottom edge at `y`. */
  above?: boolean
  /** The button that opened the menu: pressing it does not count as an outside press, and it gets focus back. */
  trigger?: HTMLElement
  className?: string
}

/** A fixed-position menu at (`x`, `y`), kept inside the window, rendered into `document.body`. */
export function ContextMenu({ label, x, y, items, onDismiss, above, trigger, className }: Props) {
  const menu = useContextMenu(onDismiss, trigger)

  useLayoutEffect(() => {
    const element = menu.current!
    const { width, height } = element.getBoundingClientRect()
    element.style.left = `${Math.max(4, Math.min(x, window.innerWidth - width - 4))}px`
    if (above) element.style.bottom = `${window.innerHeight - y}px`
    else element.style.top = `${Math.max(4, Math.min(y, window.innerHeight - height - 4))}px`
  }, [menu, x, y, above])

  return createPortal(
    <div
      ref={menu}
      role="menu"
      aria-label={label}
      className={cx('mnml-menu', className)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          className="mnml-button"
          disabled={item.disabled}
          onClick={item.onSelect}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.shortcut && <kbd className="mnml-menu-shortcut">{item.shortcut}</kbd>}
        </button>
      ))}
    </div>,
    document.body
  )
}
