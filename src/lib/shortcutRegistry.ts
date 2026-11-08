import { createDoubleShiftDetector, matchesShortcut } from './shortcuts.ts'
import type { Shortcut } from './shortcuts.ts'

type Command = {
  shortcut: Shortcut
  enabled: () => boolean
  run: () => void
}

const commands = new Set<Command>()

const doubleShift = createDoubleShiftDetector()

// One document listener for every registered shortcut. The newest enabled command wins, and nothing runs while a
// modal dialog is open or an IME is composing.
function handleKeyboard(event: KeyboardEvent) {
  if (event.defaultPrevented || event.isComposing || document.querySelector('dialog[open], [aria-modal="true"]')) {
    doubleShift.reset()
    return
  }

  const doubleTapped = doubleShift.handle(event)
  const inputFocused =
    event.target instanceof HTMLElement &&
    (event.target.isContentEditable || !!event.target.closest('input, textarea, select, [contenteditable]'))
  const mac = /Mac/.test(navigator.platform)
  const command = [...commands]
    .reverse()
    .find(
      (item) =>
        item.enabled() &&
        (!inputFocused || item.shortcut.allowInInputs) &&
        (item.shortcut.doubleTap
          ? doubleTapped && item.shortcut.key === 'Shift'
          : event.type === 'keydown' && matchesShortcut(event, item.shortcut, mac))
    )
  if (!command) return

  event.preventDefault()
  if (!event.repeat) command.run()
}

/** Registers a document-wide shortcut; returns the function that removes it. */
export function registerShortcut(command: Command) {
  if (!commands.size) {
    document.addEventListener('keydown', handleKeyboard)
    document.addEventListener('keyup', handleKeyboard)
    window.addEventListener('blur', doubleShift.reset)
  }
  commands.add(command)

  return () => {
    commands.delete(command)
    if (!commands.size) {
      document.removeEventListener('keydown', handleKeyboard)
      document.removeEventListener('keyup', handleKeyboard)
      window.removeEventListener('blur', doubleShift.reset)
      doubleShift.reset()
    }
  }
}
