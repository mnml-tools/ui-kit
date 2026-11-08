import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiDocs } from './api-plugin.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const path = (file: string) => fileURLToPath(new URL(file, import.meta.url))
const { version } = JSON.parse(readFileSync(path('../package.json'), 'utf8'))

export default defineConfig({
  // Relative asset URLs and hash routes, so the build works from any sub-path (e.g. GitHub Pages).
  base: './',
  plugins: [react(), apiDocs(root)],
  define: { __KIT_VERSION__: JSON.stringify(version) },
  resolve: {
    alias: [
      // Examples import the package by name, so their code can be copied into an app as is.
      { find: /^@mnml-tools\/ui$/, replacement: path('../src/index.ts') },
      { find: /^@mnml-tools\/ui\/tauri$/, replacement: path('../src/tauri/index.ts') },
      { find: /^~\/theme$/, replacement: path('./app/theme.ts') },
      // Outside Tauri the real window API throws; the stub lets WindowControls render in the browser.
      { find: /^@tauri-apps\/api\/window$/, replacement: path('./app/tauri-window.ts') }
    ]
  },
  server: { port: 1440, strictPort: true },
  build: { outDir: '../dist-docs', emptyOutDir: true },
  clearScreen: false
})
