import { ResizableSidebar, SidebarItem, SidebarLabel, SidebarNav } from '@mnml-tools/ui'

export default function Resizable() {
  return (
    <div style={{ display: 'flex', height: 180, border: '1px solid var(--border)' }}>
      {/* The width is remembered in localStorage under `storageKey`. */}
      <ResizableSidebar id="example-sidebar" storageKey="example.sidebar" minimum={160} maximum={360}>
        <SidebarLabel>Schemas</SidebarLabel>
        <SidebarNav label="Schemas">
          <SidebarItem type="button" active>
            <span>public</span>
          </SidebarItem>
          <SidebarItem type="button">
            <span>analytics_with_a_rather_long_name</span>
          </SidebarItem>
        </SidebarNav>
      </ResizableSidebar>
      <div style={{ flex: 1, padding: 12, color: 'var(--muted)' }}>Drag the sidebar's right edge.</div>
    </div>
  )
}
