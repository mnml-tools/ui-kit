import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Boxes, Github, Menu } from 'lucide-react'
import {
  AppShell,
  Brand,
  formatShortcut,
  HighlightedText,
  IconButton,
  ResizableSidebar,
  SearchField,
  Separator,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  StatusBar,
  ThemeToggle,
  TitleBar,
  useShortcut,
  useTheme
} from '@mnml-tools/ui'
import type { Shortcut } from '@mnml-tools/ui'
import { exports, importStatement, repository } from './Api.tsx'
import { Code } from './content.tsx'
import { groups, pages } from './pages.tsx'
import type { PageInfo } from './pages.tsx'
import { navigate, useRoute } from './router.ts'
import { theme } from './theme.ts'

const searchShortcut: Shortcut = { key: 'k', primary: true, allowInInputs: true }

type Result = { page: PageInfo; indices: number[]; via?: string }

function search(query: string): Result[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return pages.map((page) => ({ page, indices: [] }))

  return pages.flatMap((page) => {
    const at = page.title.toLowerCase().indexOf(needle)
    if (at >= 0) return [{ page, indices: Array.from({ length: needle.length }, (_, index) => at + index) }]

    const via = page.api?.find((name) => name.toLowerCase().includes(needle))
    if (via) return [{ page, indices: [], via }]

    const text = `${page.summary} ${page.keywords ?? ''}`.toLowerCase()

    return text.includes(needle) ? [{ page, indices: [] }] : []
  })
}

export function Docs() {
  const route = useRoute()
  const { theme: mode, accent } = useTheme(theme)
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const main = useRef<HTMLElement>(null)
  const page = pages.find((item) => item.slug === route) ?? pages[0]
  const index = pages.indexOf(page)
  const results = useMemo(() => search(query), [query])

  useShortcut(searchShortcut, true, () => {
    setNavOpen(true)
    searchInput.current?.focus()
    searchInput.current?.select()
  })

  useEffect(() => {
    main.current?.scrollTo({ top: 0 })
    setNavOpen(false)
    document.title = `${page.title} · mnml-tools UI`
  }, [page])

  const open = (slug: string) => {
    navigate(slug)
    setQuery('')
  }

  const Page = page.page

  return (
    <AppShell className="docs">
      <TitleBar
        brand={
          <div className="docs-brand">
            <IconButton
              type="button"
              className="docs-menu"
              aria-label="Navigation"
              aria-expanded={navOpen}
              aria-controls="docs-nav"
              onClick={() => setNavOpen(!navOpen)}
            >
              <Menu size={15} aria-hidden="true" />
            </IconButton>
            <Brand icon={<Boxes />} name="mnml-tools UI" note={`v${__KIT_VERSION__} · developer docs`} />
          </div>
        }
        end={
          <>
            <a className="docs-github" href={repository.replace('/blob/main/', '')} target="_blank" rel="noreferrer">
              <Github size={13} aria-hidden="true" />
              GitHub
            </a>
            <ThemeToggle theme={theme} />
          </>
        }
      />
      <div className="docs-body" data-nav-open={navOpen || undefined}>
        <ResizableSidebar id="docs-nav" storageKey="mnml-docs.sidebar" label="Resize navigation" minimum={190}>
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              if (results[0]) open(results[0].page.slug)
            }}
          >
            <SearchField
              label="Search the docs"
              placeholder="Search components, hooks…"
              value={query}
              onChange={setQuery}
              inputRef={searchInput}
              shortcutHint={formatShortcut(searchShortcut)}
              shortcutLabel="Search shortcut"
            />
          </form>
          <SidebarNav label="Documentation">
            {groups.map((group) => {
              const items = results.filter((result) => result.page.group === group)
              if (!items.length) return null

              return (
                <div key={group} className="docs-nav-group">
                  <SidebarLabel>
                    {group}
                    <span>{items.length}</span>
                  </SidebarLabel>
                  {items.map(({ page: item, indices, via }) => (
                    <SidebarItem
                      key={item.slug}
                      type="button"
                      active={item === page}
                      aria-current={item === page ? 'page' : undefined}
                      onClick={() => open(item.slug)}
                    >
                      <span>
                        <HighlightedText text={item.title} indices={indices} />
                      </span>
                      {via && <small>{via}</small>}
                    </SidebarItem>
                  ))}
                </div>
              )
            })}
            {!results.length && <p className="docs-nav-empty">Nothing matches “{query}”.</p>}
          </SidebarNav>
          <SidebarFooter>
            <code>@mnml-tools/ui</code>
            <span className="docs-footer-version">{__KIT_VERSION__}</span>
          </SidebarFooter>
        </ResizableSidebar>
        <button type="button" className="docs-scrim" aria-label="Close navigation" onClick={() => setNavOpen(false)} />
        <main ref={main} className="docs-main">
          <article className="docs-page" key={page.slug}>
            <header className="docs-page-header">
              <div className="docs-eyebrow">{page.group}</div>
              <h1>{page.title}</h1>
              <p className="docs-lede">{page.summary}</p>
              {page.api && page.api.length > 0 && <Code code={importStatement(page.api)} />}
            </header>
            <Page />
            <nav className="docs-pager" aria-label="Pages">
              {pages[index - 1] ? (
                <a href={`#/${pages[index - 1].slug}`}>
                  <ArrowLeft size={13} aria-hidden="true" />
                  <span>
                    <small>Previous</small>
                    {pages[index - 1].title}
                  </span>
                </a>
              ) : (
                <span />
              )}
              {pages[index + 1] && (
                <a href={`#/${pages[index + 1].slug}`} data-next>
                  <span>
                    <small>Next</small>
                    {pages[index + 1].title}
                  </span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              )}
            </nav>
          </article>
          <Toc page={page} />
        </main>
      </div>
      <StatusBar
        start={
          <>
            {page.group}
            <Separator />
            {page.title}
          </>
        }
        end={
          <>
            {pages.length} pages
            <Separator />
            {exports.size} exports
            <Separator />
            {mode} · {accent}
          </>
        }
      />
    </AppShell>
  )
}

/** "On this page": the page's section headings, read from the DOM once it has rendered. */
function Toc({ page }: { page: PageInfo }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    // Headings inside previews (a dialog's title, say) belong to the example, not the page.
    const found = document.querySelectorAll<HTMLElement>('.docs-section > h2[id], .docs-example-block > h3[id]')
    setHeadings(
      [...found].map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: element.tagName === 'H2' ? 2 : 3
      }))
    )
  }, [page])

  if (headings.length < 2) return <div className="docs-toc" />

  return (
    <nav className="docs-toc" aria-label="On this page">
      <div className="docs-toc-title">On this page</div>
      {headings.map((heading) => (
        <button
          key={heading.id}
          type="button"
          data-level={heading.level}
          onClick={() => document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  )
}
