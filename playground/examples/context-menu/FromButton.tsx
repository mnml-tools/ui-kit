import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { ContextMenu, IconButton } from '@mnml-tools/ui'

export default function FromButton() {
  const [trigger, setTrigger] = useState<HTMLElement>()
  const close = () => setTrigger(undefined)
  const box = trigger?.getBoundingClientRect()

  return (
    <>
      <IconButton
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={!!trigger}
        // A second press on the trigger closes the menu instead of reopening it.
        onClick={(event) => setTrigger(trigger ? undefined : event.currentTarget)}
      >
        <MoreHorizontal size={15} aria-hidden="true" />
      </IconButton>
      {trigger && box && (
        <ContextMenu
          label="More actions"
          x={box.left}
          y={box.bottom + 2}
          trigger={trigger}
          onDismiss={close}
          items={[
            { label: 'Duplicate', onSelect: close },
            { label: 'Export as CSV', onSelect: close },
            { label: 'Close', shortcut: '⌘W', onSelect: close }
          ]}
        />
      )}
    </>
  )
}
