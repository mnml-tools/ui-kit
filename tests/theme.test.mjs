import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'
import { createTheme } from '../src/lib/theme.ts'

let storage
let storageListeners

beforeEach(() => {
  storage = new Map()
  storageListeners = []
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value))
  }
  globalThis.document = { documentElement: { dataset: {} } }
  globalThis.window = { addEventListener: (type, listener) => type === 'storage' && storageListeners.push(listener) }
})

const root = () => document.documentElement.dataset

test('applies the defaults to the document when nothing is stored', () => {
  const theme = createTheme({ storagePrefix: 'app' })

  assert.deepEqual(theme.getAppearance(), { theme: 'light', accent: 'blue' })
  assert.equal(root().theme, 'light')
  assert.equal(root().accent, 'blue')
})

test('reads stored preferences under the app prefix and ignores unknown values', () => {
  storage.set('zap.theme', 'dark')
  storage.set('zap.accent', 'teal')

  const theme = createTheme({ storagePrefix: 'zap', defaultAccent: 'green' })

  assert.deepEqual(theme.getAppearance(), { theme: 'dark', accent: 'green' })
})

test('setters apply, persist and notify, and unsubscribing stops notifications', () => {
  const changes = []
  const theme = createTheme({ storagePrefix: 'app', onThemeChange: (mode) => changes.push(mode) })
  let notified = 0
  const unsubscribe = theme.subscribe(() => notified++)

  theme.setTheme('dark')
  theme.setAccent('purple')
  unsubscribe()
  theme.setAccent('pink')

  assert.deepEqual(changes, ['light', 'dark'])
  assert.equal(root().theme, 'dark')
  assert.equal(root().accent, 'pink')
  assert.equal(storage.get('app.theme'), 'dark')
  assert.equal(storage.get('app.accent'), 'pink')
  assert.equal(notified, 2)
})

test('follows changes made by another window and ignores unrelated keys', () => {
  const theme = createTheme({ storagePrefix: 'app' })
  let notified = 0
  theme.subscribe(() => notified++)

  storage.set('app.accent', 'orange')
  storageListeners.forEach((listener) => listener({ key: 'other.key' }))
  assert.equal(notified, 0)

  storageListeners.forEach((listener) => listener({ key: 'app.accent' }))
  assert.equal(theme.getAppearance().accent, 'orange')
  assert.equal(root().accent, 'orange')
  assert.equal(notified, 1)
})

test('keeps working when storage is unavailable', () => {
  globalThis.localStorage = {
    getItem: () => {
      throw new Error('blocked')
    },
    setItem: () => {
      throw new Error('blocked')
    }
  }

  const theme = createTheme({ storagePrefix: 'app', defaultTheme: 'dark' })
  theme.setAccent('green')

  assert.deepEqual(theme.getAppearance(), { theme: 'dark', accent: 'green' })
})
