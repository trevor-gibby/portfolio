import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics/react'

import { showModal } from '@/components/content_widgets/contact-modal/contact-modal'
import defaultPages from '@/variables/pages.json'
import siteVariables from '@/variables/site-variables.json'

import styles from './header.module.scss'

export default function Header({ pages = defaultPages }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mainNavPages = pages.filter((page) => page.showInMainNav)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? 'hidden' : ''
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMobileNavOpen(false)
    }

    if (isMobileNavOpen) document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileNavOpen])

  const closeNav = () => setIsMobileNavOpen(false)

  const trackOutbound = (page) => {
    if (page.openInNewTab) track('Outbound Link Click', { destination: page.title })
    closeNav()
  }

  const openContact = () => {
    closeNav()
    track('Contact Click', { location: 'header' })
    showModal()
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMobileNavOpen ? styles.open : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.brand} aria-label="Trevor Gibby home" onClick={closeNav}>
          <Image src="/logos/insignia-1.png" alt="" aria-hidden="true" width={291} height={290} priority sizes="44px" />
          <span>
            <strong>Trevor Gibby</strong>
            <small>Senior Full-Stack Engineer</small>
          </span>
        </Link>

        <nav id="mobile-navigation" className={styles.nav} aria-label="Primary navigation">
          <ul>
            {mainNavPages.map((page) => (
              <li key={page.slug}>
                {page.openInNewTab ? (
                  <a href={page.slug} target="_blank" rel="noopener noreferrer" onClick={() => trackOutbound(page)}>
                    {page.title}
                  </a>
                ) : (
                  <Link href={page.slug} onClick={closeNav}>{page.title}</Link>
                )}
              </li>
            ))}
            <li className={styles.mobileOnly}>
              <a href={siteVariables.resume} target="_blank" rel="noopener noreferrer" onClick={() => track('Resume Click', { location: 'mobile_nav' })}>Résumé</a>
            </li>
            <li className={styles.mobileOnly}>
              <button type="button" className={styles.navButton} onClick={openContact}>Contact</button>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.resume} href={siteVariables.resume} target="_blank" rel="noopener noreferrer" onClick={() => track('Resume Click', { location: 'header' })}>
            Résumé <span aria-hidden="true">↗</span>
          </a>
          <button type="button" className="btn btn-primary" onClick={openContact}>Contact</button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileNavOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
