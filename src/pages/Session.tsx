import { useEffect, useState } from 'react'
import { BreathOrb } from '../components/BreathOrb'
import { Button } from '../components/Button'
import { PatternSelector } from '../components/PatternSelector'
import { AmbienceToggle } from '../components/AmbienceToggle'
import { useBreathCycle } from '../hooks/useBreathCycle'
import { useReducedMotion } from '../lib/useReducedMotion'
import { getPattern } from '../data/patterns'
import { cx } from '../lib/cx'

interface SessionProps {
  patternId: string
  onPatternChange: (id: string) => void
  onExit: () => void
}

const LENGTHS = [2, 5, 10] as const

export function Session({ patternId, onPatternChange, onExit }: SessionProps) {
  const reduced = useReducedMotion()
  const pattern = getPattern(patternId)
  const [minutes, setMinutes] = useState<number>(5)
  const [running, setRunning] = useState(true)
  const [done, setDone] = useState(false)
  const cyc = useBreathCycle(pattern, running)

  const target = minutes * 60
  const progress = Math.min(cyc.elapsed / target, 1)

  useEffect(() => {
    if (!done && cyc.elapsed >= target) {
      setDone(true)
      setRunning(false)
    }
  }, [cyc.elapsed, target, done])

  const restart = () => {
    // Remount the cycle by toggling running; elapsed persists in the hook, so
    // for a clean restart we reload the session view via the exit/enter handlers.
    window.location.hash = '#session'
    window.location.reload()
  }

  // Progress ring geometry.
  const R = 178
  const C = 2 * Math.PI * R

  return (
    <main className="grid min-h-screen place-items-center bg-paper-base px-6 py-10">
      <div className="flex w-full max-w-lg flex-col items-center">
        {/* top bar */}
        <div className="mb-8 flex w-full items-center justify-between">
          <span className="font-serif text-lg text-ink">Stillpoint</span>
          <button
            onClick={onExit}
            className="rounded-full px-3 py-1.5 text-sm text-ink-soft hover:text-clay-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50"
          >
            End session
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="font-serif text-3xl text-ink md:text-4xl">
              You took {minutes} minutes<span className="italic text-clay-deep"> for yourself.</span>
            </p>
            <p className="mt-4 text-ink-soft">However you feel now is exactly right.</p>
            <div className="mt-9 flex gap-3">
              <Button onClick={restart}>Breathe again</Button>
              <Button variant="ghost" onClick={onExit}>
                Return home
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* orb + progress ring */}
            <div className="relative grid place-items-center">
              <svg
                aria-hidden
                width={R * 2 + 24}
                height={R * 2 + 24}
                className="absolute -rotate-90"
              >
                <circle
                  cx={R + 12}
                  cy={R + 12}
                  r={R}
                  fill="none"
                  stroke="rgba(42,39,35,0.08)"
                  strokeWidth={2}
                />
                <circle
                  cx={R + 12}
                  cy={R + 12}
                  r={R}
                  fill="none"
                  stroke="#C15F3C"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 240ms linear' }}
                />
              </svg>
              <BreathOrb
                scale={cyc.scale}
                label={running ? cyc.label : 'Paused'}
                phase={running ? cyc.phase : 'idle'}
                reduced={reduced}
                size={260}
              />
            </div>

            {/* controls */}
            <div className="mt-10 flex flex-col items-center gap-5">
              <div className="flex items-center gap-3">
                <Button onClick={() => setRunning((v) => !v)} aria-pressed={running}>
                  {running ? 'Pause' : 'Resume'}
                </Button>
              </div>

              <PatternSelector value={patternId} onChange={onPatternChange} />

              <div role="radiogroup" aria-label="Session length" className="inline-flex gap-1.5">
                {LENGTHS.map((m) => {
                  const active = m === minutes
                  return (
                    <button
                      key={m}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setMinutes(m)}
                      className={cx(
                        'rounded-full px-4 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-base',
                        active ? 'bg-clay text-paper-raised' : 'border border-line text-ink-soft hover:text-ink',
                      )}
                    >
                      {m} min
                    </button>
                  )
                })}
              </div>

              <AmbienceToggle />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
