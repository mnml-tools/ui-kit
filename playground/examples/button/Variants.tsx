import { Plus } from 'lucide-react'
import { Button } from '@mnml-tools/ui'

export default function Variants() {
  return (
    <>
      <Button type="button">Cancel</Button>
      <Button type="button" variant="primary">
        <Plus size={15} />
        New connection
      </Button>
    </>
  )
}
