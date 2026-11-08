import type { useResize } from '../../hooks/useResize.ts'

type Props = ReturnType<typeof useResize> & {
  /** Accessible name, e.g. "Resize sidebar". */
  label: string
  /** `id` of the pane it resizes. */
  controls: string
}

/** A vertical separator on the pane's edge; put it inside a `position: relative` pane. */
export function ResizeHandle({ width, minimum, maximum, dragging, edge, handlers, label, controls }: Props) {
  return (
    <div
      role="separator"
      aria-label={label}
      aria-controls={controls}
      aria-orientation="vertical"
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={width}
      aria-valuetext={`${width} pixels`}
      tabIndex={0}
      className="mnml-resize-handle"
      data-edge={edge}
      data-dragging={dragging || undefined}
      {...handlers}
    />
  )
}
