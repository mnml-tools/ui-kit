import { RefreshCw, Settings, X } from 'lucide-react'
import { IconButton } from '@mnml-tools/ui'

export default function Basic() {
  return (
    <>
      <IconButton type="button" title="Close" aria-label="Close">
        <X size={13} aria-hidden="true" />
      </IconButton>
      <IconButton type="button" title="Refresh" aria-label="Refresh">
        <RefreshCw size={14} aria-hidden="true" />
      </IconButton>
      <IconButton type="button" title="Settings" aria-label="Settings">
        <Settings size={14} aria-hidden="true" />
      </IconButton>
    </>
  )
}
