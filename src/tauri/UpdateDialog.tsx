import { useRef, useState } from 'react'
import type { Update } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'
import { Button } from '../components/atoms/Button.tsx'
import { Dialog } from '../components/molecules/Dialog.tsx'
import { inspectUpdateSafety, updateDecision } from '../lib/updateGuard.ts'

type Props = {
  update: Update
  appName: string
  onDismiss: () => void
  /** "What's new" link; `onOpenReleaseNotes` opens it instead of the webview (e.g. through a Tauri command). */
  releaseNotesUrl?: string
  onOpenReleaseNotes?: () => Promise<unknown>
  /** Shown when the update guard reports running work. */
  busyMessage?: string
  /** Shown before discarding unsaved work reported by the update guard. */
  discardMessage?: string
}

/**
 * Downloads, installs and relaunches. It asks `registerUpdateGuard`'s guard first: running work blocks the update,
 * unsaved work needs a confirmation. Escape dismisses it except while installing.
 */
export function UpdateDialog({
  update,
  appName,
  onDismiss,
  releaseNotesUrl,
  onOpenReleaseNotes,
  busyMessage = 'Wait for running operations to finish before updating.',
  discardMessage = 'Unsaved changes will be discarded. Cancel to save your work first, or discard changes and update.'
}: Props) {
  const installing = useRef(false)
  const installed = useRef(false)
  const [phase, setPhase] = useState<'ready' | 'confirm' | 'installing' | 'installed'>('ready')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('Starting download…')
  const [percent, setPercent] = useState<number | undefined>()

  const install = async () => {
    if (installing.current) return

    const decision = updateDecision(inspectUpdateSafety(), phase === 'confirm', installed.current)

    if (decision === 'busy') {
      setError(busyMessage)
      return
    }
    if (decision === 'confirm') {
      setPhase('confirm')
      return
    }

    installing.current = true
    setError('')
    setProgress('Starting download…')
    setPercent(undefined)
    setPhase('installing')

    try {
      if (!installed.current) {
        let received = 0
        let total: number | undefined
        await update.downloadAndInstall((event) => {
          if (event.event === 'Started') {
            total = event.data.contentLength
            if (total) setPercent(0)
          }
          if (event.event === 'Progress') {
            received += event.data.chunkLength
            if (total) {
              const next = Math.min(100, Math.round((received / total) * 100))
              setPercent(next)
              setProgress(`${next}%`)
            } else {
              setProgress(`${Math.round(received / 1024)} KB downloaded`)
            }
          }
          if (event.event === 'Finished') {
            setPercent(100)
            setProgress('Installing…')
          }
        })
        installed.current = true
      }
      setPhase('installed')
      await relaunch()
    } catch (error) {
      setError(String(error))
      setPhase(installed.current ? 'installed' : 'ready')
      installing.current = false
    }
  }

  return (
    <Dialog
      title={`${appName} ${update.version} is available`}
      className="mnml-update-dialog"
      closeOnBackdrop={false}
      onDismiss={() => {
        if (!installing.current) onDismiss()
      }}
    >
      <p>
        {phase === 'confirm'
          ? discardMessage
          : phase === 'installed'
            ? `The update is installed. Restart ${appName} to finish.`
            : phase === 'installing'
              ? `Updating ${appName}…`
              : `Install the update and restart ${appName}.`}
      </p>
      {phase === 'installing' && (
        <div className="mnml-update-progress">
          <progress aria-label="Update download progress" max={100} value={percent} />
          <span aria-live="polite">{progress}</span>
        </div>
      )}
      {error && <p role="alert">{error}</p>}
      <div className="mnml-dialog-actions mnml-update-actions">
        {releaseNotesUrl && (
          <a
            className="mnml-update-release-notes"
            href={releaseNotesUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (!onOpenReleaseNotes) return

              event.preventDefault()
              void onOpenReleaseNotes().catch((error) => setError(String(error)))
            }}
          >
            What’s new
          </a>
        )}
        <Button disabled={phase === 'installing'} onClick={onDismiss}>
          {phase === 'confirm' ? 'Cancel' : 'Later'}
        </Button>
        <Button variant="primary" disabled={phase === 'installing'} onClick={() => void install()}>
          {phase === 'confirm'
            ? 'Discard changes and update'
            : phase === 'installed'
              ? `Restart ${appName}`
              : 'Install and restart'}
        </Button>
      </div>
    </Dialog>
  )
}
