import { Check } from 'lucide-react'
import { Message } from '@mnml-tools/ui'

export default function Tones() {
  return (
    <div>
      <Message tone="error">Error: the connection was refused.</Message>
      <Message tone="success">
        <Check size={15} />
        Connection successful.
      </Message>
    </div>
  )
}
