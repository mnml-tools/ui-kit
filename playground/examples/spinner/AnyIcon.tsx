import { Loader, RefreshCw } from 'lucide-react'
import { spinClassName } from '@mnml-tools/ui'

export default function AnyIcon() {
  return (
    <>
      <RefreshCw size={14} className={spinClassName} />
      <Loader size={14} className={spinClassName} />
    </>
  )
}
