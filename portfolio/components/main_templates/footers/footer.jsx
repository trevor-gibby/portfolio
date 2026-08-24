import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics/react'

import defaultPages from '@/variables/pages.json'
import styles from './footer.module.scss'

export default function Footer({ pages = defaultPages }) {
  const currentYear = new Date().getFullYear()
  const socialPages = pages.filter((page) => page.showInTertiaryNav && page.openInNewTab)

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <Link href="/" className={styles.brand}>
            <Image src="/logos/insignia-2.png" alt="" aria-hidden="true" width={296} height={295} sizes="61px" />
            <span>
              <strong>Trevor Gibby</strong>
              <small>Senior Full-Stack Engineer &amp; Technical Lead</small>
            </span>
          </Link>
          <p>Practical systems. Clear decisions.<br />Hands-on technical leadership.</p>
        </div>

        <div className={styles.bottom}>
          <span>© {currentYear} Trevor Gibby</span>
          <div className={styles.links}>
            {socialPages.map((page) => (
              <a key={page.slug} href={page.slug} target="_blank" rel="noopener noreferrer" onClick={() => track('Outbound Link Click', { destination: page.title, location: 'footer' })}>
                {page.title} <span aria-hidden="true">↗</span>
              </a>
            ))}
            <Link href="/blog">Writing</Link>
          </div>
          <a href="#top" className={styles.backTop}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
