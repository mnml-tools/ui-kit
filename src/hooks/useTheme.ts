import { useSyncExternalStore } from 'react'
import type { ThemeStore } from '../lib/theme.ts'

export function useTheme(store: ThemeStore) {
  const appearance = useSyncExternalStore(store.subscribe, store.getAppearance)

  return { ...appearance, setTheme: store.setTheme, setAccent: store.setAccent }
}
