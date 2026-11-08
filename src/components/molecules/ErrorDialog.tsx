import { useId } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../atoms/Button.tsx'
import { Dialog } from './Dialog.tsx'

type Props = { title: string; message: ReactNode; dismissLabel?: string; onDismiss: () => void }

export function ErrorDialog({ title, message, dismissLabel = 'OK', onDismiss }: Props) {
  const messageId = useId()

  return (
    <Dialog
      title={title}
      role="alertdialog"
      className="mnml-message-dialog"
      describedBy={messageId}
      onDismiss={onDismiss}
    >
      <p id={messageId}>{message}</p>
      <div className="mnml-dialog-actions">
        <Button data-autofocus onClick={onDismiss}>
          {dismissLabel}
        </Button>
      </div>
    </Dialog>
  )
}
