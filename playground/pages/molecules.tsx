import { Api } from '../app/Api.tsx'
import { Link, Note, Section } from '../app/content.tsx'
import { Example } from '../app/Example.tsx'

export function SearchFieldPage() {
  return (
    <>
      <Example name="search-field/Filter" title="Filtering a list">
        A search icon and a borderless input, controlled through <code>value</code> and <code>onChange</code> (which
        receives the string). <code>label</code> is the input's accessible name, as there is no visible label.
      </Example>
      <Example name="search-field/Shortcut" title="With a shortcut hint">
        <code>shortcutHint</code> shows a key hint at the end; <code>shortcutLabel</code> spells it out for screen
        readers. Pair it with <Link to="shortcuts">useShortcut</Link> and <code>inputRef</code> to focus the field.
        Inside a <Link to="sidebar">Sidebar</Link> the field draws its own box.
      </Example>
      <Section title="API">
        <Api name="SearchField" />
      </Section>
    </>
  )
}

export function SegmentedPage() {
  return (
    <>
      <Example name="segmented/Toggle" title="Toggle buttons">
        The default <code>role="group"</code>: each child is a button with <code>aria-pressed</code>, and the pressed
        one is drawn selected.
      </Example>
      <Example name="segmented/Tablist" title="Tabs">
        With <code>role="tablist"</code>, give the children <code>role="tab"</code> and <code>aria-selected</code>, and
        point them at their panel.
      </Example>
      <Section title="API">
        <Api name="Segmented" />
      </Section>
    </>
  )
}

export function DialogPage() {
  return (
    <>
      <Example name="dialog/Form" title="With a form">
        A native modal <code>&lt;dialog&gt;</code>: focus is trapped inside, Escape and a click on the backdrop call{' '}
        <code>onDismiss</code>, and the title labels the dialog. Put the content and a <code>.mnml-dialog-actions</code>{' '}
        row inside; a <code>&lt;form&gt;</code> child gets padding.
      </Example>
      <Note tone="warning">
        React's <code>autoFocus</code> runs while the dialog is still closed, so it has no effect. Mark the element to
        focus with <code>data-autofocus</code>; without one the browser focuses the first focusable element.
      </Note>
      <Example name="dialog/Busy" title="Not dismissible while busy">
        <code>dismissible={'{false}'}</code> ignores Escape, the backdrop and the close button until the work is done.
        Use <code>closeOnBackdrop={'{false}'}</code> to keep only the backdrop from closing it.
      </Example>
      <Example name="dialog/KeepMounted" title="Kept mounted">
        By default the dialog opens on mount and closes on unmount. Pass <code>open</code> to keep it rendered, and its
        state, while it is closed.
      </Example>
      <Section title="API">
        <Api name="Dialog" />
      </Section>
    </>
  )
}

export function ConfirmDialogPage() {
  return (
    <>
      <Example name="confirm-dialog/Discard" title="Before a destructive action">
        An <code>alertdialog</code> with a message, Cancel and Confirm. Cancel has the focus, so pressing Enter does not
        confirm by accident; Escape cancels.
      </Example>
      <Section title="API">
        <Api name="ConfirmDialog" />
      </Section>
    </>
  )
}

export function ErrorDialogPage() {
  return (
    <>
      <Example name="error-dialog/Basic" title="Reporting a failure">
        A message and one button. Line breaks in the message are kept, so a multi-line error reads as it was written.
      </Example>
      <Section title="API">
        <Api name="ErrorDialog" />
      </Section>
    </>
  )
}

export function ThemeTogglePage() {
  return (
    <>
      <Example name="theme-toggle/Basic" title="In a title bar">
        A palette button that opens <code>AppearanceDialog</code>. It stays clickable inside a Tauri{' '}
        <Link to="title-bar">TitleBar</Link> drag region.
      </Example>
      <Example name="theme-toggle/Appearance" title="AppearanceDialog on its own">
        Colour mode and accent pickers bound to the store, rendered into <code>document.body</code>, so it can be opened
        from anywhere (a menu, a settings screen).
      </Example>
      <Section title="API">
        <Api name="ThemeToggle" />
        <Api name="AppearanceDialog" />
      </Section>
    </>
  )
}

export function ContextMenuPage() {
  return (
    <>
      <Example name="context-menu/RightClick" title="On right-click">
        Open it at the pointer from <code>onContextMenu</code>. It is kept inside the window, focuses its first enabled
        item, moves with the arrow keys, Home and End, and closes on Escape, Tab, an outside press, blur, resize or
        scroll.
      </Example>
      <Example name="context-menu/FromButton" title="From a button">
        Pass the button as <code>trigger</code>: pressing it again does not count as an outside press, and Escape
        returns the focus to it. <code>above</code> opens the menu upwards from <code>y</code>.
      </Example>
      <Section title="API">
        <Api name="ContextMenu" />
        <Api name="ContextMenuItem" />
        <Api name="useContextMenu" />
        <p>
          <code>useContextMenu</code> is the behaviour without the markup, for a custom menu: attach the returned ref to
          a container of <code>&lt;button&gt;</code>s.
        </p>
      </Section>
    </>
  )
}

export function TabsPage() {
  return (
    <>
      <Example name="tabs/Documents" title="Document tabs">
        A strip of closable tabs. The title selects, the cross closes, <code>dirty</code> adds the unsaved marker, and
        the strip scrolls sideways when the tabs overflow. Add <code>onContextMenu</code> for a{' '}
        <Link to="context-menu">tab menu</Link>.
      </Example>
      <Section title="API">
        <Api name="Tabs" />
        <Api name="Tab" />
      </Section>
    </>
  )
}

export function PaginationPage() {
  return (
    <>
      <Example name="pagination/Rows" title="With a page size">
        <code>page</code> is zero-based. The previous and next buttons disable themselves at the ends. A{' '}
        <code>&lt;select&gt;</code> in <code>summary</code> gets the bar's look.
      </Example>
      <Section title="API">
        <Api name="Pagination" />
      </Section>
    </>
  )
}

export function ResizeHandlePage() {
  return (
    <>
      <Example name="resize-handle/Pane" title="A resizable pane">
        <code>useResize</code> holds the width and remembers it under <code>storageKey</code>; spread its result into{' '}
        <code>ResizeHandle</code>. Put the handle inside the pane, which needs <code>position: relative</code>.
      </Example>
      <Example name="resize-handle/RightPanel" title="On the left edge">
        <code>edge: 'left'</code> for a panel on the right of the window: the handle moves to its left edge and the drag
        direction flips.
      </Example>
      <Note>
        The handle is a focusable <code>separator</code> with its value range, so it works from the keyboard: arrows
        move 10px (50px with Shift), Home and End jump to the limits. For a sidebar,{' '}
        <Link to="sidebar">ResizableSidebar</Link> wires all of this up.
      </Note>
      <Section title="API">
        <Api name="useResize" />
        <Api name="ResizeHandle" />
      </Section>
    </>
  )
}

export function FieldsPage() {
  return (
    <>
      <Example name="fields/Connection" title="A settings form">
        A two-column grid of <code>&lt;label&gt;</code>s, each wrapping its text and control, so no <code>htmlFor</code>{' '}
        is needed. Give a label <code>mnml-field-full</code> to span both columns. Inputs and selects inside are styled;
        values are in the mono font.
      </Example>
      <Section title="API">
        <Api name="Fields" />
      </Section>
    </>
  )
}

export function EmptyStatePage() {
  return (
    <>
      <Example name="empty-state/Basic" title="Nothing to show" stage="center">
        A centred icon, title and hint. It fills the free space of a flex column with <code>margin: auto</code>.
      </Example>
      <Example name="empty-state/WithNotice" title="With a notice" stage="center">
        <code>notice</code> goes above the icon, for an error that explains the empty area.
      </Example>
      <Section title="API">
        <Api name="EmptyState" />
      </Section>
    </>
  )
}
