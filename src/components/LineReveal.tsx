import { useRef, type ElementType, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../lib/useReducedMotion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div'

interface LineRevealProps {
  /** Each entry is one visual line — a string or rich nodes (e.g. an italic span). */
  lines: ReactNode[]
  as?: Tag
  className?: string
  /** Delay before the first line rises, seconds. */
  delay?: number
  /** Gap between consecutive lines, seconds. */
  stagger?: number
}

// A soft, slow ease-out — the calm counterpart to Vintage's kinetic reveals.
const EASE = [0.19, 1, 0.22, 1] as const

/**
 * Masked line-by-line reveal — the signature editorial motion, adapted calm.
 * Each line sits in an `overflow-hidden` clip and rises from below on enter.
 * Reduced motion → lines render in place (no transform, no clip animation).
 * Extra bottom padding on the clip keeps serif descenders from being cut.
 */
export function LineReveal({ lines, as = 'div', className, delay = 0, stagger = 0.11 }: LineRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = reduced || inView
  const Tag = as as ElementType

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: '115%' }}
            animate={show ? { y: '0%' } : { y: '115%' }}
            transition={{ duration: 0.95, ease: EASE, delay: reduced ? 0 : delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
