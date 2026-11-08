import { useState } from 'react'
import { Button, Dialog } from '@mnml-tools/ui'

export default function KeepMounted() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open notes
      </Button>
      {/* Always rendered: `open` shows and hides it, so the draft survives closing. */}
      <Dialog title="Notes" closeLabel="Close" open={open} onDismiss={() => setOpen(false)}>
        <div style={{ padding: 16 }}>
          <textarea rows={4} style={{ width: '100%', font: 'inherit' }} placeholder="Type, close, open again…" />
        </div>
      </Dialog>
    </>
  )
}
