import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { LineReveal } from '../components/LineReveal'

const BEATS = [
  {
    k: 'Arrive',
    t: 'Sit however you like. Nothing to set up, nothing to learn. The orb is already breathing.',
  },
  {
    k: 'Breathe',
    t: 'Follow the expand and release. In as it grows, out as it settles. Let the count do the counting.',
  },
  {
    k: 'Return',
    t: 'Two, five, or ten minutes later, you come back a little slower. That’s the whole idea.',
  },
]

export function HowItFeels() {
  return (
    <Section id="how">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.22em] text-ink-faint">How a session feels</p>
      </Reveal>
      <LineReveal
        as="h2"
        className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-ink md:text-4xl"
        lines={['Arrive, breathe, return —', 'a little softer than you came.']}
      />

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {BEATS.map((b, i) => (
          <Reveal key={b.k} delay={i * 0.08}>
            <div className="border-t border-line pt-6">
              <span className="font-mono text-sm text-clay-deep">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-2xl text-ink">{b.k}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{b.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
