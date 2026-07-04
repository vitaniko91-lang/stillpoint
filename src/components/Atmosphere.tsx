import { cx } from '../lib/cx'

/**
 * A living warm aura — a few heavily-blurred gradient blobs that drift slowly on
 * their own phases, so the light behind the hero never sits still or repeats
 * obviously. transform/opacity only; frozen under prefers-reduced-motion (via
 * the drift-* utilities in index.css). Purely decorative.
 */
export function Atmosphere({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="drift-a absolute -right-10 top-4 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(216,138,106,0.55), transparent 66%)' }}
      />
      <div
        className="drift-b absolute right-24 top-40 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(232,205,170,0.7), transparent 68%)' }}
      />
      <div
        className="drift-c absolute right-40 -top-8 h-[18rem] w-[18rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(193,95,60,0.32), transparent 70%)' }}
      />
    </div>
  )
}
