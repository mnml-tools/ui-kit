import { Palette } from 'lucide-react'
import { useState } from 'react'
import type { ThemeStore } from '../../lib/theme.ts'
import { AppearanceDialog } from './AppearanceDialog.tsx'

/** Opens the appearance dialog. Excluded from a Tauri title bar's drag region. */
export function ThemeToggle({ theme }: { theme: ThemeStore }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="mnml-button mnml-theme-toggle"
        data-tauri-drag-region="false"
        title="Appearance"
        aria-label="Appearance"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Palette size={14} aria-hidden="true" />
      </button>
      {open && <AppearanceDialog theme={theme} onDismiss={() => setOpen(false)} />}
    </>
  )
}
