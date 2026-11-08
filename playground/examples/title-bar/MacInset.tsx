import { Database } from 'lucide-react'
import { Brand, macPlatform, TitleBar } from '@mnml-tools/ui'

export default function MacInset() {
  return (
    <>
      {/* Pads the left edge for the traffic lights of an overlay title bar. */}
      <TitleBar brand={<Brand icon={<Database />} name="Zap" />} macInset />
      <p style={{ margin: 8, color: 'var(--muted)' }}>
        In an app: <code>macInset={'{nativeMac}'}</code> (from <code>@mnml-tools/ui/tauri</code>). This browser is{' '}
        {macPlatform ? '' : 'not '}on macOS.
      </p>
    </>
  )
}
