import { DirtyIndicator } from '@mnml-tools/ui'

export default function Basic() {
  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        query.sql
        <DirtyIndicator />
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        settings.json
        <DirtyIndicator label="Settings not saved" />
      </span>
    </>
  )
}
