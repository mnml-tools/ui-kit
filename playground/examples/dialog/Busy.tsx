import { useState } from 'react'
import { Button, Dialog, Spinner } from '@mnml-tools/ui'

export default function Busy() {
  const [open, setOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  const start = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Export…
      </Button>
      {open && (
        <Dialog
          title="Export table"
          closeLabel="Close"
          // While exporting, Escape, the backdrop and the close button are ignored.
          dismissible={!exporting}
          onDismiss={() => setOpen(false)}
        >
          <p style={{ padding: '4px 16px' }}>Export 1,204 rows of “people” as CSV.</p>
          <div className="mnml-dialog-actions">
            <Button type="button" disabled={exporting} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" disabled={exporting} onClick={start}>
              {exporting && <Spinner size={13} />}
              {exporting ? 'Exporting…' : 'Export'}
            </Button>
          </div>
        </Dialog>
      )}
    </>
  )
}
