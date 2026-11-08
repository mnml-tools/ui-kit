import type { ComponentType } from 'react'
import * as atoms from '../pages/atoms.tsx'
import * as guide from '../pages/guide.tsx'
import * as molecules from '../pages/molecules.tsx'
import * as platform from '../pages/platform.tsx'

export type PageInfo = {
  slug: string
  title: string
  group: (typeof groups)[number]
  /** The lede under the title; also searched. */
  summary: string
  /** Exports the page documents: they make up its import line and are found by search. */
  api?: string[]
  /** Extra search terms. */
  keywords?: string
  page: ComponentType
}

export const groups = ['Guide', 'Atoms', 'Molecules', 'Layout', 'Tauri', 'Hooks & utilities'] as const

const list: PageInfo[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    group: 'Guide',
    summary: 'Design tokens, base styles and React building blocks for the mnml-tools desktop apps (Tauri, React 19).',
    keywords: 'overview principles',
    page: guide.Introduction
  },
  {
    slug: 'installation',
    title: 'Installation',
    group: 'Guide',
    summary: 'Install the package, import its CSS and create the theme store.',
    keywords: 'setup npm getting started css import vite dedupe develop',
    page: guide.Installation
  },
  {
    slug: 'theming',
    title: 'Theming',
    group: 'Guide',
    summary: 'Light and dark mode, five accents, persisted and kept in sync across windows.',
    api: ['createTheme', 'useTheme', 'modes', 'accents', 'Theme', 'Accent', 'Appearance', 'ThemeOptions', 'ThemeStore'],
    keywords: 'dark mode light accent colour color data-theme data-accent',
    page: guide.Theming
  },
  {
    slug: 'tokens',
    title: 'Design tokens',
    group: 'Guide',
    summary: 'The colour and font custom properties every component is drawn with.',
    keywords: 'css variables custom properties colors palette swatch',
    page: guide.Tokens
  },
  {
    slug: 'css',
    title: 'CSS & overrides',
    group: 'Guide',
    summary: 'Cascade layers, class names, and how an app overrides the kit.',
    keywords: 'layer specificity override important classes mnml-',
    page: guide.Css
  },
  {
    slug: 'button',
    title: 'Button',
    group: 'Atoms',
    summary: 'A native button with the kit look.',
    api: ['Button', 'ButtonProps', 'ButtonVariant'],
    keywords: 'primary submit action',
    page: atoms.ButtonPage
  },
  {
    slug: 'icon-button',
    title: 'IconButton',
    group: 'Atoms',
    summary: 'A borderless square button for a single icon.',
    api: ['IconButton'],
    page: atoms.IconButtonPage
  },
  {
    slug: 'spinner',
    title: 'Spinner',
    group: 'Atoms',
    summary: 'A rotating loader icon, and the class that spins any other icon.',
    api: ['Spinner', 'spinClassName'],
    keywords: 'loading busy progress',
    page: atoms.SpinnerPage
  },
  {
    slug: 'status-dot',
    title: 'StatusDot',
    group: 'Atoms',
    summary: 'A small square for a live status, such as “connected”.',
    api: ['StatusDot'],
    keywords: 'indicator online',
    page: atoms.StatusDotPage
  },
  {
    slug: 'dirty-indicator',
    title: 'DirtyIndicator',
    group: 'Atoms',
    summary: 'A small square that marks unsaved changes.',
    api: ['DirtyIndicator'],
    keywords: 'unsaved modified edited',
    page: atoms.DirtyIndicatorPage
  },
  {
    slug: 'message',
    title: 'Message',
    group: 'Atoms',
    summary: 'An error alert or a success status line.',
    api: ['Message', 'MessageTone'],
    keywords: 'alert error success notice feedback',
    page: atoms.MessagePage
  },
  {
    slug: 'badge',
    title: 'Badge',
    group: 'Atoms',
    summary: 'A small mono label.',
    api: ['Badge'],
    keywords: 'tag label chip',
    page: atoms.BadgePage
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    group: 'Atoms',
    summary: 'A square tinted from a colour, usually holding an initial.',
    api: ['Avatar'],
    page: atoms.AvatarPage
  },
  {
    slug: 'highlighted-text',
    title: 'HighlightedText',
    group: 'Atoms',
    summary: 'Marks the matched characters of a search result.',
    api: ['HighlightedText'],
    keywords: 'fuzzy match mark search',
    page: atoms.HighlightedTextPage
  },
  {
    slug: 'separator',
    title: 'Separator',
    group: 'Atoms',
    summary: 'A faint middle dot between inline items.',
    api: ['Separator'],
    page: atoms.SeparatorPage
  },
  {
    slug: 'search-field',
    title: 'SearchField',
    group: 'Molecules',
    summary: 'A search icon and a borderless input, with an optional shortcut hint.',
    api: ['SearchField'],
    keywords: 'filter input find',
    page: molecules.SearchFieldPage
  },
  {
    slug: 'segmented',
    title: 'Segmented',
    group: 'Molecules',
    summary: 'A row of joined buttons where one is selected.',
    api: ['Segmented'],
    keywords: 'toggle switch button group tablist',
    page: molecules.SegmentedPage
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    group: 'Molecules',
    summary: 'A native modal dialog with the kit heading.',
    api: ['Dialog'],
    keywords: 'modal overlay popup',
    page: molecules.DialogPage
  },
  {
    slug: 'confirm-dialog',
    title: 'ConfirmDialog',
    group: 'Molecules',
    summary: 'Asks before a destructive action.',
    api: ['ConfirmDialog'],
    keywords: 'confirm discard delete modal',
    page: molecules.ConfirmDialogPage
  },
  {
    slug: 'error-dialog',
    title: 'ErrorDialog',
    group: 'Molecules',
    summary: 'Reports an error with a single OK button.',
    api: ['ErrorDialog'],
    keywords: 'error modal alert',
    page: molecules.ErrorDialogPage
  },
  {
    slug: 'theme-toggle',
    title: 'ThemeToggle',
    group: 'Molecules',
    summary: 'A palette button that opens the appearance dialog.',
    api: ['ThemeToggle', 'AppearanceDialog'],
    keywords: 'appearance dark mode accent',
    page: molecules.ThemeTogglePage
  },
  {
    slug: 'context-menu',
    title: 'ContextMenu',
    group: 'Molecules',
    summary: 'A keyboard-navigable menu at a point.',
    api: ['ContextMenu', 'ContextMenuItem', 'useContextMenu'],
    keywords: 'right click dropdown menu popover',
    page: molecules.ContextMenuPage
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    group: 'Molecules',
    summary: 'A strip of closable document tabs.',
    api: ['Tabs', 'Tab'],
    keywords: 'documents editor close',
    page: molecules.TabsPage
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    group: 'Molecules',
    summary: 'A page bar with a summary, previous and next.',
    api: ['Pagination'],
    keywords: 'pages paging rows',
    page: molecules.PaginationPage
  },
  {
    slug: 'resize-handle',
    title: 'ResizeHandle',
    group: 'Molecules',
    summary: 'A draggable, keyboard-operable edge that resizes a pane.',
    api: ['ResizeHandle', 'useResize'],
    keywords: 'resize split pane drag width',
    page: molecules.ResizeHandlePage
  },
  {
    slug: 'fields',
    title: 'Fields',
    group: 'Molecules',
    summary: 'A two-column form grid of labelled controls.',
    api: ['Fields'],
    keywords: 'form input label grid settings',
    page: molecules.FieldsPage
  },
  {
    slug: 'empty-state',
    title: 'EmptyState',
    group: 'Molecules',
    summary: 'A centred placeholder for an empty area.',
    api: ['EmptyState'],
    keywords: 'placeholder blank nothing',
    page: molecules.EmptyStatePage
  },
  {
    slug: 'app-shell',
    title: 'AppShell',
    group: 'Layout',
    summary: 'The full-window column: title bar, content, status bar.',
    api: ['AppShell'],
    keywords: 'window layout frame',
    page: platform.AppShellPage
  },
  {
    slug: 'title-bar',
    title: 'TitleBar',
    group: 'Layout',
    summary: 'The window title bar, a Tauri drag region.',
    api: ['TitleBar', 'Brand'],
    keywords: 'header brand drag region',
    page: platform.TitleBarPage
  },
  {
    slug: 'status-bar',
    title: 'StatusBar',
    group: 'Layout',
    summary: 'The thin mono bar at the bottom of the window.',
    api: ['StatusBar'],
    keywords: 'footer',
    page: platform.StatusBarPage
  },
  {
    slug: 'sidebar',
    title: 'Sidebar',
    group: 'Layout',
    summary: 'A navigation column, fixed or resizable.',
    api: ['Sidebar', 'ResizableSidebar', 'SidebarNav', 'SidebarItem', 'SidebarLabel', 'SidebarFooter'],
    keywords: 'navigation nav aside',
    page: platform.SidebarPage
  },
  {
    slug: 'tauri',
    title: 'Tauri setup',
    group: 'Tauri',
    summary: 'Native theme sync and platform flags from @mnml-tools/ui/tauri.',
    api: ['syncNativeTheme', 'nativeMac', 'nativeLinux'],
    keywords: 'native window macos linux',
    page: platform.TauriSetup
  },
  {
    slug: 'window-controls',
    title: 'WindowControls',
    group: 'Tauri',
    summary: 'Minimise, maximise and close buttons for undecorated windows.',
    api: ['WindowControls'],
    keywords: 'linux minimize maximize close',
    page: platform.WindowControlsPage
  },
  {
    slug: 'updates',
    title: 'App updates',
    group: 'Tauri',
    summary: 'Check, download and install an update without losing unsaved work.',
    api: [
      'UpdateDialog',
      'useAppUpdate',
      'registerUpdateGuard',
      'inspectUpdateSafety',
      'updateDecision',
      'UpdateSafety'
    ],
    keywords: 'updater relaunch install',
    page: platform.UpdatesPage
  },
  {
    slug: 'shortcuts',
    title: 'Keyboard shortcuts',
    group: 'Hooks & utilities',
    summary: 'Document-wide shortcuts that respect platforms, inputs and open dialogs.',
    api: [
      'useShortcut',
      'Shortcut',
      'formatShortcut',
      'matchesShortcut',
      'registerShortcut',
      'createDoubleShiftDetector'
    ],
    keywords: 'hotkey keyboard keybinding cmd ctrl double shift',
    page: platform.ShortcutsPage
  },
  {
    slug: 'utilities',
    title: 'cx & macPlatform',
    group: 'Hooks & utilities',
    summary: 'Small helpers: class names and the macOS check.',
    api: ['cx', 'macPlatform'],
    keywords: 'classnames clsx platform mac',
    page: platform.UtilitiesPage
  }
]

const documented = new Map(list.flatMap((page) => (page.api ?? []).map((name) => [name, page] as const)))

export const pages: PageInfo[] = [
  ...list,
  {
    slug: 'api-index',
    title: 'API index',
    group: 'Hooks & utilities',
    summary: 'Every export of the kit, and the page that documents it.',
    keywords: 'reference exports all',
    page: () => <guide.ApiIndex documented={documented} />
  }
]
