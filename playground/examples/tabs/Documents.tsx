import { useState } from 'react'
import { Plus, Table2 } from 'lucide-react'
import { IconButton, Tab, Tabs } from '@mnml-tools/ui'

type Doc = { id: number; title: string; dirty: boolean }

export default function Documents() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: 1, title: 'people', dirty: false },
    { id: 2, title: 'events', dirty: true },
    { id: 3, title: 'payments', dirty: false }
  ])
  const [active, setActive] = useState(1)
  const [next, setNext] = useState(4)

  const close = (id: number) => {
    const rest = docs.filter((doc) => doc.id !== id)
    setDocs(rest)
    if (id === active && rest.length) setActive(rest[0].id)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
      <Tabs>
        {docs.map((doc) => (
          <Tab
            key={doc.id}
            title={doc.title}
            icon={<Table2 size={14} />}
            active={doc.id === active}
            dirty={doc.dirty}
            closeLabel={`Close ${doc.title}`}
            onSelect={() => setActive(doc.id)}
            onClose={() => close(doc.id)}
          />
        ))}
      </Tabs>
      <IconButton
        type="button"
        aria-label="New tab"
        title="New tab"
        onClick={() => {
          setDocs([...docs, { id: next, title: `query ${next}`, dirty: false }])
          setActive(next)
          setNext(next + 1)
        }}
      >
        <Plus size={14} aria-hidden="true" />
      </IconButton>
    </div>
  )
}
