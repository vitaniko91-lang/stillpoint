import { useEffect, useRef, useState } from 'react'
import { cx } from '../lib/cx'

// A gentle ambient pad, synthesised in-browser with the Web Audio API — no
// audio file, zero asset weight. Built lazily on first enable (so no
// AudioContext exists until the user opts in, respecting autoplay policy and
// keeping the page silent by default). Very quiet: a soft, slow, warm drone.

interface Graph {
  ctx: AudioContext
  master: GainNode
  stop: () => void
}

const TARGET_GAIN = 0.13

function buildGraph(): Graph {
  const Ctor: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new Ctor()

  const master = ctx.createGain()
  master.gain.value = 0 // fade in after connect
  master.connect(ctx.destination)

  // Warmth: a low-pass smooths the oscillators into a pad. Cutoff sits high
  // enough that the chord actually reads on laptop speakers, not just subwoofers.
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 950
  filter.Q.value = 0.4
  filter.connect(master)

  // A calm chord: root, fifth, octave (A3 · E4 · A4) — a register you can
  // actually hear, slightly detuned for a living beat.
  const freqs = [220, 329.63, 440]
  const oscs = freqs.map((f, i) => {
    const osc = ctx.createOscillator()
    osc.type = i === 2 ? 'triangle' : 'sine'
    osc.frequency.value = f
    osc.detune.value = i * 4 - 4
    const g = ctx.createGain()
    g.gain.value = i === 0 ? 0.6 : 0.32
    osc.connect(g)
    g.connect(filter)
    osc.start()
    return osc
  })

  // A slow LFO breathes the filter cutoff for gentle, non-repetitive movement.
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.06
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 260
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start()

  const stop = () => {
    oscs.forEach((o) => o.stop())
    lfo.stop()
    ctx.close()
  }

  return { ctx, master, stop }
}

export function AmbienceToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false)
  const graphRef = useRef<Graph | null>(null)

  // Ramp master gain toward the target when on, toward silence when off.
  useEffect(() => {
    const graph = graphRef.current
    if (!graph) return
    const now = graph.ctx.currentTime
    graph.master.gain.cancelScheduledValues(now)
    graph.master.gain.setValueAtTime(graph.master.gain.value, now)
    graph.master.gain.linearRampToValueAtTime(on ? TARGET_GAIN : 0, now + 1.4)
  }, [on])

  // Tear the graph down on unmount.
  useEffect(() => () => graphRef.current?.stop(), [])

  const toggle = () => {
    if (!graphRef.current) graphRef.current = buildGraph()
    void graphRef.current.ctx.resume()
    setOn((v) => !v)
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className={cx(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-base',
        on ? 'border-clay text-clay-deep' : 'border-line text-ink-soft hover:text-ink',
        className,
      )}
    >
      <span aria-hidden className="text-base leading-none">
        {on ? '♪' : '♪'}
      </span>
      Ambience {on ? 'on' : 'off'}
    </button>
  )
}
