import { useEffect, useRef, useState } from 'react'
import type { BreathPattern, Phase } from '../data/patterns'

// The breath cycle: maps elapsed time onto a pattern's phases and an eased
// orb scale. `cycleState` is a pure function (fully testable, no timers); the
// hook drives `elapsed` with requestAnimationFrame while `running`, and pauses
// naturally by stopping the loop (elapsed is preserved across pause/resume and
// across pattern changes for a continuous, calm feel).

export const MIN_SCALE = 0.62
export const MAX_SCALE = 1

export interface CycleState {
  phase: Phase
  /** Guidance copy for the active phase ("Breathe in" / "Hold" / "Breathe out"). */
  label: string
  /** Orb scale, MIN_SCALE..MAX_SCALE (the visual consumer may ignore under reduced motion). */
  scale: number
  /** 0..1 progress within the current phase. */
  phaseProgress: number
  /** 0..1 progress within the full breath cycle. */
  cycleProgress: number
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

function scaleFor(phase: Phase, p: number): number {
  const span = MAX_SCALE - MIN_SCALE
  switch (phase) {
    case 'inhale':
      return MIN_SCALE + span * easeInOut(p)
    case 'exhale':
      return MAX_SCALE - span * easeInOut(p)
    case 'holdTop':
      return MAX_SCALE
    case 'holdBottom':
      return MIN_SCALE
  }
}

/** Pure: where are we in the breath at `elapsedSeconds`? */
export function cycleState(pattern: BreathPattern, elapsedSeconds: number): CycleState {
  const cycle = pattern.cycleSeconds
  // Wrap into [0, cycle), tolerating negative input.
  const tInCycle = ((elapsedSeconds % cycle) + cycle) % cycle
  let acc = 0
  for (const step of pattern.steps) {
    const end = acc + step.seconds
    if (tInCycle < end) {
      const phaseProgress = clamp01((tInCycle - acc) / step.seconds)
      return {
        phase: step.phase,
        label: step.label,
        scale: scaleFor(step.phase, phaseProgress),
        phaseProgress,
        cycleProgress: tInCycle / cycle,
      }
    }
    acc = end
  }
  // Reached only at tInCycle === cycle (floating-point edge): treat as end of last step.
  const last = pattern.steps[pattern.steps.length - 1]
  return {
    phase: last.phase,
    label: last.label,
    scale: scaleFor(last.phase, 1),
    phaseProgress: 1,
    cycleProgress: 1,
  }
}

export interface UseBreathCycle extends CycleState {
  /** Total elapsed seconds since the session began (persists across pause). */
  elapsed: number
}

export function useBreathCycle(pattern: BreathPattern, running: boolean): UseBreathCycle {
  const [elapsed, setElapsed] = useState(0)
  const elapsedRef = useRef(0)

  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      elapsedRef.current += (now - last) / 1000
      last = now
      setElapsed(elapsedRef.current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [running])

  return { ...cycleState(pattern, elapsed), elapsed }
}
