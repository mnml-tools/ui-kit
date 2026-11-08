import type { ComponentProps, ReactNode } from 'react'
import { useResize } from '../../hooks/useResize.ts'
import { cx } from '../../lib/cx.ts'
import { ResizeHandle } from '../molecules/ResizeHandle.tsx'

/** A 220px column with the sidebar background; extra props go to the `<aside>`. */
export function Sidebar({ className, ...props }: ComponentProps<'aside'>) {
  return <aside {...props} className={cx('mnml-sidebar', className)} />
}

type ResizableProps = {
  id: string
  /** localStorage key that remembers the width. */
  storageKey: string
  label?: string
  initial?: number
  minimum?: number
  maximum?: number
  className?: string
  children: ReactNode
}

/** A `Sidebar` with a drag handle on its right edge. */
export function ResizableSidebar({
  id,
  storageKey,
  label = 'Resize sidebar',
  initial = 220,
  minimum = 160,
  maximum = 500,
  className,
  children
}: ResizableProps) {
  const resize = useResize({ storageKey, initial, minimum, maximum })

  return (
    <Sidebar
      id={id}
      className={className}
      data-resizable
      style={{ width: resize.width, minWidth: minimum, maxWidth: maximum }}
    >
      {children}
      <ResizeHandle {...resize} label={label} controls={id} />
    </Sidebar>
  )
}

/** The scrolling list of `SidebarItem`s. */
export function SidebarNav({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <nav className="mnml-sidebar-nav" aria-label={label}>
      {children}
    </nav>
  )
}

type ItemProps = ComponentProps<'button'> & { active?: boolean }

/** A full-width row: icon, a `<span>` label that ellipsises, then markers such as `DirtyIndicator` or `<small>`. */
export function SidebarItem({ active = false, className, ...props }: ItemProps) {
  return <button {...props} className={cx('mnml-button', className)} data-active={active || undefined} />
}

/** A small uppercase heading, with a count or actions on the right. */
export function SidebarLabel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mnml-sidebar-label', className)}>{children}</div>
}

export function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="mnml-sidebar-footer">{children}</div>
}
