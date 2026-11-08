import { useState } from 'react'
import { Button, Dialog, Fields } from '@mnml-tools/ui'

export default function Form() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('Production')

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Rename connection…
      </Button>
      <span>Current name: {name}</span>
      {open && (
        <Dialog title="Rename connection" closeLabel="Close" onDismiss={() => setOpen(false)}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setName(String(new FormData(event.currentTarget).get('name')))
              setOpen(false)
            }}
          >
            <Fields>
              <label className="mnml-field-full">
                Name
                {/* `autoFocus` does nothing inside a dialog; `data-autofocus` does. */}
                <input name="name" defaultValue={name} data-autofocus />
              </label>
            </Fields>
            <div className="mnml-dialog-actions" style={{ paddingTop: 16 }}>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">Rename</Button>
            </div>
          </form>
        </Dialog>
      )}
    </>
  )
}
