// Breath patterns — the single source of truth for timing, shared by the orb,
// the cycle engine, and the pattern selector. Durations are in seconds; a phase
// with 0 seconds is omitted from the cycle.

export type Phase = 'inhale' | 'holdTop' | 'exhale' | 'holdBottom'

export interface PhaseStep {
  phase: Phase
  seconds: number
  /** Guidance shown + announced (aria-live) while this phase is active. */
  label: string
}

export interface BreathPattern {
  id: string
  name: string
  /** One calm line describing what it's for. */
  tagline: string
  steps: PhaseStep[]
  /** Total length of one full breath cycle, in seconds. */
  cycleSeconds: number
}

const LABEL: Record<Phase, string> = {
  inhale: 'Breathe in',
  holdTop: 'Hold',
  exhale: 'Breathe out',
  holdBottom: 'Hold',
}

/** Build a pattern from a phase→seconds map, dropping zero-length phases. */
function makePattern(
  id: string,
  name: string,
  tagline: string,
  durations: Record<Phase, number>,
): BreathPattern {
  const order: Phase[] = ['inhale', 'holdTop', 'exhale', 'holdBottom']
  const steps: PhaseStep[] = order
    .filter((phase) => durations[phase] > 0)
    .map((phase) => ({ phase, seconds: durations[phase], label: LABEL[phase] }))
  const cycleSeconds = steps.reduce((sum, s) => sum + s.seconds, 0)
  return { id, name, tagline, steps, cycleSeconds }
}

export const PATTERNS: BreathPattern[] = [
  makePattern('coherence', 'Coherence', 'Even, balanced breathing to settle the nervous system.', {
    inhale: 5.5,
    holdTop: 0,
    exhale: 5.5,
    holdBottom: 0,
  }),
  makePattern('box', 'Box', 'Four equal counts — steady, grounding, focused.', {
    inhale: 4,
    holdTop: 4,
    exhale: 4,
    holdBottom: 4,
  }),
  makePattern('478', '4-7-8', 'A long exhale to wind down toward rest.', {
    inhale: 4,
    holdTop: 7,
    exhale: 8,
    holdBottom: 0,
  }),
]

export const DEFAULT_PATTERN_ID = 'coherence'

export function getPattern(id: string): BreathPattern {
  return PATTERNS.find((p) => p.id === id) ?? PATTERNS[0]
}
