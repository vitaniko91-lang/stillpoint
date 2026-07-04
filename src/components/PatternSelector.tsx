import { PATTERNS } from '../data/patterns'
import { cx } from '../lib/cx'

interface PatternSelectorProps {
  value: string
  onChange: (id: string) => void
  className?: string
}

/**
 * Compact pill radiogroup for switching breath pattern (hero + session).
 * Keyboard-operable via the radio buttons; the active pill is clay-marked.
 */
export function PatternSelector({ value, onChange, className }: PatternSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Breath pattern" className={cx('inline-flex gap-1.5', className)}>
      {PATTERNS.map((p) => {
        const active = p.id === value
        return (
          <button
            key={p.id}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(p.id)}
            className={cx(
              'rounded-full px-4 py-1.5 text-sm transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-base',
              active
                ? 'bg-clay text-paper-raised'
                : 'text-ink-soft hover:text-ink border border-line',
            )}
          >
            {p.name}
          </button>
        )
      })}
    </div>
  )
}
