import { useEffect, useState } from 'react'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Patterns } from './sections/Patterns'
import { HowItFeels } from './sections/HowItFeels'
import { Quiet } from './sections/Quiet'
import { Ambience } from './sections/Ambience'
import { Pricing } from './sections/Pricing'
import { Footer } from './sections/Footer'
import { Session } from './pages/Session'
import { DEFAULT_PATTERN_ID } from './data/patterns'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './lib/useReducedMotion'

type View = 'landing' | 'session'

function currentView(): View {
  return typeof window !== 'undefined' && window.location.hash === '#session' ? 'session' : 'landing'
}

export default function App() {
  const [patternId, setPatternId] = useState<string>(DEFAULT_PATTERN_ID)
  const [view, setView] = useState<View>(currentView)
  const reduced = useReducedMotion()

  useLenis(view === 'landing' && !reduced)

  useEffect(() => {
    const onHash = () => setView(currentView())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goSession = () => {
    window.location.hash = '#session'
    setView('session')
    window.scrollTo(0, 0)
  }
  const goHome = () => {
    if (window.location.hash) window.location.hash = ''
    setView('landing')
  }

  if (view === 'session') {
    return <Session patternId={patternId} onPatternChange={setPatternId} onExit={goHome} />
  }

  return (
    <>
      <Nav onStartSession={goSession} />
      <Hero patternId={patternId} onPatternChange={setPatternId} onStartSession={goSession} />
      <Patterns value={patternId} onChange={setPatternId} />
      <HowItFeels />
      <Quiet />
      <Ambience />
      <Pricing onStartSession={goSession} />
      <Footer onStartSession={goSession} />
    </>
  )
}
