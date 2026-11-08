import { createPortal } from 'react-dom'
import { useTheme } from '../../hooks/useTheme.ts'
import { accents, modes } from '../../lib/theme.ts'
import type { ThemeStore } from '../../lib/theme.ts'
import { Button } from '../atoms/Button.tsx'
import { Dialog } from './Dialog.tsx'
import { Segmented } from './Segmented.tsx'

/** Colour mode and accent picker. Rendered into `document.body`, so it can be opened from a title bar. */
export function AppearanceDialog({ theme, onDismiss }: { theme: ThemeStore; onDismiss: () => void }) {
  const { theme: mode, accent, setTheme, setAccent } = useTheme(theme)

  return createPortal(
    <Dialog title="Appearance" className="mnml-appearance-dialog" onDismiss={onDismiss}>
      <div className="mnml-appearance-options">
        <div>Colour mode</div>
        <Segmented className="mnml-appearance-modes" label="Colour mode">
          {modes.map((item) => (
            <Button key={item} type="button" aria-pressed={item === mode} onClick={() => setTheme(item)}>
              {item}
            </Button>
          ))}
        </Segmented>
        <div>Accent colour</div>
        <div className="mnml-appearance-accents" role="group" aria-label="Accent colour">
          {accents.map((colour) => (
            <Button
              key={colour}
              type="button"
              data-swatch={colour}
              aria-pressed={colour === accent}
              onClick={() => setAccent(colour)}
            >
              <span className="mnml-appearance-swatch" aria-hidden="true" />
              {colour}
            </Button>
          ))}
        </div>
      </div>
      <div className="mnml-dialog-actions">
        <Button type="button" onClick={onDismiss}>
          Done
        </Button>
      </div>
    </Dialog>,
    document.body
  )
}
