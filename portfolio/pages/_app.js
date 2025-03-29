
// Variables
import siteVariables from '@/variables/site-variables.json'

// Bootstrap
import '@/node_modules/bootstrap/dist/css/bootstrap.css'

// Global styles
import '@/styles/globals.scss'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react';
import { Analytics } from'@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {

  useEffect(()=>{
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
  },[])
  
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
      <ThemeProvider>
        <Component {...pageProps} key={router.asPath} siteVariables={siteVariables} session={session} />
        <Analytics />
      </ThemeProvider>
    </AnimatePresence>
  )
}