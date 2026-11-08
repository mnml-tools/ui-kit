import { PlugZap } from 'lucide-react'
import { EmptyState, Message } from '@mnml-tools/ui'

export default function WithNotice() {
  return (
    <EmptyState
      icon={<PlugZap size={28} strokeWidth={1} />}
      title="Not connected"
      notice={<Message tone="error">Error: connect ECONNREFUSED 127.0.0.1:5432</Message>}
    >
      Check that the server is running, then reconnect.
    </EmptyState>
  )
}
