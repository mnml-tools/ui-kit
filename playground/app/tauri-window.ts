// Browser stand-in for `@tauri-apps/api/window`, used by the docs only: maximise toggles a flag, the rest are no-ops.
let maximized = false
const resized = new Set<() => void>()

const window = {
  isMaximized: async () => maximized,
  onResized: async (listener: () => void) => {
    resized.add(listener)

    return () => {
      resized.delete(listener)
    }
  },
  toggleMaximize: async () => {
    maximized = !maximized
    resized.forEach((listener) => listener())
  },
  minimize: async () => {},
  close: async () => {},
  setTheme: async () => {}
}

export const getCurrentWindow = () => window
