import { Spinner } from '@mnml-tools/ui'

export default function Sizes() {
  return (
    <>
      <Spinner size={13} />
      <Spinner />
      <Spinner size={20} />
      <span>Loading tables…</span>
    </>
  )
}
