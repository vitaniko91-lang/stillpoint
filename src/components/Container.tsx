import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Editorial measure: a wide, generous centered column with progressively
 * larger side gutters. The gutters are deliberately roomy so the "living
 * margin" contours have paper to breathe in on either side of the content.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx('mx-auto w-full max-w-content px-6 md:px-12 lg:px-20', className)}>
      {children}
    </div>
  )
}
