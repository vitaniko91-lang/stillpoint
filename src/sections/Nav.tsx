import { Container } from '../components/Container'
import { UnderlineLink } from '../components/UnderlineLink'

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
          <UnderlineLink href="#patterns" className="hidden sm:inline">
            Patterns
          </UnderlineLink>
          <UnderlineLink href="#how" className="hidden sm:inline">
            How it feels
          </UnderlineLink>
          <UnderlineLink href="#pricing" className="hidden sm:inline">
            Pricing
          </UnderlineLink>
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
