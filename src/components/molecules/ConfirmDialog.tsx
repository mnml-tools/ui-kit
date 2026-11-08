import { useId } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../atoms/Button.tsx'
import { Dialog } from './Dialog.tsx'

type Props = {
  message: ReactNode
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  onCancel: () => void
  onConfirm: () => void
}

/** Asks before a destructive action. Cancel has the focus, so Enter does not confirm by accident. */
export function ConfirmDialog({
  message,
  title = 'Confirm action',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onCancel,
  onConfirm
}: Props) {
  const messageId = useId()

  return (
    <Dialog
      title={title}
      role="alertdialog"
      className="mnml-message-dialog"
      describedBy={messageId}
      onDismiss={onCancel}
    >
      <p id={messageId}>{message}</p>
      <div className="mnml-dialog-actions">
        <Button data-autofocus onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Dialog>
  )
}
