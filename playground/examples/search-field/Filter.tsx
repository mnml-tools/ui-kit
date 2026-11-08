import { useState } from 'react'
import { SearchField } from '@mnml-tools/ui'

const connections = ['Production', 'Staging', 'Local', 'Analytics replica']

export default function Filter() {
  const [query, setQuery] = useState('')
  const shown = connections.filter((name) => name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <SearchField label="Search connections" placeholder="Find a connection…" value={query} onChange={setQuery} />
      <span style={{ color: 'var(--muted)' }}>{shown.join(', ') || 'No connection matches.'}</span>
    </div>
  )
}
