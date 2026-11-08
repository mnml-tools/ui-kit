import { useRef, useState } from 'react'
import { SearchField, useShortcut } from '@mnml-tools/ui'

export default function Shortcut() {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)

  // Press Shift twice anywhere on the page to jump into the field.
  useShortcut({ key: 'Shift', doubleTap: true }, true, () => input.current?.focus())

  return (
    <div style={{ width: 240, padding: '4px 6px', border: '1px solid var(--border)', background: 'var(--background)' }}>
      <SearchField
        label="Filter tables"
        placeholder="Filter tables…"
        value={query}
        onChange={setQuery}
        size={12}
        inputRef={input}
        shortcutHint="⇧⇧"
        shortcutLabel="Shift twice"
      />
    </div>
  )
}
