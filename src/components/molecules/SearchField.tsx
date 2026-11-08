import type { ReactNode, Ref } from 'react'
import { Search } from 'lucide-react'
import { cx } from '../../lib/cx.ts'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  size?: number
  shortcutHint?: ReactNode
  shortcutLabel?: string
  className?: string
  inputRef?: Ref<HTMLInputElement>
}

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
  size = 14,
  shortcutHint,
  shortcutLabel,
  className,
  inputRef
}: Props) {
  return (
    <label className={cx('mnml-search', className)}>
      <Search size={size} />
      <input
        ref={inputRef}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {shortcutHint && (
        <kbd className="mnml-search-shortcut" aria-label={shortcutLabel} title={shortcutLabel}>
          {shortcutHint}
        </kbd>
      )}
    </label>
  )
}
