import { formatShortcut } from '@mnml-tools/ui'
import type { Shortcut } from '@mnml-tools/ui'

const shortcuts: Shortcut[] = [
  { key: 's', primary: true },
  { key: 'p', primary: true, shift: true },
  { key: 'Enter', primary: true, alt: true },
  { key: 'Backspace', primary: true }
]

export default function Format() {
  return (
    <table style={{ borderCollapse: 'collapse', font: '11px var(--mono)' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', paddingRight: 24 }}>macOS</th>
          <th style={{ textAlign: 'left' }}>Windows / Linux</th>
        </tr>
      </thead>
      <tbody>
        {shortcuts.map((shortcut) => (
          <tr key={JSON.stringify(shortcut)}>
            <td style={{ paddingRight: 24 }}>{formatShortcut(shortcut, true)}</td>
            <td>{formatShortcut(shortcut, false)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
