import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { PATTERNS, type BreathPattern, type Phase } from '../data/patterns'
import { cx } from '../lib/cx'

interface PatternsProps {
  value: string
  onChange: (id: string) => void
}

const SHORT: Record<Phase, string> = {
  inhale: 'in',
  holdTop: 'hold',
  exhale: 'out',
  holdBottom: 'hold',
}

function rhythm(p: BreathPattern): string {
  return p.steps.map((s) => `${s.seconds}s ${SHORT[s.phase]}`).join('  ·  ')
}

export function Patterns({ value, onChange }: PatternsProps) {
  return (
    <Section id="patterns" bg="sink">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.22em] text-ink-faint">Three patterns</p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-ink md:text-4xl">
          Pick a rhythm. The orb above follows along.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PATTERNS.map((p, i) => {
          const active = p.id === value
          return (
            <Reveal key={p.id} delay={i * 0.08}>
              <button
                onClick={() => onChange(p.id)}
                aria-pressed={active}
                className={cx(
                  'flex h-full w-full flex-col rounded-3xl border p-7 text-left transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-sink',
                  active
                    ? 'border-clay bg-paper-raised'
                    : 'border-line bg-paper-raised/60 hover:border-line-strong',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-ink">{p.name}</span>
                  <span
                    className={cx(
                      'h-2.5 w-2.5 rounded-full',
                      active ? 'bg-clay' : 'bg-line-strong',
                    )}
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-ink-soft">{p.tagline}</p>
                <p className="mt-6 font-mono text-sm text-ink-faint">{rhythm(p)}</p>
              </button>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
