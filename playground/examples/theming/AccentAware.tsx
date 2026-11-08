import { Button, StatusDot } from '@mnml-tools/ui'

export default function AccentAware() {
  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <StatusDot /> --indicator
      </span>
      <span style={{ padding: '4px 8px', background: 'var(--selected)' }}>--selected</span>
      <Button type="button" style={{ outline: '1px solid var(--focus-ring)', outlineOffset: -1 }}>
        --focus-ring
      </Button>
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>--accent</span>
    </>
  )
}
