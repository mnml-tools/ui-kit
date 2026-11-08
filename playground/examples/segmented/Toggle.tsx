import { useState } from 'react'
import { Button, Segmented } from '@mnml-tools/ui'

const views = ['list', 'grid', 'table'] as const

export default function Toggle() {
  const [view, setView] = useState<(typeof views)[number]>('list')

  return (
    <div style={{ width: 220 }}>
      <Segmented label="View">
        {views.map((item) => (
          <Button key={item} type="button" aria-pressed={item === view} onClick={() => setView(item)}>
            {item}
          </Button>
        ))}
      </Segmented>
    </div>
  )
}
