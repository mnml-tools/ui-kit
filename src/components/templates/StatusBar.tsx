import type { ReactNode } from 'react'

/** The thin mono bar at the bottom of the window. */
export function StatusBar({ start, end }: { start: ReactNode; end: ReactNode }) {
  return (
    <footer className="mnml-statusbar">
      <span>{start}</span>
      <span>{end}</span>
    </footer>
  )
}
