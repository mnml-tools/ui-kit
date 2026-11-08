export type UpdateSafety = { dirty: boolean; busy: boolean }

let inspect = (): UpdateSafety => ({ dirty: false, busy: false })

/** Lets the app report unsaved (`dirty`) or running (`busy`) work before an update restarts it. */
export function registerUpdateGuard(guard: () => UpdateSafety) {
  inspect = guard

  return () => {
    if (inspect === guard) inspect = () => ({ dirty: false, busy: false })
  }
}

export function inspectUpdateSafety() {
  return inspect()
}

/** `busy` blocks the update; `confirm` asks before discarding unsaved work; `install` goes ahead. */
export function updateDecision(safety: UpdateSafety, discardConfirmed: boolean, installed: boolean) {
  if (safety.busy) return 'busy'
  if (safety.dirty && !discardConfirmed && !installed) return 'confirm'

  return 'install'
}
