import { ResizeHandle, useResize } from '@mnml-tools/ui'

export default function RightPanel() {
  // The handle sits on the panel's left edge; dragging left widens it.
  const resize = useResize({ storageKey: 'example.inspector', initial: 180, minimum: 140, maximum: 320, edge: 'left' })

  return (
    <div style={{ display: 'flex', height: 120, width: '100%', border: '1px solid var(--border)' }}>
      <div style={{ flex: 1, padding: 12, color: 'var(--muted)' }}>Content</div>
      <aside
        id="example-inspector"
        style={{
          position: 'relative',
          width: resize.width,
          padding: 12,
          background: 'var(--sidebar)',
          borderLeft: '1px solid var(--border)'
        }}
      >
        Inspector · {resize.width}px
        <ResizeHandle {...resize} label="Resize inspector" controls="example-inspector" />
      </aside>
    </div>
  )
}
