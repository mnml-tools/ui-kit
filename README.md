# @mnml-tools/ui

Shared design tokens, base styles and React building blocks for the mnml-tools desktop apps (Tauri 2, TypeScript,
React 19). Extracted from [Zap](https://github.com/mnml-tools/zap), which stays the visual reference: square
controls, a 12px system font, warm neutral greys, light and dark modes, and five accent colours.

## Use

```sh
npm install @mnml-tools/ui
```

```css
/* At the top of the app's stylesheet. */
@import '@mnml-tools/ui/tokens.css';
@import '@mnml-tools/ui/base.css'; /* optional: document reset, controls, focus ring, selection */
```

```ts
// src/services/theme.ts — create the store once, at module load, so the first paint has the right theme.
import { createTheme } from '@mnml-tools/ui'
import { syncNativeTheme } from '@mnml-tools/ui/tauri'

export const theme = createTheme({ storagePrefix: 'myapp', onThemeChange: syncNativeTheme })
```

```tsx
import { accents, modes, useTheme } from '@mnml-tools/ui'

const { theme: mode, accent, setTheme, setAccent } = useTheme(theme)
```

The theme store writes `data-theme` and `data-accent` on `<html>`, persists them as `<prefix>.theme` and
`<prefix>.accent`, and follows changes made in other windows.

## Entry points

| Import                          | Contents                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| `@mnml-tools/ui`                | theme (`createTheme`, `useTheme`, `modes`, `accents`), `macPlatform`, `cx`, components |
| `@mnml-tools/ui/tauri`          | `syncNativeTheme`, `nativeMac`, `nativeLinux` (needs `@tauri-apps/api`)                |
| `@mnml-tools/ui/tokens.css`     | colour tokens for light and dark, accents, `--focus-ring`, `--mono`                    |
| `@mnml-tools/ui/base.css`       | optional element base: font, reset, `button`/`input`/`select`, focus, selection        |
| `@mnml-tools/ui/components.css` | styles of the components below                                                         |
| `@mnml-tools/ui/styles.css`     | tokens, base and components in one import                                              |

## Components

| Component         | Notes                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`          | native `<button>`; `variant="primary"` for the one main action. No default `type`.                                                                                |
| `IconButton`      | borderless, for a single icon; needs `aria-label`                                                                                                                 |
| `Spinner`         | rotating `Loader2`; `spinClassName` rotates any other icon                                                                                                        |
| `StatusDot`       | 5px accent square for a live status                                                                                                                               |
| `DirtyIndicator`  | 5px square for unsaved changes                                                                                                                                    |
| `Message`         | `tone="error"` boxed alert (`role="alert"`), `tone="success"` status line (`role="status"`)                                                                       |
| `Badge`           | small mono label, e.g. a driver name                                                                                                                              |
| `Avatar`          | square tinted from `color`, `size="small"` for 20px                                                                                                               |
| `HighlightedText` | wraps matched characters in `<mark>`                                                                                                                              |
| `SearchField`     | icon + borderless input, optional `shortcutHint`                                                                                                                  |
| `Segmented`       | joined buttons; children set `aria-pressed` (`role="group"`) or `aria-selected` (`role="tablist"`)                                                                |
| `Dialog`          | native modal `<dialog>`: heading, optional close button, Escape and backdrop dismiss, `open` to keep it mounted. Mark the element to focus with `data-autofocus`. |
| `ConfirmDialog`   | message + Cancel (focused) / Confirm                                                                                                                              |
| `ErrorDialog`     | message + OK                                                                                                                                                      |
| `ThemeToggle`     | palette button that opens `AppearanceDialog` (colour mode and accent); takes the theme store                                                                      |
| `ContextMenu`     | fixed menu at a point, kept inside the window, keyboard navigable (`useContextMenu`)                                                                              |
| `Tabs`, `Tab`     | strip of closable document tabs with a dirty marker                                                                                                               |
| `Pagination`      | page bar: `summary` on the left (it styles a page-size `<select>`), previous / "Page n of m" / next                                                               |
| `ResizeHandle`    | separator on a pane's edge, driven by `useResize({ storageKey })` (drag, arrows, Home, End)                                                                       |
| `Fields`          | two-column form grid of labels; `mnml-field-full` spans both columns                                                                                              |
| `EmptyState`      | centred icon, title and hint                                                                                                                                      |
| `useShortcut`     | document-wide shortcuts (`Shortcut`: `primary` is Cmd on macOS, Ctrl elsewhere; double Shift); paused while a modal is open                                       |

Icons come from `lucide-react`, a peer dependency.

## CSS conventions

- All kit CSS lives in cascade layers, declared as `@layer mnml.tokens, mnml.base, mnml.components`. Unlayered app
  CSS always wins over the kit, whatever its specificity, so apps override without `!important`.
- Token names are unprefixed (`--text`, `--background`, `--soft`, `--accent`, …) and shared by every app.
- Component classes are prefixed `mnml-`. Only `base.css` styles bare elements, and it is optional.
- An app's own bare-element defaults (`h2`, `p`, …) should go into `@layer mnml.base { … }`. Left unlayered, they
  beat the kit's components (an unlayered `h2 { font-size }` would resize every dialog title).

## Develop

Node 22.19+ or 24.

```sh
npm install
npm run dev          # playground at http://127.0.0.1:1440 (tokens, controls, theme switcher)
npm run build        # dist/: ESM + .d.ts + CSS
npm test
npm run typecheck
npm run format:check
```

To work on the kit against an app, install it from disk (`npm install ../ui-kit` in the app) and add
`resolve: { dedupe: ['react', 'react-dom', '@tauri-apps/api'] }` to the app's Vite config, so the linked kit and the
app share one React. Rebuild the kit (`npm run build`) after each change.

## Licence

Not chosen yet.
