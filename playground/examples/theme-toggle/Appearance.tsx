import { useState } from 'react'
import { AppearanceDialog, Button } from '@mnml-tools/ui'
import { theme } from '~/theme'

export default function Appearance() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Appearance…
      </Button>
      {open && <AppearanceDialog theme={theme} onDismiss={() => setOpen(false)} />}
    </>
  )
}
