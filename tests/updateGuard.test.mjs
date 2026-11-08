import assert from 'node:assert/strict'
import { test } from 'node:test'
import { inspectUpdateSafety, registerUpdateGuard, updateDecision } from '../src/lib/updateGuard.ts'

test('the guard reports live state, and only its own unregister clears it', () => {
  let state = { dirty: false, busy: false }
  const unregister = registerUpdateGuard(() => state)

  state = { dirty: true, busy: true }
  assert.deepEqual(inspectUpdateSafety(), { dirty: true, busy: true })

  const replace = registerUpdateGuard(() => ({ dirty: false, busy: true }))
  unregister()
  assert.deepEqual(inspectUpdateSafety(), { dirty: false, busy: true })

  replace()
  assert.deepEqual(inspectUpdateSafety(), { dirty: false, busy: false })
})

test('running work blocks, unsaved work asks once, and an installed update restarts', () => {
  assert.equal(updateDecision({ dirty: false, busy: true }, true, true), 'busy')
  assert.equal(updateDecision({ dirty: true, busy: false }, false, false), 'confirm')
  assert.equal(updateDecision({ dirty: true, busy: false }, true, false), 'install')
  assert.equal(updateDecision({ dirty: true, busy: false }, false, true), 'install')
  assert.equal(updateDecision({ dirty: false, busy: false }, false, false), 'install')
})
