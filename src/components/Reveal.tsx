import { useRef, type ElementType, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

type Tag = 'div' | 'section' | 'li' | 'span' | 'p'

interface RevealProps {
  children: ReactNode
  as?: Tag
  className?: string
  delay?: number
}

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Editorial entrance: opacity + a short rise (16px) when scrolled into view.
 * Reduced motion → rendered in its final state instantly (no transform).
 */
export function Reveal({ children, as = 'div', className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const show = reduced || inView
  // Polymorphic motion tag — cast to ElementType for a single permissive ref signature.
  const Tag = motion[as] as ElementType

  return (
    <Tag
      ref={ref}
      className={cx(className)}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
