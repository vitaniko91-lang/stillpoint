import { describe, expect, it } from 'vitest'
import { cycleState, MIN_SCALE, MAX_SCALE } from './useBreathCycle'
import { getPattern } from '../data/patterns'

const box = getPattern('box') // 4·4·4·4, cycle 16s
const coherence = getPattern('coherence') // 5.5 in / 5.5 out, cycle 11s

describe('cycleState', () => {
  it('starts an inhale at the bottom of the breath', () => {
    const s = cycleState(box, 0)
    expect(s.phase).toBe('inhale')
    expect(s.label).toBe('Breathe in')
    expect(s.scale).toBeCloseTo(MIN_SCALE, 5)
  })

  it('reaches full expansion at the end of the inhale', () => {
    const s = cycleState(box, 4 - 1e-6)
    expect(s.phase).toBe('inhale')
    expect(s.scale).toBeCloseTo(MAX_SCALE, 3)
  })

  it('holds fully expanded during holdTop', () => {
    const s = cycleState(box, 6) // 2s into the top hold
    expect(s.phase).toBe('holdTop')
    expect(s.scale).toBeCloseTo(MAX_SCALE, 5)
  })

  it('contracts during the exhale', () => {
    const s = cycleState(box, 8) // start of exhale
    expect(s.phase).toBe('exhale')
    expect(s.scale).toBeCloseTo(MAX_SCALE, 3)
    const mid = cycleState(box, 10) // middle of exhale
    expect(mid.scale).toBeLessThan(MAX_SCALE)
    expect(mid.scale).toBeGreaterThan(MIN_SCALE)
  })

  it('rests contracted during holdBottom', () => {
    const s = cycleState(box, 14) // 2s into bottom hold
    expect(s.phase).toBe('holdBottom')
    expect(s.scale).toBeCloseTo(MIN_SCALE, 5)
  })

  it('wraps cleanly to the next cycle', () => {
    const s0 = cycleState(box, 0)
    const s16 = cycleState(box, 16) // one full cycle later
    expect(s16.phase).toBe(s0.phase)
    expect(s16.scale).toBeCloseTo(s0.scale, 5)
  })

  it('has no hold phases for coherence (inhale straight to exhale)', () => {
    expect(coherence.steps.map((s) => s.phase)).toEqual(['inhale', 'exhale'])
    const atInhaleEnd = cycleState(coherence, 5.5)
    expect(atInhaleEnd.phase).toBe('exhale')
  })

  it('keeps scale within bounds across the whole cycle', () => {
    for (let t = 0; t < box.cycleSeconds; t += 0.25) {
      const s = cycleState(box, t)
      expect(s.scale).toBeGreaterThanOrEqual(MIN_SCALE - 1e-9)
      expect(s.scale).toBeLessThanOrEqual(MAX_SCALE + 1e-9)
    }
  })
})
