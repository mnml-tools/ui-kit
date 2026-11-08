/// <reference types="vite/client" />

declare module 'virtual:api' {
  const entries: import('./api.d.ts').ApiEntry[]
  export default entries
}

/** The kit's version from package.json. */
declare const __KIT_VERSION__: string
