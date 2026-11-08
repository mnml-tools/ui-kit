import { useState } from 'react'
import { Copy, Pencil, Trash2 } from 'lucide-react'
import { ContextMenu } from '@mnml-tools/ui'

export default function RightClick() {
  const [menu, setMenu] = useState<{ x: number; y: number }>()
  const [last, setLast] = useState('Right-click the row.')
  const close = () => setMenu(undefined)
  const run = (action: string) => () => {
    setLast(action)
    close()
  }

  return (
    <div style={{ display: 'grid', gap: 8, width: 300 }}>
      <div
        style={{
          padding: '6px 10px',
          border: '1px solid var(--border)',
          background: 'var(--soft)',
          cursor: 'context-menu'
        }}
        onContextMenu={(event) => {
          event.preventDefault()
          setMenu({ x: event.clientX, y: event.clientY })
        }}
      >
        people_with_email
      </div>
      <span style={{ color: 'var(--muted)' }}>{last}</span>
      {menu && (
        <ContextMenu
          label="Actions for people_with_email"
          x={menu.x}
          y={menu.y}
          onDismiss={close}
          items={[
            { label: 'Rename', icon: <Pencil size={13} />, shortcut: 'F2', onSelect: run('Rename') },
            { label: 'Copy name', icon: <Copy size={13} />, shortcut: '⌘C', onSelect: run('Copy name') },
            { label: 'Drop table', icon: <Trash2 size={13} />, disabled: true, onSelect: run('Drop table') }
          ]}
        />
      )}
    </div>
  )
}
