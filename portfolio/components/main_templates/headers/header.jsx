
import Image from 'next/image'
import Link from 'next/link'

import ContactModal, { showModal, hideModal } from '@/components/content_widgets/contact-modal/contact-modal'

import styles from './header.module.scss';

import { useState, useEffect, useRef } from 'react'

import defaultPages from '@/variables/pages.json';

export default function Header({
  pages = defaultPages
}) {

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMobileNavOpen ? styles.open : ''}`}>
        <div className={`container ${styles.nav_container}`}>
          <div className={styles.main_nav}>
            <div className={styles.logo}>
              <Link href="/">
                <img alt="Trevor Gibby Full Stack Developer" src="/logos/trevor-gibby-logo.primary.svg" />
              </Link>
            </div>
            <div className={styles.items}>
              <nav className={styles.nav} role="navigation">
                <ul className={styles.level_1}>
                  {pages.map((page, index) => {
                    return (
                      (page.showInMainNav) &&
                      <li key={index}>
                        <Link href={page.slug}>{page.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className={styles.item_append}>
                <a target="_blank" rel="nofollow" href="/files/trevor-gibby-resume-2025.pdf" className={"btn btn-secondary"}>Resume</a>
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