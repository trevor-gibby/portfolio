
// Variables
import siteVariables from '@/variables/site-variables.json'

// Global styles
import '@/styles/globals.scss'

import { useEffect, useState } from 'react'
import { Analytics } from'@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  useEffect(() => {
    setAnalyticsEnabled(!['localhost', '127.0.0.1'].includes(window.location.hostname))
  }, [])

  useEffect(() => {
    if (document.querySelector('[data-portfolio-fonts]')) return

    const fontStylesheet = document.createElement('link')
    fontStylesheet.rel = 'stylesheet'
    fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@700;800&family=Space+Grotesk:wght@500&display=swap'
    fontStylesheet.dataset.portfolioFonts = 'true'
    document.head.appendChild(fontStylesheet)
  }, [])
  
  // Hit session api route  to get session to pass to Component
  const [session, setSession] = useState(null)
  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((session) => {
        if (session) {
          setSession(session)
        }
      })
  }, [])


  const router = useRouter()

  return (
    <AnimatePresence 
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <>
        <Component {...pageProps} key={router.asPath} siteVariables={siteVariables} session={session} />
        {analyticsEnabled && <Analytics />}
      </>
    </AnimatePresence>
  )
}
