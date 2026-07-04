import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.95rem] ' +
  'font-medium transition-colors duration-200 focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper-base disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-clay text-paper-raised hover:bg-clay-soft',
  ghost: 'border border-line-strong text-ink hover:border-clay hover:text-clay-deep',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
