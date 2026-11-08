import { Inbox } from 'lucide-react'
import { EmptyState } from '@mnml-tools/ui'

export default function Basic() {
  return (
    <EmptyState icon={<Inbox size={28} strokeWidth={1} />} title="Nothing selected">
      Pick a table on the left to see its rows.
    </EmptyState>
  )
}
