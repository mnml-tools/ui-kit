import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDoubleShiftDetector, formatShortcut, matchesShortcut } from '../src/lib/shortcuts.ts'

const event = (overrides = {}) => ({
  key: 'd',
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  ...overrides
})

const primary = { key: 'd', primary: true }

test('primary is Command on macOS and Control elsewhere', () => {
  assert.equal(matchesShortcut(event({ metaKey: true }), primary, true), true)
  assert.equal(matchesShortcut(event({ ctrlKey: true }), primary, false), true)
  assert.equal(matchesShortcut(event({ ctrlKey: true }), primary, true), false)
  assert.equal(matchesShortcut(event({ metaKey: true }), primary, false), false)
  assert.equal(matchesShortcut(event(), primary, false), false)
})

test('keys match case-insensitively and every modifier must match exactly', () => {
  assert.equal(matchesShortcut(event({ key: 'D', ctrlKey: true }), primary, false), true)

  for (const overrides of [{ shiftKey: true }, { altKey: true }, { metaKey: true }, { key: 's' }])
    assert.equal(matchesShortcut(event({ ctrlKey: true, ...overrides }), primary, false), false)

  const shifted = { key: 'z', primary: true, shift: true }
  assert.equal(matchesShortcut(event({ key: 'z', ctrlKey: true, shiftKey: true }), shifted, false), true)
  assert.equal(matchesShortcut(event({ key: 'z', ctrlKey: true }), shifted, false), false)
})

test('formats with symbols on macOS and words elsewhere', () => {
  assert.equal(formatShortcut(primary, true), '⌘D')
  assert.equal(formatShortcut(primary, false), 'Ctrl+D')
  assert.equal(formatShortcut({ key: 'k', primary: true, alt: true, shift: true }, true), '⌘⌥⇧K')
  assert.equal(formatShortcut({ key: 'k', primary: true, alt: true, shift: true }, false), 'Ctrl+Alt+Shift+K')
  assert.equal(formatShortcut({ key: 'Backspace', primary: true }, true), '⌘⌫')
  assert.equal(formatShortcut({ key: 'Backspace', primary: true }, false), 'Ctrl+Backspace')
})

const shift = (type, timeStamp, overrides = {}) => ({
  ...event({ key: 'Shift' }),
  type,
  timeStamp,
  repeat: false,
  ...overrides
})

test('double Shift fires once after two quick press and release cycles', () => {
  const detector = createDoubleShiftDetector()

  assert.equal(detector.handle(shift('keydown', 0)), false)
  assert.equal(detector.handle(shift('keyup', 50)), false)
  assert.equal(detector.handle(shift('keydown', 150)), false)
  assert.equal(detector.handle(shift('keyup', 200)), true)
  assert.equal(detector.handle(shift('keydown', 250)), false)
  assert.equal(detector.handle(shift('keyup', 300)), false)
})

test('double Shift ignores long holds, slow taps, repeats, other keys and modifiers', () => {
  const scenarios = [
    [shift('keydown', 0), shift('keyup', 350)],
    [shift('keydown', 0), shift('keyup', 20), shift('keydown', 600), shift('keyup', 620)],
    [shift('keydown', 0), shift('keydown', 20, { repeat: true }), shift('keyup', 30)],
    [shift('keydown', 0), shift('keyup', 20), shift('keydown', 30, { key: 'A' })],
    [shift('keydown', 0, { ctrlKey: true }), shift('keyup', 20)]
  ]

  for (const events of scenarios) {
    const detector = createDoubleShiftDetector()
    for (const item of events) assert.equal(detector.handle(item), false)
    assert.equal(detector.handle(shift('keydown', 1200)), false)
    assert.equal(detector.handle(shift('keyup', 1250)), false)
  }
})

test('reset discards a first tap', () => {
  const detector = createDoubleShiftDetector()
  detector.handle(shift('keydown', 0))
  detector.handle(shift('keyup', 50))
  detector.reset()

  assert.equal(detector.handle(shift('keydown', 100)), false)
  assert.equal(detector.handle(shift('keyup', 150)), false)
})
