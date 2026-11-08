import { useState } from 'react'
import { Button, ErrorDialog } from '@mnml-tools/ui'

export default function Basic() {
  const [error, setError] = useState<string>()

  return (
    <>
      <Button type="button" onClick={() => setError('relation "peple" does not exist\nLINE 1: SELECT * FROM peple')}>
        Run broken query
      </Button>
      {error && <ErrorDialog title="Query failed" message={error} onDismiss={() => setError(undefined)} />}
    </>
  )
}
