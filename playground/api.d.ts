export type ApiKind = 'component' | 'hook' | 'function' | 'constant' | 'type'

export type ApiProp = { name: string; type: string; required: boolean; default?: string; description: string }

export type ApiEntry = {
  name: string
  kind: ApiKind
  /** The import path, e.g. `@mnml-tools/ui/tauri`. */
  entry: string
  /** Repository-relative path of the declaration. */
  source: string
  description: string
  signature?: string
  props: ApiProp[]
  /** The element whose native attributes a component also accepts, e.g. `button`. */
  native?: string
}
