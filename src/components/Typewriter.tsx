import type { ReactNode } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { cx } from '../lib/cx'

/**
 * A rotating-word line rendered in Stillpoint's voice: a serif italic clay word
 * that types and deletes behind a soft caret. The animated text is aria-hidden
 * and paired with an sr-only complete sentence, so assistive tech reads one
 * calm line instead of every keystroke.
 */
export function Typewriter({
  words,
  prefix,
  srLine,
  reduced,
  className,
  wordClassName,
}: {
  words: string[]
  prefix?: ReactNode
  srLine: string
  reduced: boolean
  className?: string
  wordClassName?: string
}) {
  const text = useTypewriter({ words, enabled: !reduced })

  return (
    <p className={className}>
      <span aria-hidden="true">
        {prefix}
        <span className={cx('italic', wordClassName)}>{text}</span>
        <span className="tw-caret" aria-hidden="true" />
      </span>
      <span className="sr-only">{srLine}</span>
    </p>
  )
}
