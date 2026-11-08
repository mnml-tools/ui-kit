import { useState } from 'react'
import type { Update } from '@tauri-apps/plugin-updater'
import { Button, registerUpdateGuard } from '@mnml-tools/ui'
import { UpdateDialog } from '@mnml-tools/ui/tauri'

// In an app the update comes from `useAppUpdate()`. This stand-in "downloads" in 20 steps; the relaunch then fails,
// as it does outside Tauri, and the dialog shows the error.
function fakeUpdate() {
  return {
    version: '9.9.9',
    close: async () => {},
    downloadAndInstall: async (onEvent: (event: unknown) => void) => {
      onEvent({ event: 'Started', data: { contentLength: 2000 } })
      for (let step = 0; step < 20; step++) {
        await new Promise((resolve) => setTimeout(resolve, 60))
        onEvent({ event: 'Progress', data: { chunkLength: 100 } })
      }
      onEvent({ event: 'Finished' })
    }
  } as unknown as Update
}

export default function Dialog() {
  const [update, setUpdate] = useState<Update>()
  const [dirty, setDirty] = useState(true)

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          // Report unsaved work, so the dialog asks before discarding it.
          registerUpdateGuard(() => ({ dirty, busy: false }))
          setUpdate(fakeUpdate())
        }}
      >
        Check for updates
      </Button>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <input type="checkbox" checked={dirty} onChange={(event) => setDirty(event.target.checked)} />
        Unsaved changes
      </label>
      {update && (
        <UpdateDialog
          update={update}
          appName="Zap"
          releaseNotesUrl="https://example.com/releases"
          onDismiss={() => setUpdate(undefined)}
        />
      )}
    </>
  )
}
