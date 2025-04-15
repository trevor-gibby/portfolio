
import Image from 'next/image'
import Link from 'next/link'

import defaultPages from '@/variables/pages.json';

export default function Footer({
  pages = defaultPages
}) {

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <section className="bg-dark">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-7 col-md-5">
                <Link href="/">
                  <img className="img-fluid" alt="Trevor Gibby Full Stack Developer" src="/logos/trevor-gibby-logo.wash.svg" />
                </Link>
              </div>
            </div>
            <div className="row mt-lg-5 mt-3">
              <div className="col-12">
                <hr className="light thin" />
                <div className="row justify-content-center">
                  {pages.map((page, index) => (
                    (page.showInMainNav) &&
                    <div key={index} className="col-12 col-md-4 col-lg-3 text-center">
                      <Link href={page.slug} className="text-light hover-secondary">{page.title}</Link>
                    </div>
                  ))}
                </div>
                <hr className="light thin" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-3 bg-dark text-light" style={{borderTop: '1px solid rgb(var(--light-rgb-format) / 0.2)'}}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="text-center mb-0" style={{fontSize: '75%', letterSpacing: '0.05rem'}}>© {currentYear} Trevor Gibby | All Rights Reserved</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}