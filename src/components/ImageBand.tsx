import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { LineReveal } from './LineReveal'
import { Container } from './Container'
import { useReducedMotion } from '../lib/useReducedMotion'
import { cx } from '../lib/cx'

interface ImageBandProps {
  src: string
  alt: string
  lines: ReactNode[]
  /** Overlay + text treatment. `dark` = warm-dark scrim, light text. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * A full-bleed photographic band — the page's breath of real imagery. The photo
 * parallaxes gently within an over-sized frame as you scroll (transform only),
 * under a warm scrim that keeps the masked-reveal line legible. Below the fold,
 * so the image lazy-loads and never competes with the hero's LCP.
 */
export function ImageBand({ src, alt, lines, tone = 'dark', className }: ImageBandProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const scrim =
    tone === 'dark'
      ? 'linear-gradient(180deg, rgba(30,22,17,0.55), rgba(30,22,17,0.42) 45%, rgba(30,22,17,0.6))'
      : 'linear-gradient(180deg, rgba(246,241,233,0.28), rgba(246,241,233,0.12) 45%, rgba(246,241,233,0.4))'

  return (
    <section ref={ref} className={cx('relative flex items-center overflow-hidden py-40 md:py-52', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover"
        style={reduced ? undefined : { y }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: scrim }} />
      <Container className="relative z-10">
        <LineReveal
          as="h2"
          className={cx(
            'mx-auto max-w-3xl text-center font-serif leading-[1.12] text-[2.2rem] md:text-5xl',
            tone === 'dark' ? 'text-paper-base' : 'text-ink',
          )}
          lines={lines}
        />
      </Container>
    </section>
  )
}
