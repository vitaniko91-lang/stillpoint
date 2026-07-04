import { Container } from '../components/Container'

interface NavProps {
  onStartSession: () => void
}

export function Nav({ onStartSession }: NavProps) {
  return (
    <nav className="absolute inset-x-0 top-0 z-20">
      <Container className="flex items-center justify-between py-6">
        <a href="#top" className="font-serif text-xl text-ink">
          Stillpoint
        </a>
        <div className="flex items-center gap-6 text-sm text-ink-soft">
          <a href="#patterns" className="hidden hover:text-clay-deep sm:inline">
            Patterns
          </a>
          <a href="#how" className="hidden hover:text-clay-deep sm:inline">
            How it feels
          </a>
          <a href="#pricing" className="hidden hover:text-clay-deep sm:inline">
            Pricing
          </a>
          <button
            onClick={onStartSession}
            className="rounded-full border border-line-strong px-4 py-1.5 text-ink transition-colors duration-200 hover:border-clay hover:text-clay-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-base"
          >
            Start a session
          </button>
        </div>
      </Container>
    </nav>
  )
}
