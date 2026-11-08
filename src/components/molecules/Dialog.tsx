import { useEffect, useId, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cx } from '../../lib/cx.ts'

type Props = {
  title: ReactNode
  /** Escape, a click on the backdrop, or the close button. */
  onDismiss: () => void
  /** Leave unset to open on mount and close on unmount; set it to keep the dialog mounted while closed. */
  open?: boolean
  role?: 'dialog' | 'alertdialog'
  /** `false` while busy: Escape, the backdrop and the close button do nothing. */
  dismissible?: boolean
  closeOnBackdrop?: boolean
  /** Shows a close button in the heading with this accessible label. */
  closeLabel?: string
  describedBy?: string
  className?: string
  children: ReactNode
}

const outside = (event: MouseEvent<HTMLDialogElement>) => {
  const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()

  return event.clientX < left || event.clientX >= right || event.clientY < top || event.clientY >= bottom
}

/**
 * A native modal `<dialog>` with the kit heading. Put the content and a `.mnml-dialog-actions` row inside.
 *
 * React's `autoFocus` runs while the dialog is still closed, so it has no effect inside one: mark the element that
 * should get the focus with `data-autofocus` instead. Without one, the browser focuses the first focusable element.
 */
export function Dialog({
  title,
  onDismiss,
  open,
  role,
  dismissible = true,
  closeOnBackdrop = true,
  closeLabel,
  describedBy,
  className,
  children
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const pressedOutside = useRef(false)
  const titleId = useId()

  useEffect(() => {
    const element = dialog.current!
    if (open === false) {
      if (element.open) element.close()
    } else if (!element.open) {
      element.showModal()
      element.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
  }, [open])

  useEffect(() => {
    const element = dialog.current!

    return () => element.close()
  }, [])

  return (
    <dialog
      ref={dialog}
      className={cx('mnml-dialog', className)}
      role={role}
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      onMouseDown={(event) => {
        pressedOutside.current = event.target === event.currentTarget && outside(event)
      }}
      onClick={(event) => {
        // Only a press and release both on the backdrop dismiss; a selection dragged out of the dialog does not.
        const backdrop =
          pressedOutside.current && event.target === event.currentTarget && event.detail !== 0 && outside(event)
        pressedOutside.current = false
        if (backdrop && closeOnBackdrop && dismissible) onDismiss()
      }}
      onCancel={(event) => {
        event.preventDefault()
        if (dismissible) onDismiss()
      }}
    >
      <div className="mnml-dialog-heading">
        <h2 id={titleId}>{title}</h2>
        {closeLabel && (
          <button
            type="button"
            className="mnml-button mnml-dialog-close"
            aria-label={closeLabel}
            disabled={!dismissible}
            onClick={onDismiss}
          >
            <X size={19} />
          </button>
        )}
      </div>
      {children}
    </dialog>
  )
}
