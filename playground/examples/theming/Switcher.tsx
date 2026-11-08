import { accents, Button, modes, Segmented, useTheme } from '@mnml-tools/ui'
import { theme } from '~/theme'

export default function Switcher() {
  const { theme: mode, accent, setTheme, setAccent } = useTheme(theme)

  return (
    <div style={{ display: 'grid', gap: 10, width: 360 }}>
      <Segmented label="Colour mode">
        {modes.map((item) => (
          <Button key={item} type="button" aria-pressed={item === mode} onClick={() => setTheme(item)}>
            {item}
          </Button>
        ))}
      </Segmented>
      <Segmented label="Accent colour">
        {accents.map((item) => (
          <Button key={item} type="button" aria-pressed={item === accent} onClick={() => setAccent(item)}>
            {/* `data-swatch` sets --accent to that colour, for previews. */}
            <span data-swatch={item} style={{ width: 8, height: 8, background: 'var(--accent)' }} />
            {item}
          </Button>
        ))}
      </Segmented>
    </div>
  )
}
