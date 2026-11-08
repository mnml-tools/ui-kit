import { useState } from 'react'
import { Check, Inbox, Plus, RefreshCw, Table2, X } from 'lucide-react'
import {
  accents,
  Avatar,
  Badge,
  Button,
  ConfirmDialog,
  ContextMenu,
  createTheme,
  DirtyIndicator,
  EmptyState,
  ErrorDialog,
  Fields,
  Pagination,
  ResizeHandle,
  Tab,
  Tabs,
  ThemeToggle,
  useResize,
  HighlightedText,
  IconButton,
  Message,
  modes,
  SearchField,
  Segmented,
  spinClassName,
  Spinner,
  StatusDot,
  useTheme
} from '../src/index.ts'
import { registerUpdateGuard } from '../src/index.ts'
import { UpdateDialog } from '../src/tauri/UpdateDialog.tsx'
import type { Update } from '@tauri-apps/plugin-updater'

const theme = createTheme({ storagePrefix: 'mnml-playground' })

const tokens = [
  'text',
  'background',
  'soft',
  'raised',
  'sidebar',
  'hover',
  'hover-strong',
  'selected',
  'border',
  'control-border',
  'muted',
  'secondary',
  'placeholder',
  'faint',
  'icon',
  'indicator',
  'focus',
  'accent',
  'notice-bg',
  'notice-border',
  'notice-text',
  'success-text',
  'edited-bg',
  'edited-accent',
  'edited-text',
  'editor-bg',
  'null',
  'overlay',
  'shadow'
]

export function Playground() {
  const { theme: mode, accent, setTheme, setAccent } = useTheme(theme)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [tab, setTab] = useState('people')
  const [page, setPage] = useState(0)
  const [dialog, setDialog] = useState<'confirm' | 'error'>()
  const [menu, setMenu] = useState<{ x: number; y: number }>()
  const resize = useResize({ storageKey: 'mnml-playground.pane' })
  const [update, setUpdate] = useState<Update>()

  return (
    <main className="playground">
      <header className="playground-bar">
        <strong>mnml-tools UI</strong>
        <ThemeToggle theme={theme} />
        <div className="playground-group" role="group" aria-label="Colour mode">
          {modes.map((item) => (
            <button key={item} type="button" aria-pressed={item === mode} onClick={() => setTheme(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="playground-group" role="group" aria-label="Accent colour">
          {accents.map((item) => (
            <button key={item} type="button" aria-pressed={item === accent} onClick={() => setAccent(item)}>
              <span className="playground-swatch" data-swatch={item} aria-hidden="true" />
              {item}
            </button>
          ))}
        </div>
      </header>

      <section>
        <h2>Tokens</h2>
        <div className="playground-tokens">
          {tokens.map((token) => (
            <div key={token} className="playground-token">
              <span style={{ background: `var(--${token})` }} />
              <code>--{token}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Base controls</h2>
        <div className="playground-row">
          <button type="button">Button</button>
          <button type="button" disabled>
            Disabled
          </button>
          <input placeholder="Input" />
          <select defaultValue="one">
            <option value="one">Select</option>
          </select>
        </div>
        <p>Tab through the controls to see the focus ring follow the accent. Select this text to see the selection.</p>
      </section>

      <section>
        <h2>Buttons</h2>
        <div className="playground-row">
          <Button type="button">Default</Button>
          <Button type="button" variant="primary">
            <Plus size={15} />
            Primary
          </Button>
          <Button type="button" disabled>
            Disabled
          </Button>
          <Button type="button">
            <Spinner size={13} />
            Busy
          </Button>
          <IconButton type="button" title="Close" aria-label="Close">
            <X size={13} aria-hidden="true" />
          </IconButton>
          <IconButton type="button" title="Refresh" aria-label="Refresh">
            <RefreshCw size={14} className={spinClassName} aria-hidden="true" />
          </IconButton>
        </div>
      </section>

      <section>
        <h2>Indicators</h2>
        <div className="playground-row">
          <StatusDot /> Connected
          <DirtyIndicator /> Unsaved
          <Badge>PostgreSQL</Badge>
          <Avatar color="#db4aa6">E</Avatar>
          <Avatar color="#0d8a4b" size="small">
            Z
          </Avatar>
          <HighlightedText text="people_with_email" indices={[0, 7, 12]} />
        </div>
        <Message tone="error">Error: the connection was refused.</Message>
        <Message tone="success">
          <Check size={15} />
          Connection successful.
        </Message>
      </section>

      <section>
        <h2>Search and segmented</h2>
        <div className="playground-row">
          <SearchField label="Search" placeholder="Find a connection…" value={search} onChange={setSearch} />
          <SearchField
            className="playground-boxed"
            label="Filter tables"
            placeholder="Filter tables…"
            value={search}
            onChange={setSearch}
            size={12}
            shortcutHint="⇧⇧"
            shortcutLabel="Shift twice"
          />
          <Segmented label="View">
            <Button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>
              List
            </Button>
            <Button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
              Grid
            </Button>
          </Segmented>
        </div>
      </section>
      <section>
        <h2>Navigation and overlays</h2>
        <Tabs>
          {['people', 'events'].map((name) => (
            <Tab
              key={name}
              title={name}
              icon={<Table2 size={14} />}
              active={tab === name}
              dirty={name === 'events'}
              closeLabel={`Close ${name}`}
              onSelect={() => setTab(name)}
              onClose={() => setTab('people')}
              onContextMenu={(event) => {
                event.preventDefault()
                setMenu({ x: event.clientX, y: event.clientY })
              }}
            />
          ))}
        </Tabs>
        <Pagination
          page={page}
          pageCount={3}
          summary="120 rows"
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
        <div className="playground-row">
          <Button type="button" onClick={() => setDialog('confirm')}>
            Confirm dialog
          </Button>
          <Button type="button" onClick={() => setDialog('error')}>
            Error dialog
          </Button>
          <Button type="button" onClick={() => setUpdate(fakeUpdate())}>
            Update dialog
          </Button>
          <span>Right-click a tab for the context menu.</span>
        </div>
        {menu && (
          <ContextMenu
            label="Tab actions"
            x={menu.x}
            y={menu.y}
            onDismiss={() => setMenu(undefined)}
            items={[
              { label: 'Close tab', shortcut: '⌘W', onSelect: () => setMenu(undefined) },
              { label: 'Close other tabs', disabled: true, onSelect: () => setMenu(undefined) }
            ]}
          />
        )}
        {dialog === 'confirm' && (
          <ConfirmDialog
            message="Discard all pending changes?"
            onCancel={() => setDialog(undefined)}
            onConfirm={() => setDialog(undefined)}
          />
        )}
        {update && (
          <UpdateDialog
            update={update}
            appName="Playground"
            releaseNotesUrl="https://example.com/releases"
            onDismiss={() => setUpdate(undefined)}
          />
        )}
        {dialog === 'error' && (
          <ErrorDialog title="Table error" message="Simulated failure." onDismiss={() => setDialog(undefined)} />
        )}
      </section>

      <section className="playground-split">
        <aside id="playground-pane" style={{ width: resize.width }}>
          <Fields>
            <label className="mnml-field-full">
              Name
              <input placeholder="e.g. Production" />
            </label>
            <label>
              Host
              <input defaultValue="localhost" />
            </label>
            <label>
              Port
              <input defaultValue="5432" />
            </label>
          </Fields>
          <ResizeHandle {...resize} label="Resize pane" controls="playground-pane" />
        </aside>
        <EmptyState icon={<Inbox size={28} strokeWidth={1} />} title="Nothing selected">
          Pick something on the left.
        </EmptyState>
      </section>
    </main>
  )
}

// Unsaved work, so the dialog asks first; the download runs in 20 steps, then relaunch fails outside Tauri.
registerUpdateGuard(() => ({ dirty: true, busy: false }))

function fakeUpdate() {
  return {
    version: '9.9.9',
    close: async () => {},
    downloadAndInstall: async (onEvent: (event: unknown) => void) => {
      onEvent({ event: 'Started', data: { contentLength: 2000 } })
      for (let step = 0; step < 20; step++) {
        await new Promise((resolve) => setTimeout(resolve, 60))
        onEvent({ event: 'Progress', data: { chunkLength: 100 } })
      }
      onEvent({ event: 'Finished' })
    }
  } as unknown as Update
}
