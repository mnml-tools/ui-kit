import { useState } from 'react'
import { Button, Segmented } from '@mnml-tools/ui'

const panels = { data: 'Rows of the table.', structure: 'Columns, types and keys.', indexes: 'Two indexes.' }

type Panel = keyof typeof panels

export default function Tablist() {
  const [panel, setPanel] = useState<Panel>('data')

  return (
    <div style={{ display: 'grid', gap: 10, width: 280 }}>
      <Segmented label="Table view" role="tablist">
        {(Object.keys(panels) as Panel[]).map((item) => (
          <Button
            key={item}
            type="button"
            role="tab"
            id={`tab-${item}`}
            aria-selected={item === panel}
            aria-controls="table-panel"
            onClick={() => setPanel(item)}
          >
            {item}
          </Button>
        ))}
      </Segmented>
      <div id="table-panel" role="tabpanel" aria-labelledby={`tab-${panel}`}>
        {panels[panel]}
      </div>
    </div>
  )
}
