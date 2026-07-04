import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BreathOrb } from '../components/BreathOrb'
import { Button } from '../components/Button'
import { PatternSelector } from '../components/PatternSelector'
import { Container } from '../components/Container'
import { LineReveal } from '../components/LineReveal'
import { Ornament } from '../components/Ornament'
import { Reveal } from '../components/Reveal'
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

  // Scroll choreography: as the hero leaves, the orb drifts up and settles
  // ("exhale"), the ornament ripples parallax the other way, the whole thing
  // eases out. Motion values are always created (hooks are unconditional) but
  // only applied when motion is allowed.
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -54])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.6])
  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, 96])
  const ornamentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2])

  const orbStyle = reduced ? undefined : { y: orbY, scale: orbScale, opacity: orbOpacity }
  const ornamentStyle = reduced ? undefined : { y: ornamentY, opacity: ornamentOpacity }

  return (
    <header
      id="top"
      ref={heroRef}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-8">
          {/* Left — the invitation */}
          <div className="order-2 md:order-1">
            <Reveal>
              <p className="mb-5 text-sm uppercase tracking-[0.22em] text-ink-faint">
                Breathwork, in your browser
              </p>
            </Reveal>

            <LineReveal
              as="h1"
              className="font-serif text-[2.7rem] leading-[1.05] tracking-[-0.01em] text-ink md:text-6xl"
              delay={0.1}
              lines={[
                'Find your still point',
                <span key="l2" className="italic text-clay-deep">
                  — a breath at a time.
                </span>,
              ]}
            />

            <Reveal delay={0.35}>
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
            </Reveal>
          </div>

          {/* Right — the orb, over a soft ripple ornament */}
          <div className="relative order-1 grid place-items-center md:order-2">
            <motion.div
              aria-hidden
              className="absolute"
              style={{ width: 520, height: 520, ...ornamentStyle }}
            >
              <Ornament className="h-full w-full animate-haze" />
            </motion.div>
            <motion.div style={orbStyle}>
              <BreathOrb
                scale={scale}
                label={label}
                phase={breathing ? cyc.phase : 'idle'}
                reduced={reduced}
                size={300}
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </header>
  )
}
