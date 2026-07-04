import { ImageBand } from '../components/ImageBand'
import misty from '../assets/misty-lake.jpg'

/**
 * An early photographic breath — a still lake under golden mist. One line,
 * lightly held, to slow the scroll before the patterns give way to feeling.
 */
export function Interlude() {
  return (
    <ImageBand
      src={misty}
      alt="A still mountain lake at golden hour, mist softening the far hills"
      tone="dark"
      lines={[
        <span key="l1" className="italic">
          The world exhales, too.
        </span>,
      ]}
    />
  )
}
