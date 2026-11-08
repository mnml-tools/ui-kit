import { isTauri } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { Theme } from '../lib/theme.ts'

export { UpdateDialog } from './UpdateDialog.tsx'
export { useAppUpdate } from './useAppUpdate.ts'
export { WindowControls } from './WindowControls.tsx'

export const nativeMac = isTauri() && /Mac/.test(navigator.platform)

export const nativeLinux = isTauri() && /Linux/.test(navigator.platform)

/** Matches the native title bar and window chrome to the app's colour mode. Pass it as `onThemeChange`. */
export function syncNativeTheme(theme: Theme) {
  if (isTauri())
    getCurrentWindow()
      .setTheme(theme)
      .catch((error) => console.error('Unable to update native window theme:', error))
}
