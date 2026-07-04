import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { LineReveal } from '../components/LineReveal'
import { Button } from '../components/Button'

interface PricingProps {
  onStartSession: () => void
}

export function Pricing({ onStartSession }: PricingProps) {
  return (
    <Section id="pricing">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.22em] text-ink-faint">One honest plan</p>
        </Reveal>
        <LineReveal
          as="h2"
          className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl"
          lines={['Free.', 'And it stays free.']}
        />
        <Reveal delay={0.15}>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Every pattern, every session length, the ambience — all of it, no account. If
            Stillpoint gives you a calmer minute, that’s the whole point. Support it if it
            earns a place in your day.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-line bg-paper-raised p-9">
            <p className="font-serif text-5xl text-ink">$0</p>
            <p className="mt-2 text-ink-faint">Core, forever</p>
            <div className="mt-7 flex flex-col items-center gap-3">
              <Button onClick={onStartSession}>Start a session</Button>
              <span className="text-sm text-ink-faint">Supporter tier — name your price, someday.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
