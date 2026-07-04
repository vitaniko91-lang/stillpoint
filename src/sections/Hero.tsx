import { useState } from 'react'
import { BreathOrb } from '../components/BreathOrb'
import { Button } from '../components/Button'
import { PatternSelector } from '../components/PatternSelector'
import { Container } from '../components/Container'
import { useBreathCycle } from '../hooks/useBreathCycle'
import { useReducedMotion } from '../lib/useReducedMotion'
import { getPattern } from '../data/patterns'

interface HeroProps {
  patternId: string
  onPatternChange: (id: string) => void
  onStartSession: () => void
}

const REST_SCALE = 0.82

export function Hero({ patternId, onPatternChange, onStartSession }: HeroProps) {
  const [breathing, setBreathing] = useState(false)
  const reduced = useReducedMotion()
  const pattern = getPattern(patternId)
  const cyc = useBreathCycle(pattern, breathing)

  const scale = breathing ? cyc.scale : REST_SCALE
  const label = breathing ? cyc.label : 'Breathe'

  return (
    <header id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-8">
          {/* Left — the invitation */}
          <div className="order-2 md:order-1">
            <p className="mb-5 text-sm uppercase tracking-[0.22em] text-ink-faint">
              Breathwork, in your browser
            </p>
            <h1 className="font-serif text-[2.7rem] leading-[1.05] tracking-[-0.01em] text-ink md:text-6xl">
              Find your still point
              <span className="italic text-clay-deep"> — a breath at a time.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              A guide you can use right here — no app, no account. Press{' '}
              <span className="text-ink">Breathe</span> and follow along.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button onClick={() => setBreathing((v) => !v)} aria-pressed={breathing}>
                {breathing ? 'Pause' : 'Breathe'}
              </Button>
              <Button variant="ghost" onClick={onStartSession}>
                Start a session →
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <PatternSelector value={patternId} onChange={onPatternChange} />
              <p className="text-sm text-ink-faint">{pattern.tagline}</p>
            </div>
          </div>

          {/* Right — the orb */}
          <div className="order-1 grid place-items-center md:order-2">
            <BreathOrb
              scale={scale}
              label={label}
              phase={breathing ? cyc.phase : 'idle'}
              reduced={reduced}
              size={300}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
