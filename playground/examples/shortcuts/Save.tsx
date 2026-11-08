import { useState } from 'react'
import { Button, formatShortcut, useShortcut } from '@mnml-tools/ui'
import type { Shortcut } from '@mnml-tools/ui'

// Define shortcuts outside the component: `useShortcut` re-registers when the object changes.
const save: Shortcut = { key: 's', primary: true, allowInInputs: true }
const palette: Shortcut = { key: 'Shift', doubleTap: true }

export default function Save() {
  const [enabled, setEnabled] = useState(true)
  const [log, setLog] = useState<string[]>([])
  const add = (line: string) => setLog((lines) => [`${new Date().toLocaleTimeString()} ${line}`, ...lines].slice(0, 3))

  useShortcut(save, enabled, () => add('Saved'))
  useShortcut(palette, enabled, () => add('Opened the command palette'))

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span>
          Press <kbd>{formatShortcut(save)}</kbd> or Shift twice.
        </span>
        <Button type="button" aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Disable' : 'Enable'}
        </Button>
      </div>
      <input placeholder={`${formatShortcut(save)} works here too (allowInInputs)`} style={{ width: 300 }} />
      <code style={{ color: 'var(--muted)', whiteSpace: 'pre' }}>{log.join('\n') || 'Nothing yet.'}</code>
    </div>
  )
}
