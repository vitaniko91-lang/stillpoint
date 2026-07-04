import type { CSSProperties } from 'react'

// A page-wide atmosphere that sits gently ABOVE the content: a whisper of film
// grain (warmth, tactile paper feel) plus a few soft warm "light leaks" drifting
// in the margins. Fixed + pointer-events-none, kept very faint and edge-biased so
// it never touches readability. Motes freeze under prefers-reduced-motion.

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const MOTES: { cls: string; style: CSSProperties }[] = [
  { cls: 'drift-a', style: { top: '16%', left: '-4%', width: '15rem', height: '15rem', background: 'radial-gradient(circle, rgba(216,138,106,0.16), transparent 70%)' } },
  { cls: 'drift-c', style: { top: '46%', left: '88%', width: '17rem', height: '17rem', background: 'radial-gradient(circle, rgba(232,205,170,0.2), transparent 70%)' } },
  { cls: 'drift-b', style: { top: '80%', left: '-2%', width: '13rem', height: '13rem', background: 'radial-gradient(circle, rgba(193,95,60,0.12), transparent 72%)' } },
]

export function PageAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {MOTES.map((m, i) => (
        <div key={i} className={`${m.cls} absolute rounded-full blur-3xl`} style={m.style} />
      ))}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
      />
    </div>
  )
}
