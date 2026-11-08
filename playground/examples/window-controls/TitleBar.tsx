import { Database } from 'lucide-react'
import { Brand, ThemeToggle, TitleBar } from '@mnml-tools/ui'
import { WindowControls } from '@mnml-tools/ui/tauri'
import { theme } from '~/theme'

export default function LinuxTitleBar() {
  return (
    <TitleBar
      brand={<Brand icon={<Database />} name="Zap" />}
      end={
        <>
          <ThemeToggle theme={theme} />
          <WindowControls />
        </>
      }
    />
  )
}
