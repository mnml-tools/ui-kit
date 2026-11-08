import { Api } from '../app/Api.tsx'
import { Code, Link, Note, Section } from '../app/content.tsx'
import { Example } from '../app/Example.tsx'

export function AppShellPage() {
  return (
    <>
      <Example name="app-shell/Window" title="A full window" stage="block" flush>
        A column that fills the window (<code>100vh</code>): title bar, content, status bar. The content in between is
        yours — usually a flex row with a sidebar and a main area. In these docs the preview is given a fixed height.
      </Example>
      <Section title="Undecorated windows">
        <p>
          <code>framed</code> draws a 1px border round the window, for windows without native decorations, such as Tauri
          on Linux:
        </p>
        <Code
          code={`import { nativeLinux } from '@mnml-tools/ui/tauri'

<AppShell framed={nativeLinux}>…</AppShell>`}
        />
      </Section>
      <Section title="API">
        <Api name="AppShell" />
      </Section>
    </>
  )
}

export function TitleBarPage() {
  return (
    <>
      <Example name="title-bar/Basic" title="Brand, centre and end" stage="block" flush>
        <code>Brand</code> shows the app icon, name and an optional note (hidden below 800px). <code>center</code> holds
        the current document or a switcher, <code>end</code> the status and controls.
      </Example>
      <Note>
        The bar is a Tauri drag region: its children ignore the pointer so that dragging anywhere moves the window.{' '}
        <Link to="theme-toggle">ThemeToggle</Link> and <Link to="window-controls">WindowControls</Link> opt back in;
        give other interactive children <code>pointer-events: auto</code>.
      </Note>
      <Example name="title-bar/MacInset" title="macOS overlay title bar" stage="block" flush>
        <code>macInset</code> leaves room for the traffic lights when the window uses an overlay title bar.
      </Example>
      <Section title="API">
        <Api name="TitleBar" />
        <Api name="Brand" />
      </Section>
    </>
  )
}

export function StatusBarPage() {
  return (
    <>
      <Example name="status-bar/Basic" title="Start and end" stage="block" flush>
        A thin mono bar for the window's bottom edge. Separate items with <Link to="separator">Separator</Link>.
      </Example>
      <Section title="API">
        <Api name="StatusBar" />
      </Section>
    </>
  )
}

export function SidebarPage() {
  return (
    <>
      <Example name="sidebar/Basic" title="Navigation" stage="block" flush>
        <code>SidebarLabel</code> is a small heading with room on the right for a count or actions.{' '}
        <code>SidebarItem</code> is a full-width row: an icon, a <code>&lt;span&gt;</code> label that ellipsises, then
        markers such as <code>DirtyIndicator</code> or a <code>&lt;small&gt;</code>. <code>SidebarNav</code> scrolls and{' '}
        <code>SidebarFooter</code> sticks to the bottom.
      </Example>
      <Example name="sidebar/Resizable" title="Resizable" stage="block" flush>
        <code>ResizableSidebar</code> adds a <Link to="resize-handle">resize handle</Link> on the right edge and
        remembers the width.
      </Example>
      <Note>
        A <Link to="search-field">SearchField</Link> placed directly in the sidebar gets a boxed look that fits it, as
        in the navigation of this site.
      </Note>
      <Section title="API">
        <Api name="Sidebar" />
        <Api name="ResizableSidebar" />
        <Api name="SidebarNav" />
        <Api name="SidebarItem" />
        <Api name="SidebarLabel" />
        <Api name="SidebarFooter" />
      </Section>
    </>
  )
}

export function TauriSetup() {
  return (
    <>
      <Section title="Native theme">
        <p>
          Pass <code>syncNativeTheme</code> as the store's <code>onThemeChange</code>, so the native title bar and
          window chrome follow the app's colour mode. Outside Tauri it does nothing.
        </p>
        <Code
          code={`import { createTheme } from '@mnml-tools/ui'
import { syncNativeTheme } from '@mnml-tools/ui/tauri'

export const theme = createTheme({ storagePrefix: 'myapp', onThemeChange: syncNativeTheme })`}
        />
      </Section>
      <Section title="Platform flags">
        <p>
          <code>nativeMac</code> and <code>nativeLinux</code> are true only inside a Tauri window on that platform, so
          the same code runs in a browser during development.
        </p>
        <Code
          code={`import { AppShell, TitleBar } from '@mnml-tools/ui'
import { nativeLinux, nativeMac, WindowControls } from '@mnml-tools/ui/tauri'

<AppShell framed={nativeLinux}>
  <TitleBar brand={brand} macInset={nativeMac} end={nativeLinux && <WindowControls />} />
  …
</AppShell>`}
        />
        <p>
          For the browser-only check (Cmd as the link modifier), use <Link to="utilities">macPlatform</Link> from the
          main entry instead.
        </p>
      </Section>
      <Section title="API">
        <Api name="syncNativeTheme" />
        <Api name="nativeMac" />
        <Api name="nativeLinux" />
      </Section>
    </>
  )
}

export function WindowControlsPage() {
  return (
    <>
      <Example name="window-controls/TitleBar" title="In the title bar" stage="block" flush>
        Minimise, maximise/restore and close, for undecorated windows. The middle icon follows the window's maximised
        state; close turns red on hover. Here a stand-in for the Tauri window API lets it run in the browser.
      </Example>
      <Section title="API">
        <Api name="WindowControls" />
      </Section>
    </>
  )
}

export function UpdatesPage() {
  return (
    <>
      <Example name="updates/Dialog" title="Update dialog">
        Downloads with progress, installs and relaunches. Before installing it asks the update guard: running work
        blocks the update, unsaved work needs a confirmation. Escape and Later dismiss it, except while installing.
      </Example>
      <Section title="Wiring it up">
        <p>
          <code>useAppUpdate</code> checks once at startup (only inside Tauri) and hands the result to the dialog.
          Report the app's state with <code>registerUpdateGuard</code>:
        </p>
        <Code
          code={`import { registerUpdateGuard } from '@mnml-tools/ui'
import { UpdateDialog, useAppUpdate } from '@mnml-tools/ui/tauri'

// Once, e.g. in the editor's store: what would an update restart interrupt?
registerUpdateGuard(() => ({ dirty: editor.hasUnsavedChanges(), busy: queries.running() > 0 }))

export function Updates() {
  const { update, dismiss } = useAppUpdate({ enabled: !import.meta.env.DEV })

  return update && <UpdateDialog update={update} appName="Zap" onDismiss={dismiss} />
}`}
        />
        <Note>
          The app needs the Tauri updater and process plugins, and their permissions, in its Rust and capability
          configuration.
        </Note>
      </Section>
      <Section title="API">
        <Api name="UpdateDialog" />
        <Api name="useAppUpdate" />
        <Api name="registerUpdateGuard" />
        <Api name="UpdateSafety" />
        <Api name="inspectUpdateSafety" />
        <Api name="updateDecision" />
      </Section>
    </>
  )
}

export function ShortcutsPage() {
  return (
    <>
      <Example name="shortcuts/Save" title="useShortcut">
        Document-wide shortcuts. <code>primary</code> is Cmd on macOS and Ctrl elsewhere; <code>doubleTap</code> on
        Shift catches a quick double press. While <code>enabled</code> is false the shortcut is skipped.
      </Example>
      <Section title="Rules">
        <ul>
          <li>One document listener serves every registered shortcut; the newest enabled match wins.</li>
          <li>
            Nothing runs while a modal dialog is open or an IME is composing, or for events already{' '}
            <code>defaultPrevented</code>.
          </li>
          <li>
            Shortcuts are skipped while an input, textarea, select or contenteditable has the focus, unless they set{' '}
            <code>allowInInputs</code>.
          </li>
          <li>A matched key is prevented; held-down repeats do not run the command again.</li>
          <li>
            <code>run</code> and <code>enabled</code> may change on every render; a new <code>shortcut</code> object
            re-registers, so define shortcuts outside components.
          </li>
        </ul>
      </Section>
      <Example name="shortcuts/Format" title="formatShortcut">
        The label to show in menus and hints, in each platform's convention. It detects the platform when the second
        argument is left out.
      </Example>
      <Section title="API">
        <Api name="useShortcut" />
        <Api name="Shortcut" />
        <Api name="formatShortcut" />
        <Api name="matchesShortcut" />
        <Api name="registerShortcut" />
        <p>
          <code>registerShortcut</code> is the same registry outside React. Its command is{' '}
          <code>{'{ shortcut, enabled: () => boolean, run: () => void }'}</code>.
        </p>
        <Api name="createDoubleShiftDetector" />
      </Section>
    </>
  )
}

export function UtilitiesPage() {
  return (
    <>
      <Section title="cx">
        <p>Joins class names and skips empty ones — enough for the conditional classes the components need.</p>
        <Code
          code={`import { cx } from '@mnml-tools/ui'

cx('mnml-button', active && 'is-active', className) // "mnml-button is-active" or "mnml-button"`}
        />
      </Section>
      <Section title="macPlatform">
        <p>
          True in any browser on macOS (it reports “MacIntel” even on Apple silicon). Use it for conventions such as
          Cmd-click; inside Tauri, <Link to="tauri">nativeMac</Link> is the stricter check.
        </p>
        <Code
          code={`import { macPlatform } from '@mnml-tools/ui'

const openInNewTab = (event: MouseEvent) => (macPlatform ? event.metaKey : event.ctrlKey)`}
        />
      </Section>
      <Section title="API">
        <Api name="cx" />
        <Api name="macPlatform" />
      </Section>
    </>
  )
}
