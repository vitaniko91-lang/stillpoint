import { LineReveal } from '../components/LineReveal'
import { Container } from '../components/Container'

/**
 * The single light→dark inversion — an editorial breath of contrast between the
 * airy sections. A deep, warm ground; one calm line, revealed slowly. Kept
 * spacious and still so the contrast reads as depth, not drama.
 */
export function Quiet() {
  return (
    <section className="relative overflow-hidden bg-[#241C16] py-32 md:py-44">
      {/* faint warm glow, top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(193,95,60,0.18), transparent 70%)',
        }}
      />
      <Container>
        <LineReveal
          as="h2"
          className="mx-auto max-w-3xl text-center font-serif text-[2.4rem] leading-[1.12] text-paper-base md:text-5xl"
          lines={[
            'Nothing to fix.',
            <span key="l2" className="italic text-clay-soft">
              Nowhere to be.
            </span>,
            'Only this breath.',
          ]}
        />
      </Container>
    </section>
  )
}
