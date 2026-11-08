# Extraction inventory (from Zap 0.7.0)

Source: `zap/src/style.css` at `ec094b1` (3010 lines, 495 rules). Every top-level block was classified by
destination. Line numbers refer to that commit. Of the CSS, roughly 930 lines move into the kit and about 2000
stay in Zap, which keeps the database-specific screens.

Each phase must leave Zap unchanged, statically and under hover/focus; see "Extraction from Zap" in the README.

## Phase 1: tokens, base, theme, platform

| Zap lines | Rules                                                                | Kit destination                                    |
| --------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1–31      | `:root` light colour tokens (29)                                     | `styles/tokens.css`                                |
| 32–62     | `:root[data-theme='dark']` colour tokens (29)                        | `styles/tokens.css`                                |
| 63–70     | `--mono`                                                             | `styles/tokens.css`                                |
| 63–70     | root typography: font stack, 12px, `font-synthesis`, text/background | `styles/base.css`                                  |
| 71–115    | `*`, `html, body`, `body`, control reset, `button` look, focus ring  | `styles/base.css`                                  |
| 1058–1061 | `::selection`                                                        | `styles/base.css`                                  |
| 2259–2288 | accents (`pink`, `blue`, `orange`, `green`, `purple`) and swatches   | `styles/tokens.css`                                |
| 2290–2292 | `:root[data-accent] :focus-visible`                                  | `styles/base.css`                                  |
| —         | `services/theme.ts`, `hooks/useTheme.ts`                             | `createTheme`, `useTheme`                          |
| —         | `lib/platform.ts`                                                    | `macPlatform`; `tauri`: `nativeMac`, `nativeLinux` |

## Phase 2: atoms

| Zap lines                   | Rules                                   | Kit component                               |
| --------------------------- | --------------------------------------- | ------------------------------------------- |
| 116–123                     | `.primary`                              | `Button` (`variant="primary"`)              |
| 1201–1207                   | `.icon-button`                          | `IconButton`                                |
| 603–610                     | `.spin`, `@keyframes spin`              | `Spinner`                                   |
| 192–197                     | `.status-dot`                           | `StatusDot`                                 |
| 1018–1025                   | `.dirty-dot`                            | `DirtyIndicator`                            |
| 583–602                     | `.error`, `.modal .error`, `.success`   | `Message` (`tone="error" \| "success"`)     |
| 280–297, 638–648, 2544–2565 | `.search`, `.search-shortcut`           | `SearchField`                               |
| 1299–1323                   | `.view-switch`                          | `Segmented`                                 |
| 2792–2813                   | `.connection-avatar`                    | `Avatar` (Zap keeps its palette and picker) |
| 457–462                     | `.badge`                                | `Badge`                                     |
| 2438–2476                   | `.environment-badge` and its six tokens | stays in Zap (see below)                    |
| —                           | `HighlightedText`                       | `HighlightedText` (no CSS of its own)       |
| 298–300                     | `kbd { display: none }`                 | removed with `SearchField`'s `shortcut`     |

Decisions made while implementing phase 2:

- The environment badge stays in Zap. It shares nothing with `.badge` but the border (sans-serif 600 instead of
  mono, different padding and line height), and "local"/"prod" are Zap concepts; a toned `Badge` can come later if a
  second app needs one.
- `SearchField` drops the `shortcut` flag. It rendered `<kbd>⌕</kbd>`, which Zap's global `kbd { display: none }`
  always hid; both go, and `shortcutHint` remains for visible hints.
- `.view-switch button[data-selected='true']` is not carried over: no switch uses `data-selected`.
- Focused kit components draw `outline: 1px solid var(--focus-ring)`, a new token that is `--secondary` without an
  accent and `--focus` with one, matching what `base.css` does for bare elements.

## Phase 3: overlays, navigation, forms

| Zap lines                     | Rules                                                             | Kit component                       |
| ----------------------------- | ----------------------------------------------------------------- | ----------------------------------- |
| 468–512, 567–582              | `.overlay`, `.modal`, `.modal-heading`, `.modal-actions`          | `Dialog` (native `<dialog>` only)   |
| 1026–1040, 1911–1925          | `.discard-dialog`, `.discard-actions`, `.error-dialog`            | `ConfirmDialog`, `ErrorDialog`      |
| 2255–2257                     | `.export-dialog .discard-actions`                                 | stays in Zap, restyled on `Dialog`  |
| 2294–2345                     | `.appearance-*`                                                   | `AppearanceDialog`                  |
| 1041–1057                     | `header .theme-toggle`                                            | `ThemeToggle`                       |
| 906–926, 1975–1977, 2428–2436 | `.connection-menu`, `.tab-context-menu`, `.menu-shortcut`         | `Menu` + `useContextMenu`           |
| 701–736                       | `.tabs`, `.tab`                                                   | `Tabs`, `Tab`                       |
| 817–855                       | `.pagination`                                                     | `Pagination`                        |
| 1063–1105                     | `.resizable-sidebar`, `.sidebar-resizer`, `.sidebar-resizing`     | `ResizeHandle` + `useSidebarResize` |
| 537–566, 2181–2195            | `.fields`, `.full`, `.ssh-toggle` checkbox                        | `Fields` (form grid), `Checkbox`    |
| 856–872                       | `.workspace-empty`                                                | `EmptyState`                        |
| —                             | `lib/dialog.ts`, `lib/shortcuts.ts` (generic part), `useShortcut` | `isDialogBackdropClick`, shortcuts  |

## Phase 4: desktop shell (Tauri)

| Zap lines                            | Rules                                                                                                   | Kit component                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 124–167, 887–889, 927–933            | `header`, `.brand*`, `.header-right`, `native-titlebar`, drag region                                    | `TitleBar` (brand as props)                                                               |
| 390–405                              | `footer`, `.footer-dot`                                                                                 | `StatusBar`                                                                               |
| 198–205, 611–618, 695–700, 2567–2569 | `.app`, `.workspace`, `.workspace-body`, `.data-area`, `.linux-window`                                  | `AppShell`                                                                                |
| 619–694, 2204–2214                   | `aside`, `nav`, `nav button`, `.sidebar-label`, `.sidebar-bottom`, `.sidebar-more`, `.close-connection` | `Sidebar`, `SidebarItem`                                                                  |
| 2358–2383                            | `.window-controls`                                                                                      | `tauri`: `WindowControls`                                                                 |
| 1926–1945, 2647–2682                 | `.update-*`                                                                                             | `tauri`: `UpdateDialog` + `useAppUpdate` (app name, releases URL and busy guard as props) |

Element selectors (`header`, `footer`, `aside`, `nav`) become prefixed classes in this phase, so the kit never
styles a bare `<header>` in another app.

## Stays in Zap

Connections home (`.home`, `.heading`, `.toolbar`, `.empty`, `.empty-art`, `.art-*`, `.supported`, `.home-bottom`,
`.connections*`, `.connection*`, `.db-icon`, `.driver-options`, `.connection-loading`, `.header-connection`,
`.environment-picker`, `.environment-choice`), the data grid (`table`, `th`, `td`, `.grid-wrap`, `.row-*`,
`.cell-*`, `.selectable-table`, `.column-*`, `.key-label`, `.table-*`, `.structure-*`, `.preview-grid`), SQL
(`.query-*`, `.sql-*` and the eight `--sql-*` tokens), filters, foreign-key references, the tab switcher, Go To,
the connection selector, the export/columns dialogs, the SQLite file picker, and the bare `h1`, `h2`, `h3`, `p`
and `kbd` rules, whose values (such as `h3 { min-width: 140px }` and `kbd { display: none }`) are Zap-specific.

Later candidates, once a second app needs them: a `CommandPalette` from Go To and the connection selector, and a
`DataGrid` from the table styles.

## Findings

- `.connection-selector-check` (2760–2765) is not used by any component.
- `ConfirmDialog` and `ConnectionDialog` use a `div.overlay` with `aria-modal`, while `ErrorDialog`,
  `AppearanceDialog`, `UpdateDialog`, `ColumnVisibility` and `ExportTablesDialog` use a native `<dialog>`. The kit's
  `Dialog` keeps only the native one.
- `ConnectionEnvironmentBadge` sets `style={{ marginLeft: 10 }}` inline instead of in CSS.
- The window close hover uses raw `#bd3030`/`#fff`; it becomes a `--danger` token in phase 4.

## Zap rules that relied on the old cascade

Moving the base into a cascade layer means Zap's unlayered rules now always beat it. Two base rules used to win by
specificity over Zap rules, and Zap restates them, scoped to keep the original specificity:

- `button:hover` gave the hover fill to `nav button`, `.close-connection` and `.quick-query`, whose own rules set a
  transparent background: `:where(nav button, .close-connection, .quick-query):hover` restores it.
- `:root[data-accent] :focus-visible` gave the accent to every focused outline, including Zap's own (inputs, the SQL
  editor, the sidebar resizer, dialog buttons): Zap keeps that rule at its original place.

Phase 2 needed one more: `nav button span.mnml-dirty-dot { flex: 0 0 5px }`, because `nav button span` sets `flex: 1`.

## Phase 3 decisions

- Every dialog is a native modal `<dialog>` (the user's call): `ConfirmDialog` and `ConnectionDialog` no longer use
  a `div.overlay` with `aria-modal`. They now get the top layer, Escape and a focus trap from the browser; the
  screenshots stay identical. `Dialog` dismisses on the backdrop only when the press and the release are both on it,
  so a text selection dragged out of the dialog keeps it open (what `ConnectionDialog`'s `mousedown` check did).
- React's `autoFocus` cannot work inside a dialog that opens in an effect, so `Dialog` focuses `[data-autofocus]`
  after `showModal()`; `ConnectionFields` uses it for the name field.
- `ColumnVisibility` keeps its dialog mounted while closed (`open` prop), as before.
- `ContextMenu` measures itself to stay inside the window instead of assuming a height per menu, and always renders
  into `<body>`. Zap keeps the 230px width of its action menus as `.tab-context-menu`.
- `Pagination` takes a page count; `TablePagination` keeps the row count and page-size select as its summary.
- The window-control, title bar, footer and sidebar styles stay for phase 4. `header .mnml-theme-toggle` keeps
  `pointer-events: auto` in Zap until the title bar moves.
- Zap's `h1`, `h2`, `h3` and `p` rules moved into `@layer mnml.base`, so kit components (dialog titles, empty-state
  text) override them exactly as Zap's own class rules did.

## Phase 4 decisions

- `header`, `footer`, `aside` and `nav` are no longer styled as elements: `TitleBar`, `StatusBar`, `Sidebar` and
  `SidebarNav` carry `.mnml-*` classes, so another app's `<header>` or `<nav>` is untouched. Zap's reference panel,
  which relied on the bare `aside` rule, now renders through `Sidebar` too.
- `SidebarItem` marks the active row with `data-active` instead of the `active` class.
- `Brand` keeps the 14px icon; Zap alone flips its lightning bolt (`.mnml-brand-icon svg { transform: scaleX(-1) }`).
- The `.footer-dot` separator became `Separator`; the window close hover uses the new `--danger` and `--on-danger`
  tokens instead of raw colours.
- `UpdateDialog` takes the app name, the release-notes URL and an `onOpenReleaseNotes` callback (Zap passes its
  `open_latest_release` command), and its busy and discard messages; `useAppUpdate` takes `enabled` instead of
  reading `import.meta.env`, which only Vite defines. The update guard moved to the kit's main entry so the
  dialog and the app share one registration.
- `WindowControls` and `UpdateDialog` only run inside Tauri, which the fixtures cannot load; the dialog was exercised
  in the playground with a simulated update (confirmation, progress, disabled buttons, relaunch error, Escape).

## Phase 5

- Removed `.connection-selector-check`, which nothing used. `ConnectionEnvironmentBadge`'s inline `marginLeft` is
  left as it was.
- Zap's `CHANGELOG.md` records the kit and the native dialogs (Escape now closes the connection form and cancels
  the confirmation, which the old overlays did not).
- Publishing is left to the maintainers: see "Publishing" in the README.
