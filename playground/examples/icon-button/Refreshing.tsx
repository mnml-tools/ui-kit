import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { IconButton, spinClassName } from '@mnml-tools/ui'

export default function Refreshing() {
  const [loading, setLoading] = useState(false)

  return (
    <IconButton
      type="button"
      title="Refresh"
      aria-label="Refresh"
      aria-busy={loading}
      disabled={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
      }}
    >
      <RefreshCw size={14} className={loading ? spinClassName : undefined} aria-hidden="true" />
    </IconButton>
  )
}
