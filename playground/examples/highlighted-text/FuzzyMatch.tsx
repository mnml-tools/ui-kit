import { useState } from 'react'
import { HighlightedText, SearchField } from '@mnml-tools/ui'

const tables = ['people', 'people_with_email', 'events', 'event_types', 'payments']

// Positions of the query's characters, in order, or null when they do not all appear.
function fuzzy(text: string, query: string) {
  const indices: number[] = []
  let from = 0
  for (const character of query.toLowerCase()) {
    const index = text.toLowerCase().indexOf(character, from)
    if (index < 0) return null
    indices.push(index)
    from = index + 1
  }

  return indices
}

export default function FuzzyMatch() {
  const [query, setQuery] = useState('pwe')
  const matches = tables.flatMap((table) => {
    const indices = fuzzy(table, query)

    return indices ? [{ table, indices }] : []
  })

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <SearchField label="Filter tables" placeholder="Filter tables…" value={query} onChange={setQuery} />
      <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--mono)' }}>
        {matches.map(({ table, indices }) => (
          <li key={table}>
            <HighlightedText text={table} indices={indices} />
          </li>
        ))}
      </ul>
    </div>
  )
}
