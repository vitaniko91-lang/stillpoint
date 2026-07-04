import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Container } from './Container'

type Surface = 'base' | 'raised' | 'sink'

const surface: Record<Surface, string> = {
  base: 'bg-paper-base',
  raised: 'bg-paper-raised',
  sink: 'bg-paper-sink',
}

interface SectionProps {
  id?: string
  /** Paper surface; `base` is transparent-feeling page, `sink` a quiet inset band. */
  bg?: Surface
  className?: string
  children: ReactNode
  /**
   * Skip the default Container so children own the full bleed — for asymmetric
   * editorial layouts that intentionally break the grid (full-bleed bands,
   * split panels, pinned moments).
   */
  bleed?: boolean
  /** Extra classes for the inner Container (ignored when `bleed`). */
  containerClassName?: string
}

/**
 * Editorial section shell: semantic <section>, generous vertical rhythm, and an
 * opt-in paper surface. `relative` so a section can host its own decorative or
 * pinned children. Content sits in the wide Container unless `bleed`.
 */
export function Section({
  id,
  bg = 'base',
  className,
  children,
  bleed = false,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(
        'relative py-24 md:py-32',
        bg !== 'base' && surface[bg],
        className,
      )}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
