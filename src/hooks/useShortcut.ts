import { useEffect, useRef } from 'react'
import type { Shortcut } from '../lib/shortcuts.ts'
import { registerShortcut } from '../lib/shortcutRegistry.ts'

/** Runs `run` on `shortcut` while `enabled`; the latest `run` and `enabled` are used without re-registering. */
export function useShortcut(shortcut: Shortcut, enabled: boolean, run: () => void) {
  const current = useRef({ enabled, run })
  current.current = { enabled, run }

  useEffect(
    () =>
      registerShortcut({
        shortcut,
        enabled: () => current.current.enabled,
        run: () => current.current.run()
      }),
    [shortcut]
  )
}
