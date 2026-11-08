import { useState } from 'react'
import { Plus, Table2 } from 'lucide-react'
import {
  DirtyIndicator,
  IconButton,
  Sidebar,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarNav
} from '@mnml-tools/ui'

const tables = [
  { name: 'people', rows: '1.2k' },
  { name: 'people_with_email', rows: '980' },
  { name: 'events', rows: '48k', dirty: true },
  { name: 'payments', rows: '3.1k' }
]

export default function Basic() {
  const [active, setActive] = useState('people')

  return (
    <div style={{ display: 'flex', height: 240, border: '1px solid var(--border)' }}>
      <Sidebar style={{ paddingTop: 12 }}>
        <SidebarLabel>
          Tables
          <IconButton type="button" aria-label="New table" title="New table" style={{ minHeight: 0, padding: 0 }}>
            <Plus size={12} aria-hidden="true" />
          </IconButton>
        </SidebarLabel>
        <SidebarNav label="Tables">
          {tables.map((table) => (
            <SidebarItem
              key={table.name}
              type="button"
              active={table.name === active}
              onClick={() => setActive(table.name)}
            >
              <Table2 size={13} />
              <span>{table.name}</span>
              {table.dirty && <DirtyIndicator />}
              <small>{table.rows}</small>
            </SidebarItem>
          ))}
        </SidebarNav>
        <SidebarFooter>4 tables</SidebarFooter>
      </Sidebar>
      <div style={{ flex: 1, padding: 12, color: 'var(--muted)' }}>{active}</div>
    </div>
  )
}
