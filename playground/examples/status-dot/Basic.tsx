import { StatusDot } from '@mnml-tools/ui'

export default function Basic() {
  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <StatusDot />
        Connected
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <StatusDot />
        Watching 3 files
      </span>
    </>
  )
}
