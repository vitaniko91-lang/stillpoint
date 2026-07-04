import { Container } from '../components/Container'
import { Button } from '../components/Button'

interface FooterProps {
  onStartSession: () => void
}

export function Footer({ onStartSession }: FooterProps) {
  return (
    <footer className="border-t border-line bg-paper-sink py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="font-serif text-3xl italic text-ink md:text-4xl">Breathe well.</p>
          <div className="mt-8">
            <Button onClick={onStartSession}>Start a session</Button>
          </div>

          <div className="mt-14 flex w-full flex-col items-center gap-3 border-t border-line pt-8 text-sm text-ink-faint md:flex-row md:justify-between">
            <span>Stillpoint — a calm concept, designed &amp; built by Vitalina Nikulina.</span>
            <a
              href="https://vitaniko91-lang.github.io"
              className="hover:text-clay-deep"
              target="_blank"
              rel="noreferrer"
            >
              vitaniko91-lang.github.io
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
