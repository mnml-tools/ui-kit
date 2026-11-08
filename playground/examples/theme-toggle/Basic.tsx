import { ThemeToggle } from '@mnml-tools/ui'
// The app's store, created once with `createTheme` (see Theming).
import { theme } from '~/theme'

export default function Basic() {
  return (
    <>
      <ThemeToggle theme={theme} />
      <span>Opens the appearance dialog.</span>
    </>
  )
}
