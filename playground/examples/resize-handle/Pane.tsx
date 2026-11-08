import { ResizeHandle, useResize } from '@mnml-tools/ui'

export default function Pane() {
  const resize = useResize({ storageKey: 'example.pane', initial: 200, minimum: 140, maximum: 360 })

  return (
    <div style={{ display: 'flex', height: 160, width: '100%', border: '1px solid var(--border)' }}>
      <aside
        id="example-pane"
        style={{
          position: 'relative',
          width: resize.width,
          padding: 12,
          background: 'var(--sidebar)',
          borderRight: '1px solid var(--border)'
        }}
      >
        {resize.width}px — drag the edge, or focus it and use ← → (Shift for 50px), Home, End.
        <ResizeHandle {...resize} label="Resize pane" controls="example-pane" />
      </aside>
      <div style={{ flex: 1, padding: 12, color: 'var(--muted)' }}>Content</div>
    </div>
  )
}
