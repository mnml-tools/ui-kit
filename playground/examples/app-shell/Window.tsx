import { useState } from 'react'
import { Database, Inbox, Table2 } from 'lucide-react'
import {
  AppShell,
  Brand,
  DirtyIndicator,
  EmptyState,
  ResizableSidebar,
  SearchField,
  Separator,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  StatusBar,
  StatusDot,
  Tab,
  Tabs,
  ThemeToggle,
  TitleBar
} from '@mnml-tools/ui'
import { theme } from '~/theme'

const tables = ['people', 'people_with_email', 'events', 'payments', 'sessions']

export default function Window() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(['people', 'events'])
  const [active, setActive] = useState('people')
  const shown = tables.filter((table) => table.includes(query.toLowerCase()))

  const select = (table: string) => {
    if (!open.includes(table)) setOpen([...open, table])
    setActive(table)
  }

  return (
    <AppShell>
      <TitleBar
        brand={<Brand icon={<Database />} name="Zap" note="Production" />}
        end={
          <>
            <StatusDot />
            Connected
            <ThemeToggle theme={theme} />
          </>
        }
      />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <ResizableSidebar id="window-sidebar" storageKey="example.window.sidebar">
          <SearchField label="Filter tables" placeholder="Filter tables…" value={query} onChange={setQuery} />
          <SidebarLabel>
            Tables <span>{shown.length}</span>
          </SidebarLabel>
          <SidebarNav label="Tables">
            {shown.map((table) => (
              <SidebarItem key={table} type="button" active={table === active} onClick={() => select(table)}>
                <Table2 size={13} />
                <span>{table}</span>
                {table === 'events' && <DirtyIndicator />}
              </SidebarItem>
            ))}
          </SidebarNav>
          <SidebarFooter>PostgreSQL 16</SidebarFooter>
        </ResizableSidebar>
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Tabs>
            {open.map((table) => (
              <Tab
                key={table}
                title={table}
                icon={<Table2 size={14} />}
                active={table === active}
                dirty={table === 'events'}
                closeLabel={`Close ${table}`}
                onSelect={() => setActive(table)}
                onClose={() => {
                  const rest = open.filter((item) => item !== table)
                  setOpen(rest)
                  if (table === active) setActive(rest[0] ?? '')
                }}
              />
            ))}
          </Tabs>
          <EmptyState icon={<Inbox size={28} strokeWidth={1} />} title={active || 'No table open'}>
            {active ? 'Rows would load here.' : 'Pick a table on the left.'}
          </EmptyState>
        </main>
      </div>
      <StatusBar
        start={
          <>
            localhost:5432
            <Separator />
            {active || '—'}
          </>
        }
        end="UTF-8"
      />
    </AppShell>
  )
}
