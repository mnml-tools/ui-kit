// Browsers report macOS as "MacIntel" even on Apple silicon; Cmd is the link modifier there.
export const macPlatform = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
