
import Image from 'next/image'
import Link from 'next/link'

import ContactModal, { showModal, hideModal } from '@/components/content_widgets/contact-modal/contact-modal'

import styles from './header.module.scss';

import { useState, useEffect, useRef } from 'react'

import defaultPages from '@/variables/pages.json';

export default function Header({
  pages = defaultPages
}) {

  const mainNavPages = pages.filter(page => page.showInMainNav)
  const tertiaryNavPages = pages.filter(page => page.showInTertiaryNav)

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logo, setLogo] = useState('/logos/trevor-gibby-logo.primary.svg')

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    // Check on mount if scrolled
    if (window.scrollY > 40 && !isScrolled) {
      setIsScrolled(true);
    }

    // Add event listener scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove event listener on unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click event for mobile nav trigger
  const handleMobileNavTriggerClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false)
  }

  // Handle mobile logo swap
  const handleMobileLogoSwap = () => {
    if (window.innerWidth < 992) {
      setLogo('/logos/tg-logo.primary.svg')
    } else {
      setLogo('/logos/trevor-gibby-logo.primary.svg')
    }
  }

  useEffect(() => {
    // Check on mount if mobile
    handleMobileLogoSwap();

    // Add event listener resize
    window.addEventListener('resize', handleMobileLogoSwap);

    return () => {
      // Remove event listener on unmount
      window.removeEventListener('resize', handleMobileLogoSwap);
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMobileNavOpen ? styles.open : ''}`}>
        {/* Tertiary Nav - Top Bar */}
        <div className={styles.tertiary_bar}>
          <div className="container">
            <div className={styles.tertiary_nav}>
              {tertiaryNavPages.map((page, index) => {
                return page.openInNewTab ? (
                  <a key={index} href={page.slug} target="_blank" rel="noopener noreferrer" title={page.title}>
                    <i className={page.icon} aria-hidden="true"></i>
                  </a>
                ) : (
                  <Link key={index} href={page.slug} title={page.title}>
                    <i className={page.icon} aria-hidden="true"></i>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        {/* Main Nav */}
        <div className={`container ${styles.nav_container}`}>
          <div className={styles.main_nav}>
            <div className={styles.logo}>
              <Link href="/">
                <img alt="Trevor Gibby Full Stack Developer" src={logo} />
              </Link>
            </div>
            <div className={styles.items}>
              <nav className={styles.nav} role="navigation">
                <ul className={styles.level_1}>
                  {mainNavPages.map((page, index) => {
                    // Check if slug is a hash link (either #section or /#section)
                    const isHashLink = page.slug.startsWith('#') || page.slug.startsWith('/#')
                    
                    return (
                      <li key={index}>
                        
                        {isHashLink ? (
                          // Handle fragment links
                          <a href={page.slug} onClick={handleCloseMobileNav}>
                            {page.title}
                          </a>
                        ) : (
                          // Handle regular links
                          <Link href={page.slug}>
                            {page.title}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                  {/* Tertiary nav items in mobile dropdown */}
                  {tertiaryNavPages.map((page, index) => {
                    return (
                      <li key={`tertiary-${index}`} className={styles.mobile_tertiary_item}>
                        {page.openInNewTab ? (
                          <a href={page.slug} target="_blank" rel="noopener noreferrer" onClick={handleCloseMobileNav}>
                            <i className={page.icon} aria-hidden="true"></i> {page.title}
                          </a>
                        ) : (
                          <Link href={page.slug} onClick={handleCloseMobileNav}>
                            <i className={page.icon} aria-hidden="true"></i> {page.title}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className={styles.item_append}>
                <a target="_blank" rel="nofollow" href="/files/trevor-gibby-resume.pdf" className={"btn btn-secondary"}>Resume</a>
                <a onClick={showModal} className={"btn btn-primary"}>Contact Me</a>
              </div>
              <div className={styles.mobile_nav_trigger} onClick={handleMobileNavTriggerClick}>
                <i className={`${styles.close_icon} fa fa-xmark`} aria-hidden="true"></i>
                <i className={`${styles.open_icon} fa fa-bars`} aria-hidden="true"></i>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}