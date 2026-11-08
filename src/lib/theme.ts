export const modes = ['light', 'dark'] as const

export const accents = ['pink', 'blue', 'orange', 'green', 'purple'] as const

export type Theme = (typeof modes)[number]

export type Accent = (typeof accents)[number]

export type Appearance = { theme: Theme; accent: Accent }

export type ThemeOptions = {
  /** Prefix of the persisted keys, e.g. `zap` stores `zap.theme` and `zap.accent`. */
  storagePrefix: string
  defaultTheme?: Theme
  defaultAccent?: Accent
  /** Runs whenever the colour mode is applied, e.g. `syncNativeTheme` from `@mnml-tools/ui/tauri`. */
  onThemeChange?: (theme: Theme) => void
}

export type ThemeStore = {
  getAppearance: () => Appearance
  subscribe: (listener: () => void) => () => void
  setTheme: (theme: Theme) => void
  setAccent: (accent: Accent) => void
}

function readPreference<T extends string>(key: string, options: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return options.find((option) => option === stored) ?? fallback
  } catch {
    return fallback
  }
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* Keep the current session usable if storage is unavailable. */
  }
}

/**
 * Applies the stored colour mode and accent to `<html data-theme data-accent>` immediately, keeps them in sync across
 * windows through `storage` events, and notifies subscribers. Create it once, at module load, before the first render.
 */
export function createTheme({
  storagePrefix,
  defaultTheme = 'light',
  defaultAccent = 'blue',
  onThemeChange
}: ThemeOptions): ThemeStore {
  const themeKey = `${storagePrefix}.theme`
  const accentKey = `${storagePrefix}.accent`
  const listeners = new Set<() => void>()

  const readAppearance = (): Appearance => ({
    theme: readPreference(themeKey, modes, defaultTheme),
    accent: readPreference(accentKey, accents, defaultAccent)
  })

  let current = readAppearance()

  const applyMode = () => {
    document.documentElement.dataset.theme = current.theme
    onThemeChange?.(current.theme)
  }

  const applyAccent = () => {
    document.documentElement.dataset.accent = current.accent
  }

  const notify = () => listeners.forEach((listener) => listener())

  applyMode()
  applyAccent()

  window.addEventListener('storage', (event) => {
    if (event.key === themeKey || event.key === accentKey || event.key === null) {
      current = readAppearance()
      applyMode()
      applyAccent()
      notify()
    }
  })

  return {
    getAppearance: () => current,

    subscribe(listener) {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },

    setTheme(theme) {
      current = { ...current, theme }
      applyMode()
      persist(themeKey, theme)
      notify()
    },

    setAccent(accent) {
      current = { ...current, accent }
      applyAccent()
      persist(accentKey, accent)
      notify()
    }
  }
}
