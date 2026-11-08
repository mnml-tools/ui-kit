import type { ReactNode } from 'react'
import { CopyButton } from './CopyButton.tsx'
import { highlight } from './highlight.tsx'
import type { Language } from './highlight.tsx'

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** A titled part of a page; its `h2` feeds the "On this page" list. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="docs-section">
      <h2 id={slugify(title)}>{title}</h2>
      {children}
    </section>
  )
}

export function Code({ code, language = 'tsx', copy = true }: { code: string; language?: Language; copy?: boolean }) {
  const text = code.trim()

  return (
    <div className="docs-code">
      <pre>
        <code>{highlight(text, language)}</code>
      </pre>
      {copy && <CopyButton text={text} />}
    </div>
  )
}

export function Note({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warning' }) {
  return (
    <aside className="docs-note" data-tone={tone}>
      {children}
    </aside>
  )
}

export const Link = ({ to, children }: { to: string; children: ReactNode }) => <a href={`#/${to}`}>{children}</a>

/** Turns the backticks of a JSDoc comment into `<code>`. */
export function Markdown({ text }: { text: string }) {
  return (
    <>
      {text
        .replace(/\s*\n\s*/g, ' ')
        .split(/(`[^`]+`)/)
        .map((part, index) => (part.startsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part))}
    </>
  )
}
