import { useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Code, slugify } from './content.tsx'
import { CopyButton } from './CopyButton.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'

// Every file under examples/ is both rendered and shown, so the code next to a preview is the code that drew it.
const modules = import.meta.glob<ComponentType>('../examples/**/*.tsx', { eager: true, import: 'default' })
const sources = import.meta.glob<string>('../examples/**/*.tsx', { eager: true, query: '?raw', import: 'default' })

const key = (path: string) => path.replace('../examples/', '').replace(/\.tsx$/, '')

export const examples = new Map(
  Object.entries(modules).map(([path, component]) => [key(path), { component, source: sources[path] }])
)

type Props = {
  /** Path under `examples/` without the extension, e.g. `button/Variants`. */
  name: string
  title?: string
  children?: ReactNode
  /** `row` lines the preview up, `center` centres it, `block` leaves it to the example. */
  stage?: 'row' | 'center' | 'block'
  /** `flush` drops the preview padding, for full-width layouts. */
  flush?: boolean
  height?: number
  /** Start with the code collapsed. */
  collapsed?: boolean
}

export function Example({ name, title, children, stage = 'row', flush, height, collapsed = false }: Props) {
  const example = examples.get(name)
  const [open, setOpen] = useState(!collapsed)
  if (!example) throw new Error(`No example at examples/${name}.tsx`)

  const Preview = example.component

  return (
    <div className="docs-example-block">
      {title && <h3 id={slugify(title)}>{title}</h3>}
      {children && <div className="docs-example-intro">{children}</div>}
      <figure className="docs-example">
        <div
          className="docs-preview"
          data-stage={stage}
          data-flush={flush || undefined}
          style={height ? { minHeight: height } : undefined}
        >
          <ErrorBoundary>
            <Preview />
          </ErrorBoundary>
        </div>
        <figcaption className="docs-example-bar">
          <button type="button" className="docs-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <ChevronDown size={13} aria-hidden="true" /> : <ChevronRight size={13} aria-hidden="true" />}
            {open ? 'Hide code' : 'Show code'}
          </button>
          <span className="docs-example-file">examples/{name}.tsx</span>
          <CopyButton text={example.source} />
        </figcaption>
        {open && <Code code={example.source} copy={false} />}
      </figure>
    </div>
  )
}
