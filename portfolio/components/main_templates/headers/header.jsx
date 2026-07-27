import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    return () => { document.body.style.overflow = '' }
  }, [isMobileNavOpen])

  const closeNav = () => setIsMobileNavOpen(false)

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMobileNavOpen ? styles.open : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.brand} aria-label="Trevor Gibby home" onClick={closeNav}>
          <img src="/logos/insignia-1.png" alt="" aria-hidden="true" />
          <span>
            <strong>Trevor Gibby</strong>
            <small>Full Stack Engineer</small>
          </span>
        </Link>

        <nav id="mobile-navigation" className={styles.nav} aria-label="Primary navigation">
          <ul>
            {mainNavPages.map((page) => (
              <li key={page.slug}>
                <a href={page.slug} onClick={closeNav}>{page.title}</a>
              </li>
            ))}
            <li className={styles.mobileOnly}>
              <Link href="/blog" onClick={closeNav}>Writing</Link>
            </li>
            <li className={styles.mobileOnly}>
              <a href={siteVariables.resume} target="_blank" rel="noopener noreferrer" onClick={closeNav}>Résumé</a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.resume} href={siteVariables.resume} target="_blank" rel="noopener noreferrer">
            Résumé <span aria-hidden="true">↗</span>
          </a>
          <button type="button" className="btn btn-primary" onClick={showModal}>Let&apos;s talk</button>
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
