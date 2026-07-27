import Link from 'next/link'

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
            <img src="/logos/insignia-2.png" alt="" aria-hidden="true" />
            <span>
              <strong>Trevor Gibby</strong>
              <small>Full Stack Engineer &amp; Team Lead</small>
            </span>
          </Link>
          <p>Thoughtful systems. Polished experiences.<br />Teams built to deliver.</p>
        </div>

        <div className={styles.bottom}>
          <span>© {currentYear} Trevor Gibby</span>
          <div className={styles.links}>
            {socialPages.map((page) => (
              <a key={page.slug} href={page.slug} target="_blank" rel="noopener noreferrer">
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
