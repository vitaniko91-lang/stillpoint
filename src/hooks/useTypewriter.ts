import { useEffect, useState } from 'react'

interface Options {
  words: string[]
  typeMs?: number // per-character typing
  deleteMs?: number // per-character deleting
  holdMs?: number // how long a finished word rests
  pauseMs?: number // blank pause before the next word
  startMs?: number // initial delay before the first word types
  enabled?: boolean // false → first word shown statically (reduced motion)
}

/**
 * A calm rotating-word typewriter. Types a word, holds it, deletes it, moves to
 * the next. Timing is gentler than a terminal effect so it fits a breathwork
 * page. When `enabled` is false (reduced motion) it simply shows the first word
 * in full — no timers, no motion.
 */
export function useTypewriter({
  words,
  typeMs = 95,
  deleteMs = 45,
  holdMs = 2200,
  pauseMs = 550,
  startMs = 900,
  enabled = true,
}: Options): string {
  const [text, setText] = useState(enabled ? '' : words[0])

  useEffect(() => {
    if (!enabled) {
      setText(words[0])
      return
    }
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>
    let wordIndex = 0
    let charIndex = 0
    let deleting = false

    const tick = () => {
      if (cancelled) return
      const word = words[wordIndex]
      if (!deleting) {
        charIndex += 1
        setText(word.slice(0, charIndex))
        if (charIndex === word.length) {
          deleting = true
          timeout = setTimeout(tick, holdMs)
          return
        }
        timeout = setTimeout(tick, typeMs)
      } else {
        charIndex -= 1
        setText(word.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          timeout = setTimeout(tick, pauseMs)
          return
        }
        timeout = setTimeout(tick, deleteMs)
      }
    }

    timeout = setTimeout(tick, startMs)
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [enabled, words, typeMs, deleteMs, holdMs, pauseMs, startMs])

  return text
}
