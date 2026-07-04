import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Stillpoint — warm, airy, calm. Light paper ground + soft ink + ONE
        // clay/terracotta accent, held. Deliberate OPPOSITE of the dark-premium
        // default (Relay/Ollama/PRAXIS). NO dark base, NO green, NO amber.
        paper: {
          base: '#F6F1E9', // page — warm bone / sand
          raised: '#FBF8F2', // cards / raised surfaces (lighter)
          sink: '#EFE8DC', // quiet inset bands
        },
        ink: {
          DEFAULT: '#2A2723', // primary text — warm near-black (never pure black)
          soft: '#5A5349', // secondary text (AA on every paper surface)
          faint: '#726A5E', // captions / eyebrows (>= 4.5:1 on base/sink/raised)
        },
        // THE accent — one terracotta, held. `deep` for small text/CTA labels to
        // clear WCAG AA on light paper; `DEFAULT`/`glow` for the orb + decorative marks.
        clay: {
          DEFAULT: '#C15F3C', // marks, the breathing orb, CTA fill
          soft: '#D98A6A', // hover / lighter
          deep: '#9C4426', // links / small accent text on paper (AA)
          glow: 'rgba(193,95,60,0.16)', // the orb's warm halo
        },
        line: {
          DEFAULT: 'rgba(42,39,35,0.10)', // hairline rules / borders
          strong: 'rgba(42,39,35,0.18)',
        },
      },
      fontFamily: {
        // Calm literary serif for the hero + display lines.
        serif: ['Newsreader', 'Georgia', 'serif'],
        // Warm friendly humanist for body / UI (un-clinical).
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1160px',
      },
      keyframes: {
        // A gentle idle drift for the halo when the orb is at rest (non-essential;
        // disabled under prefers-reduced-motion via a utility guard in index.css).
        haze: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        haze: 'haze 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
