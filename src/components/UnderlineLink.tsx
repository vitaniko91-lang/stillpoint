import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'

interface UnderlineLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

/**
 * A link whose clay underline draws in from the left on hover/focus (scaleX).
 * transform-only, so it stays smooth; the target size is unaffected. Under
 * reduced motion the underline still appears — it simply doesn't animate the draw.
 */
export function UnderlineLink({ className, children, ...props }: UnderlineLinkProps) {
  return (
    <a
      className={cx(
        'group relative inline-block text-ink-soft transition-colors duration-200 hover:text-clay-deep',
        'focus-visible:outline-none focus-visible:text-clay-deep',
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cx(
          'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-clay',
          'transition-transform duration-300 ease-out',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
          'motion-reduce:transition-none',
        )}
      />
    </a>
  )
}
