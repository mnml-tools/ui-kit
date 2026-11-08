import { Badge } from '@mnml-tools/ui'
import api from 'virtual:api'
import type { ApiEntry } from '../api.d.ts'
import { Code, Markdown, slugify } from './content.tsx'

export const repository = 'https://github.com/mnml-tools/ui-kit/blob/main/'

export const exports = new Map(api.map((entry) => [entry.name, entry]))

export function entryOf(name: string) {
  const entry = exports.get(name)
  if (!entry) throw new Error(`${name} is not exported by the kit`)

  return entry
}

/** `import { … } from '…'` lines for the given exports, types on their own line. */
export function importStatement(names: string[]) {
  const lines: string[] = []
  const groups = new Map<string, ApiEntry[]>()
  for (const entry of names.map(entryOf)) groups.set(entry.entry, [...(groups.get(entry.entry) ?? []), entry])

  for (const [from, entries] of groups) {
    const values = entries.filter((entry) => entry.kind !== 'type').map((entry) => entry.name)
    const types = entries.filter((entry) => entry.kind === 'type').map((entry) => entry.name)
    if (values.length) lines.push(`import { ${values.join(', ')} } from '${from}'`)
    if (types.length) lines.push(`import type { ${types.join(', ')} } from '${from}'`)
  }

  return lines.join('\n')
}

/** Name, JSDoc, signature and props of one export, read from the source by the TypeScript compiler. */
export function Api({ name }: { name: string }) {
  const entry = entryOf(name)
  const propsLabel = entry.kind === 'component' ? 'Prop' : entry.kind === 'type' ? 'Field' : 'Option'

  return (
    <div className="docs-api">
      <h3 id={slugify(`api-${name}`)}>
        <code>{name}</code>
        <Badge>{entry.kind}</Badge>
        <a className="docs-source" href={repository + entry.source} target="_blank" rel="noreferrer">
          {entry.source}
        </a>
      </h3>
      {entry.description && (
        <p>
          <Markdown text={entry.description} />
        </p>
      )}
      {entry.signature && <Code code={entry.signature} />}
      {entry.props.length > 0 && (
        <div className="docs-table-scroll">
          <table className="docs-table">
            <thead>
              <tr>
                <th>{propsLabel}</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entry.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                    {prop.required && (
                      <span className="docs-required" title="Required">
                        required
                      </span>
                    )}
                  </td>
                  <td>
                    <code className="docs-type">{prop.type}</code>
                  </td>
                  <td>{prop.default ? <code>{prop.default}</code> : <span className="docs-none">—</span>}</td>
                  <td>
                    <Markdown text={prop.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {entry.native && (
        <p className="docs-native">
          Also accepts every native <code>&lt;{entry.native}&gt;</code> attribute (<code>onClick</code>,{' '}
          <code>disabled</code>, <code>aria-*</code>, …), passed through to the element.
        </p>
      )}
      {entry.kind === 'component' && !entry.props.length && !entry.native && <p className="docs-native">No props.</p>}
    </div>
  )
}
