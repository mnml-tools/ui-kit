import { Database } from 'lucide-react'
import { Brand, StatusDot, ThemeToggle, TitleBar } from '@mnml-tools/ui'
import { theme } from '~/theme'

export default function Basic() {
  return (
    <TitleBar
      brand={<Brand icon={<Database />} name="Zap" note="Production" />}
      center={<span>people · 1,204 rows</span>}
      end={
        <>
          <StatusDot />
          Connected
          <ThemeToggle theme={theme} />
        </>
      }
    />
  )
}
