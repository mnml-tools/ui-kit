import tokensSource from '../../src/styles/tokens.css?raw'
import { Badge, useTheme } from '@mnml-tools/ui'
import { Api, exports } from '../app/Api.tsx'
import { Code, Link, Note, Section } from '../app/content.tsx'
import { CopyButton } from '../app/CopyButton.tsx'
import { Example } from '../app/Example.tsx'
import { theme } from '../app/theme.ts'

export function Introduction() {
  return (
    <>
      <Example name="app-shell/Window" stage="block" flush collapsed>
        A whole window built only from kit components. Everything on this site — the sidebar, the search, the title and
        status bars — is the kit too.
      </Example>
      <Section title="What is in the kit">
        <ul>
          <li>
            <strong>Tokens</strong>: warm neutral colours for light and dark mode, five accents, a mono font stack.{' '}
            <Link to="tokens">Design tokens</Link>
          </li>
          <li>
            <strong>Base styles</strong> (optional): a 12px system font, square native controls, the focus ring and
            selection colour.
          </li>
          <li>
            <strong>React components</strong> from atoms (<Link to="button">Button</Link>, <Link to="badge">Badge</Link>
            ) through dialogs, menus and tabs to the window layout (<Link to="app-shell">AppShell</Link>,{' '}
            <Link to="title-bar">TitleBar</Link>, <Link to="sidebar">Sidebar</Link>).
          </li>
          <li>
            <strong>Hooks</strong> for themes, document-wide <Link to="shortcuts">shortcuts</Link>, resizable panes and
            context menus.
          </li>
          <li>
            <strong>Tauri helpers</strong> in <code>@mnml-tools/ui/tauri</code>: native theme sync,{' '}
            <Link to="window-controls">window controls</Link> and an <Link to="updates">update dialog</Link>.
          </li>
        </ul>
      </Section>
      <Section title="Principles">
        <ul>
          <li>Square controls, a 12px system font, warm neutral greys. Zap is the visual reference.</li>
          <li>
            Native elements first: <code>Button</code> is a <code>&lt;button&gt;</code>, <code>Dialog</code> a modal{' '}
            <code>&lt;dialog&gt;</code>. Props you know from HTML keep working.
          </li>
          <li>
            Accessible by default: dialogs label themselves, menus and resize handles work from the keyboard, icon-only
            buttons ask for an <code>aria-label</code>.
          </li>
          <li>
            Easy to override: every kit rule sits in a cascade layer, so plain app CSS wins without{' '}
            <code>!important</code>. See <Link to="css">CSS &amp; overrides</Link>.
          </li>
        </ul>
      </Section>
      <Section title="How to read these docs">
        <p>
          Each component page has live examples. The code under a preview is the file that renders it, so it is always
          current and can be copied into an app as is. The API tables are generated from the TypeScript source and its
          JSDoc comments. Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> to search, and use the palette in the title bar to try
          every page in each colour mode and accent.
        </p>
      </Section>
    </>
  )
}

export function Installation() {
  return (
    <>
      <Section title="Install">
        <Code language="sh" code="npm install @mnml-tools/ui lucide-react" />
        <p>
          React 19 and <code>lucide-react</code> are peer dependencies. The Tauri ones (<code>@tauri-apps/api</code>,{' '}
          <code>@tauri-apps/plugin-updater</code>, <code>@tauri-apps/plugin-process</code>) are only needed for{' '}
          <code>@mnml-tools/ui/tauri</code>.
        </p>
      </Section>
      <Section title="Import the CSS">
        <p>At the top of the app's stylesheet, either everything at once:</p>
        <Code language="css" code="@import '@mnml-tools/ui/styles.css';" />
        <p>or only the parts you need:</p>
        <Code
          language="css"
          code={`@import '@mnml-tools/ui/tokens.css';
@import '@mnml-tools/ui/base.css'; /* optional: document reset, controls, focus ring, selection */
@import '@mnml-tools/ui/components.css';`}
        />
        <div className="docs-table-scroll">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Import</th>
                <th>Contents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>@mnml-tools/ui</code>
                </td>
                <td>components, hooks, theme store, utilities</td>
              </tr>
              <tr>
                <td>
                  <code>@mnml-tools/ui/tauri</code>
                </td>
                <td>
                  <code>syncNativeTheme</code>, <code>nativeMac</code>, <code>nativeLinux</code>,{' '}
                  <code>WindowControls</code>, <code>UpdateDialog</code>, <code>useAppUpdate</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>@mnml-tools/ui/tokens.css</code>
                </td>
                <td>colour tokens for light and dark, accents, focus ring, mono font</td>
              </tr>
              <tr>
                <td>
                  <code>@mnml-tools/ui/base.css</code>
                </td>
                <td>optional element base: font, reset, native controls, focus, selection</td>
              </tr>
              <tr>
                <td>
                  <code>@mnml-tools/ui/components.css</code>
                </td>
                <td>styles of the components (needs the tokens; works with or without the base)</td>
              </tr>
              <tr>
                <td>
                  <code>@mnml-tools/ui/styles.css</code>
                </td>
                <td>tokens, base and components in one import</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Create the theme store">
        <p>
          Create it once, at module load, so the first paint already has the right colours. It writes{' '}
          <code>data-theme</code> and <code>data-accent</code> on <code>&lt;html&gt;</code>.
        </p>
        <Code
          code={`// src/services/theme.ts
import { createTheme } from '@mnml-tools/ui'
import { syncNativeTheme } from '@mnml-tools/ui/tauri'

export const theme = createTheme({ storagePrefix: 'myapp', onThemeChange: syncNativeTheme })`}
        />
        <p>
          Then read and change it from any component with <code>useTheme</code>, or drop in a{' '}
          <Link to="theme-toggle">ThemeToggle</Link>. More in <Link to="theming">Theming</Link>.
        </p>
      </Section>
      <Section title="A first window">
        <Code
          code={`import { Database } from 'lucide-react'
import { AppShell, Brand, EmptyState, StatusBar, ThemeToggle, TitleBar } from '@mnml-tools/ui'
import { theme } from './services/theme'

export function App() {
  return (
    <AppShell>
      <TitleBar brand={<Brand icon={<Database />} name="My app" />} end={<ThemeToggle theme={theme} />} />
      <EmptyState title="Nothing here yet">Open a file to start.</EmptyState>
      <StatusBar start="Ready" end="v1.0.0" />
    </AppShell>
  )
}`}
        />
      </Section>
      <Section title="Working on the kit">
        <Code
          language="sh"
          code={`npm install
npm run dev          # these docs at http://127.0.0.1:1440
npm run docs:build   # static docs site in dist-docs/
npm run build        # dist/: ESM + .d.ts + CSS
npm test`}
        />
        <p>
          To try the kit inside an app, install it from disk (<code>npm install ../ui-kit</code>) and dedupe React in
          the app's Vite config, so the linked kit and the app share one copy. Rebuild the kit after each change.
        </p>
        <Code code={`resolve: { dedupe: ['react', 'react-dom', '@tauri-apps/api'] }`} />
        <Note>
          To document a new component: add an example under <code>playground/examples/</code>, then a page in{' '}
          <code>playground/app/pages.ts</code>. The API table comes from the source; the{' '}
          <Link to="api-index">API index</Link> flags exports no page documents yet.
        </Note>
      </Section>
    </>
  )
}

export function Theming() {
  return (
    <>
      <Example name="theming/Switcher" title="Mode and accent">
        <code>useTheme</code> subscribes to the store, so every component that reads it re-renders when anything — this
        switcher, the title bar's palette, another window — changes the theme.
      </Example>
      <Section title="How it works">
        <ul>
          <li>
            <code>createTheme</code> reads <code>&lt;prefix&gt;.theme</code> and <code>&lt;prefix&gt;.accent</code> from{' '}
            <code>localStorage</code>, falling back to <code>defaultTheme</code> and <code>defaultAccent</code>.
          </li>
          <li>
            It sets <code>&lt;html data-theme="dark" data-accent="green"&gt;</code> right away; the tokens switch on
            those attributes.
          </li>
          <li>
            Changes are persisted and broadcast to other windows through <code>storage</code> events, so every window of
            the app stays in sync.
          </li>
          <li>
            <code>onThemeChange</code> runs each time the mode is applied — pass <code>syncNativeTheme</code> to match
            the native title bar.
          </li>
        </ul>
      </Section>
      <Example name="theming/AccentAware" title="What the accent changes">
        An accent replaces the neutral focus ring, indicator and selection colours. Without one they stay grey.
      </Example>
      <Section title="Overriding colours">
        <p>Tokens are plain custom properties, so an app can redefine any of them after importing the kit:</p>
        <Code
          language="css"
          code={`:root {
  --background: #fffefa;
}

:root[data-theme='dark'] {
  --background: #1b1b19;
}`}
        />
      </Section>
      <Section title="API">
        <Api name="createTheme" />
        <Api name="useTheme" />
        <Api name="ThemeStore" />
        <Api name="Appearance" />
        <Api name="modes" />
        <Api name="accents" />
        <Api name="Theme" />
        <Api name="Accent" />
      </Section>
    </>
  )
}

type Token = { name: string; light?: string; dark?: string; note?: string }

// Read from tokens.css itself, so a new or changed token shows up here without editing this page.
function parseTokens() {
  const block = (selector: string) => tokensSource.match(new RegExp(`${selector} \\{([\\s\\S]*?)\\n  \\}`))?.[1] ?? ''
  const tokens = new Map<string, Token>()

  for (const [mode, body] of [
    ['light', block(':root')],
    ['dark', block(":root\\[data-theme='dark'\\]")]
  ] as const) {
    let note: string | undefined
    for (const line of body.split('\n').map((text) => text.trim())) {
      const comment = line.match(/^\/\*\s*(.*?)\s*\*\/$/)
      const declaration = line.match(/^--([\w-]+):\s*(.+);$/)
      if (comment) note = comment[1]
      else if (declaration) {
        const token = tokens.get(declaration[1]) ?? { name: declaration[1] }
        token[mode] = declaration[2]
        token.note ??= note
        tokens.set(token.name, token)
        note = undefined
      }
    }
  }

  const accents = [...tokensSource.matchAll(/\[data-swatch='(\w+)'\] \{\s*--accent: (#\w+)/g)].map(
    ([, name, value]) => ({ name, value })
  )

  return { tokens: [...tokens.values()], accents }
}

const tokenGroups: [string, string[]][] = [
  ['Surfaces', ['background', 'soft', 'raised', 'sidebar', 'editor-bg', 'hover', 'hover-strong', 'selected']],
  ['Text and icons', ['text', 'secondary', 'muted', 'placeholder', 'faint', 'icon', 'null']],
  ['Lines and depth', ['border', 'control-border', 'overlay', 'shadow']],
  ['Focus and status', ['focus', 'focus-ring', 'indicator', 'success-text', 'danger', 'on-danger']],
  ['Notices', ['notice-bg', 'notice-border', 'notice-text']],
  ['Edited cells', ['edited-bg', 'edited-accent', 'edited-text']],
  ['Typography', ['mono']]
]

export function Tokens() {
  const { theme: mode } = useTheme(theme)
  const { tokens, accents } = parseTokens()
  const grouped = new Set(tokenGroups.flatMap(([, names]) => names))
  const groups: [string, Token[]][] = [
    ...tokenGroups.map(([title, names]): [string, Token[]] => [
      title,
      names.flatMap((name) => tokens.filter((token) => token.name === name))
    ]),
    ['Other', tokens.filter((token) => !grouped.has(token.name))]
  ]

  return (
    <>
      <p>
        Names are unprefixed and shared by every app. Use them through <code>var()</code>; the swatches follow the
        current mode (<strong>{mode}</strong>) and accent. Click a name to copy it.
      </p>
      {groups
        .filter(([, list]) => list.length)
        .map(([title, list]) => (
          <Section key={title} title={title}>
            <div className="docs-table-scroll">
              <table className="docs-table docs-tokens">
                <thead>
                  <tr>
                    <th aria-label="Swatch" />
                    <th>Token</th>
                    <th data-current={mode === 'light' || undefined}>Light</th>
                    <th data-current={mode === 'dark' || undefined}>Dark</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((token) => (
                    <tr key={token.name}>
                      <td>
                        {token.name === 'mono' ? (
                          <span className="docs-font-sample">Ag</span>
                        ) : (
                          <span className="docs-swatch" style={{ background: `var(--${token.name})` }} />
                        )}
                      </td>
                      <td>
                        <span className="docs-token-name">
                          <code>--{token.name}</code>
                          <CopyButton text={`var(--${token.name})`} label={`Copy var(--${token.name})`} />
                        </span>
                      </td>
                      <td data-current={mode === 'light' || undefined}>
                        <code>{token.light}</code>
                      </td>
                      <td data-current={mode === 'dark' || undefined}>
                        <code>{token.dark ?? 'same'}</code>
                      </td>
                      <td>{token.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        ))}
      <Section title="Accents">
        <p>
          Set with <code>setAccent</code> (<code>data-accent</code> on <code>&lt;html&gt;</code>). Once an accent is
          set, <code>--focus</code>, <code>--focus-ring</code> and <code>--indicator</code> take its colour and{' '}
          <code>--selected</code> becomes a 16% tint of it. <code>data-swatch="green"</code> on any element previews one
          accent locally.
        </p>
        <div className="docs-accents">
          {accents.map((accent) => (
            <div key={accent.name} className="docs-accent" data-swatch={accent.name}>
              <span />
              <strong>{accent.name}</strong>
              <code>{accent.value}</code>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

const componentStyles = import.meta.glob<string>('../../src/styles/components/*.css', {
  eager: true,
  query: '?raw',
  import: 'default'
})

export function Css() {
  const classes = Object.entries(componentStyles).map(([path, source]) => ({
    file: path.split('/').pop()!,
    names: [...new Set([...source.matchAll(/\.(mnml-[\w-]+)/g)].map((match) => match[1]))]
  }))

  return (
    <>
      <Section title="Cascade layers">
        <p>All kit CSS is declared in three layers, in this order:</p>
        <Code language="css" code="@layer mnml.tokens, mnml.base, mnml.components;" />
        <p>
          Unlayered CSS always beats layered CSS, whatever its specificity. So an app's own rules override the kit
          without <code>!important</code> or selector tricks:
        </p>
        <Code
          language="css"
          code={`/* app.css: wins over .mnml-dialog's 490px */
.export-dialog {
  width: 640px;
}`}
        />
      </Section>
      <Section title="Bare element defaults">
        <Note tone="warning">
          Put an app's own element defaults (<code>h2</code>, <code>p</code>, …) into the base layer. Left unlayered, an{' '}
          <code>
            h2 {'{'} font-size {'}'}
          </code>{' '}
          would beat the kit's components and resize every dialog title.
        </Note>
        <Code
          language="css"
          code={`@layer mnml.base {
  h2 {
    font-size: 15px;
  }
}`}
        />
      </Section>
      <Section title="Naming">
        <ul>
          <li>
            Tokens are unprefixed (<code>--text</code>, <code>--background</code>, <code>--accent</code>, …).
          </li>
          <li>
            Component classes start with <code>mnml-</code>. State is in data attributes (<code>[data-active]</code>,{' '}
            <code>[data-variant='primary']</code>) or ARIA (<code>[aria-pressed='true']</code>), never in modifier
            classes.
          </li>
          <li>
            Only <code>base.css</code> styles bare elements, and it is optional: components look the same without it.
          </li>
        </ul>
      </Section>
      <Section title="Class reference">
        <p>Every class the component styles define, by file. Useful as override targets.</p>
        <div className="docs-table-scroll">
          <table className="docs-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(({ file, names }) => (
                <tr key={file}>
                  <td>
                    <code>{file}</code>
                  </td>
                  <td className="docs-class-list">
                    {names.map((name) => (
                      <code key={name}>.{name}</code>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}

export function ApiIndex({ documented }: { documented: Map<string, { slug: string; title: string }> }) {
  const entries = [...exports.values()].sort((a, b) => a.name.localeCompare(b.name))
  const missing = entries.filter((entry) => !documented.has(entry.name))

  return (
    <>
      <p>
        Every export of <code>@mnml-tools/ui</code> and <code>@mnml-tools/ui/tauri</code>, read from the entry points.
        {missing.length > 0 && (
          <>
            {' '}
            <strong>{missing.length}</strong> not documented on any page yet.
          </>
        )}
      </p>
      <div className="docs-table-scroll">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Export</th>
              <th>Kind</th>
              <th>Import from</th>
              <th>Documented in</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const page = documented.get(entry.name)

              return (
                <tr key={entry.name}>
                  <td>
                    <code>{entry.name}</code>
                  </td>
                  <td>
                    <Badge>{entry.kind}</Badge>
                  </td>
                  <td>
                    <code>{entry.entry}</code>
                  </td>
                  <td>{page ? <Link to={page.slug}>{page.title}</Link> : <span className="docs-none">—</span>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
