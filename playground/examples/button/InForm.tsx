import { useState } from 'react'
import { Button } from '@mnml-tools/ui'

export default function InForm() {
  const [log, setLog] = useState('Nothing yet.')

  return (
    <form
      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
      onSubmit={(event) => {
        event.preventDefault()
        setLog('The form was submitted.')
      }}
    >
      {/* No `type`: like a native button, it submits. */}
      <Button variant="primary">Submit</Button>
      <Button type="button" onClick={() => setLog('Only the click handler ran.')}>
        Just a button
      </Button>
      <span>{log}</span>
    </form>
  )
}
