export function DirtyIndicator({ label = 'Unsaved changes' }: { label?: string }) {
  return <span className="mnml-dirty-dot" aria-label={label} />
}
