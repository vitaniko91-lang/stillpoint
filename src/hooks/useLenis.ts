import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Momentum smooth-scroll (Lenis) for the landing — the premium, considered feel
 * from award-studio sites. Only enabled when `enabled` (landing view AND the
 * user does not prefer reduced motion); native scrolling is left untouched
 * otherwise. The RAF loop and instance are torn down on disable/unmount.
 */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      duration: 1.1,
      // Gentle exponential ease-out — calm, not springy.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}
