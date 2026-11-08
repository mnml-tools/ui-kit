import { useState } from 'react'
import { Button, ConfirmDialog } from '@mnml-tools/ui'

export default function Discard() {
  const [asking, setAsking] = useState(false)
  const [result, setResult] = useState('')

  return (
    <>
      <Button type="button" onClick={() => setAsking(true)}>
        Discard changes
      </Button>
      <span>{result}</span>
      {asking && (
        <ConfirmDialog
          title="Discard changes"
          message="Discard all pending changes to “people”? This cannot be undone."
          confirmLabel="Discard"
          onCancel={() => {
            setAsking(false)
            setResult('Kept the changes.')
          }}
          onConfirm={() => {
            setAsking(false)
            setResult('Discarded.')
          }}
        />
      )}
    </>
  )
}
