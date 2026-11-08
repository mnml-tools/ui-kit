import { useState } from 'react'
import { Button, Spinner } from '@mnml-tools/ui'

export default function States() {
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <>
      <Button type="button" disabled>
        Disabled
      </Button>
      <Button type="button" variant="primary" disabled={saving} onClick={save}>
        {saving && <Spinner size={13} />}
        {saving ? 'Saving…' : 'Save'}
      </Button>
    </>
  )
}
