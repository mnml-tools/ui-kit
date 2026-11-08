# Changelog

## 0.1.0 — unreleased

First version, extracted from Zap 0.7.0 without changing its appearance.

- Tokens for light and dark mode, five accents, `--focus-ring`, `--danger`, and an optional element base.
- Theme store (`createTheme`, `useTheme`) persisted per app and synced with the native window on Tauri.
- Components: Button, IconButton, Spinner, StatusDot, DirtyIndicator, Message, Badge, Avatar, HighlightedText,
  Separator, SearchField, Segmented, Dialog, ConfirmDialog, ErrorDialog, AppearanceDialog, ThemeToggle, ContextMenu,
  Tabs, Pagination, ResizeHandle, Fields, EmptyState, AppShell, TitleBar, Brand, StatusBar, Sidebar,
  ResizableSidebar, SidebarNav, SidebarItem, SidebarLabel, SidebarFooter.
- Hooks: `useContextMenu`, `useResize`, `useShortcut`, and the shortcut helpers.
- Update guard (`registerUpdateGuard`, `updateDecision`).
- `@mnml-tools/ui/tauri`: WindowControls, UpdateDialog, useAppUpdate, `syncNativeTheme`, `nativeMac`, `nativeLinux`.
