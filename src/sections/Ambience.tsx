import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { LineReveal } from '../components/LineReveal'
import { AmbienceToggle } from '../components/AmbienceToggle'

export function Ambience() {
  return (
    <Section id="ambience" bg="sink">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.22em] text-ink-faint">Optional sound</p>
          <LineReveal
            as="h2"
            className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl"
            lines={['A warm hum,', 'if you want one.']}
          />
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            A soft ambient pad — no track, no download. It’s generated live in your
            browser and drifts gently so it never loops or nags. Off by default; turn it
            on only if it helps.
          </p>
          <div className="mt-8">
            <AmbienceToggle />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-line bg-paper-raised p-8">
            <p className="font-serif text-xl text-ink">Built, not bought.</p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              The pad is a few detuned oscillators through a slow-moving filter — a
              little Web Audio graph, weightless and calm. The kind of detail you only
              get when the person who designed it also wrote the code.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
