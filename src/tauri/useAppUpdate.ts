import { useEffect, useState } from 'react'
import { isTauri } from '@tauri-apps/api/core'
import { check, type Update } from '@tauri-apps/plugin-updater'

type Options = {
  /** Pass `!import.meta.env.DEV` to skip the check in development. */
  enabled?: boolean
  timeout?: number
}

/** Checks for an update once at startup; `dismiss` releases it. Does nothing outside Tauri. */
export function useAppUpdate({ enabled = true, timeout = 15000 }: Options = {}) {
  const [update, setUpdate] = useState<Update | null>(null)

  useEffect(() => {
    if (!isTauri() || !enabled) return

    let disposed = false
    let pending: Update | null = null
    void check({ timeout })
      .then((result) => {
        pending = result
        if (disposed) void result?.close().catch(() => {})
        else setUpdate(result)
      })
      .catch((error) => console.warn('Startup update check failed:', error))

    return () => {
      disposed = true
      void pending?.close().catch(() => {})
    }
  }, [enabled, timeout])

  const dismiss = () => {
    void update?.close().catch(() => {})
    setUpdate(null)
  }

  return { update, dismiss }
}
