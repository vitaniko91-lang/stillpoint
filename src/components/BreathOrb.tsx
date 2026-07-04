import type { Phase } from '../data/patterns'
import { cx } from '../lib/cx'

interface BreathOrbProps {
  /** Orb scale (MIN_SCALE..MAX_SCALE); ignored visually under reduced motion. */
  scale: number
  /** Guidance copy shown inside the orb ("Breathe in" / "Hold" / "Breathe out" / "Breathe"). */
  label: string
  phase: Phase | 'idle'
  /** When true, the orb holds still and the label carries the breathing instead. */
  reduced: boolean
  /** Diameter in px of the resting circle. Default 280. */
  size?: number
  className?: string
}

const REST = 0.82 // held scale used when reduced motion is on

/**
 * The breathing orb — Stillpoint's signature moment.
 *
 * Motion is `transform: scale` + `opacity` only (compositor-friendly, 60fps).
 * Under `reduced`, the circle does NOT scale; the guidance label + an aria-live
 * region carry the breathing instead — a real calmer variant, not "off".
 * The visual is decorative (`aria-hidden`); meaning lives in the live region.
 */
export function BreathOrb({ scale, label, phase, reduced, size = 280, className }: BreathOrbProps) {
  const applied = reduced ? REST : scale

  return (
    <div
      className={cx('relative grid place-items-center', className)}
      style={{ width: size * 1.55, height: size * 1.55 }}
    >
      {/* Warm clay halo — breathes with the orb (opacity tracks scale) unless reduced. */}
      <div
        aria-hidden
        className={cx(
          'absolute rounded-full blur-2xl',
          reduced && 'animate-haze',
        )}
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 50% 50%, rgba(193,95,60,0.34), rgba(193,95,60,0.10) 55%, transparent 72%)',
          transform: `scale(${applied * 1.28})`,
          opacity: reduced ? 0.9 : 0.55 + (applied - 0.62) * 1.1,
          transition: reduced ? 'none' : 'transform 120ms linear, opacity 120ms linear',
          willChange: reduced ? undefined : 'transform, opacity',
        }}
      />

      {/* The orb itself — a soft warm disc with a faint ring. */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 42% 38%, #FBF8F2, #F3E7DC 46%, #E9D3C4 78%, #E2C6B4)',
          boxShadow:
            'inset 0 2px 24px rgba(255,255,255,0.7), inset 0 -8px 30px rgba(193,95,60,0.14), 0 18px 60px rgba(120,60,40,0.12)',
          transform: `scale(${applied})`,
          transition: reduced ? 'none' : 'transform 120ms linear',
          willChange: reduced ? undefined : 'transform',
        }}
      />

      {/* Guidance label — sits still at the centre while the orb breathes behind it. */}
      <p
        className="relative z-10 select-none font-serif text-2xl md:text-3xl text-ink/85"
        aria-hidden
      >
        {label}
      </p>

      {/* Accessible phase announcement (polite, so it never interrupts). */}
      <span className="sr-only" aria-live="polite">
        {phase === 'idle' ? '' : label}
      </span>
    </div>
  )
}
