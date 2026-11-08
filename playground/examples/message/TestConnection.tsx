import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button, Message, Spinner } from '@mnml-tools/ui'

export default function TestConnection() {
  const [state, setState] = useState<'idle' | 'testing' | 'ok' | 'failed'>('idle')
  const [attempt, setAttempt] = useState(0)

  const test = () => {
    setState('testing')
    setTimeout(() => {
      // Alternate, so both outcomes show up.
      setState(attempt % 2 ? 'failed' : 'ok')
      setAttempt(attempt + 1)
    }, 700)
  }

  return (
    <div>
      <Button type="button" disabled={state === 'testing'} onClick={test}>
        {state === 'testing' && <Spinner size={13} />}
        Test connection
      </Button>
      {state === 'ok' && (
        <Message tone="success">
          <Check size={15} />
          Connected to localhost:5432.
        </Message>
      )}
      {state === 'failed' && <Message tone="error">Error: password authentication failed for user "app".</Message>}
    </div>
  )
}
