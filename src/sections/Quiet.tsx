import { ImageBand } from '../components/ImageBand'
import sunrise from '../assets/sunrise-water.jpg'

/**
 * The light→dark inversion, now a photographic breath: calm water at sunrise,
 * one slow line over a warm scrim. The emotional low point of the scroll —
 * still, wide, unhurried.
 */
export function Quiet() {
  return (
    <ImageBand
      src={sunrise}
      alt="Calm water at sunrise, faint ripples spreading toward a hazy far shore"
      tone="dark"
      lines={[
        'Nothing to fix.',
        <span key="l2" className="italic text-clay-soft">
          Nowhere to be.
        </span>,
        'Only this breath.',
      ]}
    />
  )
}
