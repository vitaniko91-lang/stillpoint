import { cx } from '../lib/cx'

/**
 * Soft concentric rings — ripples from the breath. A calm, organic counterpart
 * to Vintage's sharp geometric watermark: faint clay circles that add depth
 * behind the orb and parallax gently on scroll. Purely decorative.
 */
export function Ornament({ className, count = 6 }: { className?: string; count?: number }) {
  const rings = Array.from({ length: count }, (_, i) => 40 + i * ((240 - 40) / (count - 1)))
  return (
    <svg
      aria-hidden
      viewBox="0 0 500 500"
      className={cx('pointer-events-none select-none', className)}
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={i}
          cx="250"
          cy="250"
          r={r}
          stroke="#C15F3C"
          strokeWidth={1}
          opacity={0.06 + (1 - i / count) * 0.05}
        />
      ))}
    </svg>
  )
}
