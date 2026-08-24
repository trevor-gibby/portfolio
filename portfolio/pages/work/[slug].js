import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics/react'

import Main from '@/components/main_templates/main'
import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'
import { caseStudies, getCaseStudy } from '@/variables/case-studies'
import siteVariables from '@/variables/site-variables.json'
import { metadataBase } from '@/variables/seo'

import styles from './[slug].module.scss'

export function getStaticPaths() {
  return {
    paths: caseStudies.map((caseStudy) => ({ params: { slug: caseStudy.slug } })),
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const caseStudy = getCaseStudy(params.slug)
  if (!caseStudy) return { notFound: true }
  return { props: { caseStudy } }
}

function SectionHeading({ eyebrow, title, id }) {
  return (
    <div className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className={styles.diagramGrid}>
      <article className={styles.diagramCard}>
        <div className={styles.diagramTitle}>
          <span>01</span>
          <h3>Scheduled infrastructure and synchronization</h3>
        </div>
        <ol className={styles.flow}>
          <li><strong>Amazon EventBridge</strong><span>Weekly synchronization</span></li>
          <li><strong>AWS Step Functions</strong><span>Chestnut workflow</span></li>
          <li><strong>Lambda + Kamatera API</strong><span>Inspect server power state</span></li>
          <li className={styles.decision}><strong>Server already running?</strong><span>Branch by current state</span></li>
          <li>
            <strong>Start only when needed</strong>
            <span>Power on, wait for startup, verify, then trigger the protected synchronization endpoint</span>
          </li>
          <li><strong>Synchronize and return to standby</strong><span>Wait for the refresh window, then power the server off</span></li>
        </ol>
        <p className={styles.failurePath}>Task failures route to Amazon SNS and the development support email.</p>
      </article>

      <article className={styles.diagramCard}>
        <div className={styles.diagramTitle}>
          <span>02</span>
          <h3>Application-layer data flow</h3>
        </div>
        <ol className={styles.flow}>
          <li><strong>Protected synchronization endpoint</strong><span>Starts the Node.js and EJS application flow</span></li>
          <li><strong>Iterate configured sites</strong><span>Check whether the franchise module is enabled</span></li>
          <li className={styles.decision}><strong>Fetch approved Oak API data</strong><span>Locations, variables, and territories</span></li>
          <li><strong>Filter and normalize</strong><span>Keep live locations, add territory and alias data, and flatten site variables</span></li>
          <li><strong>Write per-site JSON</strong><span>Preserve existing fallback data when a non-empty response is unavailable</span></li>
          <li><strong>Render emergency pages</strong><span>EJS brand and location pages consume the stored snapshots</span></li>
        </ol>
        <p className={styles.failurePath}>Per-site request or processing errors are logged before continuing to the next configured site.</p>
      </article>
    </div>
  )
}

export default function CaseStudy({ caseStudy, session }) {
  const canonicalUrl = `${metadataBase}/work/${caseStudy.slug}`

  useEffect(() => {
    track('Case Study View', { slug: caseStudy.slug })
  }, [caseStudy.slug])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.title,
    description: caseStudy.summary,
    author: {
      '@type': 'Person',
      name: 'Trevor Gibby',
      url: metadataBase
    },
    url: canonicalUrl
  }

  const openContact = () => {
    track('Contact Click', { location: `case_study_${caseStudy.slug}` })
    showModal()
  }

  return (
    <Main
      meta_title={`${caseStudy.title} | Trevor Gibby`}
      meta_description={caseStudy.summary}
      meta_url={canonicalUrl}
      schema={schema}
    >
      <header className={styles.hero} style={{ '--case-accent': caseStudy.accent }}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className="container">
          <Link href="/#work" className={styles.back}>← All case studies</Link>
          <div className={styles.heroMeta}>
            <span className={styles.status}>{caseStudy.status}</span>
            <span>{caseStudy.context}</span>
          </div>
          <h1>{caseStudy.title}</h1>
          <p className={styles.summary}>{caseStudy.summary}</p>
          <p className={styles.intro}>{caseStudy.intro}</p>
          <ul className={styles.technologies} aria-label="Technologies and capabilities">
            {caseStudy.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
      </header>

      <article className={styles.caseStudy}>
        <section className={styles.overview} aria-labelledby="overview-title">
          <div className="container">
            <SectionHeading eyebrow="Case study at a glance" title="The problem, my role, and the result." id="overview-title" />
            <dl className={styles.overviewGrid}>
              {Object.entries(caseStudy.overview).map(([key, value]) => (
                <div key={key}>
                  <dt>{key === 'ownership' ? 'My ownership' : key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {caseStudy.gallery?.length > 0 && (
          <section className={styles.gallerySection} aria-labelledby="gallery-title">
            <div className="container">
              <SectionHeading eyebrow="Synthetic product walkthrough" title="Working screens from the current prototype." id="gallery-title" />
              <p className={styles.galleryNote}>The private product name is intentionally omitted. These recreated screens use entirely fictional people, organizations, addresses, and conversations; the private repository and source are not published.</p>
              <div className={styles.gallery}>
                {caseStudy.gallery.map((item, index) => (
                  <figure key={item.image} className={index === 0 ? styles.galleryLead : ''}>
                    <div>
                      <Image src={item.image} alt={item.alt} width={3024} height={1898} priority={index === 0} sizes={index === 0 ? '(max-width: 767px) 92vw, 88vw' : '(max-width: 767px) 92vw, 44vw'} />
                    </div>
                    <figcaption><span>0{index + 1}</span>{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.diagram && (
          <section className={styles.diagramSection} aria-labelledby="diagram-title">
            <div className="container">
              <SectionHeading eyebrow="Portfolio-safe architecture" title="A focused continuity layer, not a full replica." id="diagram-title" />
              <p className={styles.diagramIntro}>Chestnut provides a cost-conscious business-continuity layer that is independent of the primary CMS host. Scheduled AWS orchestration refreshes approved site data while the standby server remains powered off outside the synchronization window.</p>
              <ArchitectureDiagram />
            </div>
          </section>
        )}

        <section className={styles.architectureSection} aria-labelledby="architecture-title">
          <div className="container">
            <SectionHeading eyebrow="Architecture" title="The boundaries that made the work useful." id="architecture-title" />
            <div className={styles.architectureGrid}>
              {caseStudy.architecture.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {caseStudy.codeSamples?.length > 0 && (
          <section className={styles.codeSection} aria-labelledby="code-title">
            <div className="container">
              <SectionHeading eyebrow="Approved public example" title="A concrete look at the implementation pattern." id="code-title" />
              <div className={styles.codeGrid}>
                {caseStudy.codeSamples.map((sample) => (
                  <article key={sample.label} className={styles.codeCard}>
                    <div>
                      <h3>{sample.label}</h3>
                      <span>{sample.language}</span>
                    </div>
                    <p>{sample.note}</p>
                    <pre tabIndex="0"><code>{sample.code}</code></pre>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={styles.decisionsSection} aria-labelledby="decisions-title">
          <div className={`container ${styles.decisionsGrid}`}>
            <div>
              <SectionHeading eyebrow="Key decisions" title="What I chose and why." id="decisions-title" />
              <ol className={styles.numberedList}>
                {caseStudy.decisions.map((decision, index) => (
                  <li key={decision}><span>0{index + 1}</span><p>{decision}</p></li>
                ))}
              </ol>
            </div>
            <aside aria-labelledby="constraints-title">
              <p>Constraints &amp; tradeoffs</p>
              <h2 id="constraints-title">The work had boundaries.</h2>
              <ul>
                {caseStudy.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
              </ul>
            </aside>
          </div>
        </section>

        <section className={styles.evidenceSection} aria-labelledby="evidence-title">
          <div className="container">
            <SectionHeading eyebrow="Outcome & evidence" title="What the repository and delivered work support." id="evidence-title" />
            <ul className={styles.evidenceList}>
              {caseStudy.evidence.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.reflectionSection} aria-labelledby="reflection-title">
          <div className="container">
            <SectionHeading eyebrow="Reflection" title="What I learned and what I would do next." id="reflection-title" />
            <div className={styles.reflectionGrid}>
              <article><span>What I learned</span><p>{caseStudy.reflection.learned}</p></article>
              <article><span>What I would do next</span><p>{caseStudy.reflection.next}</p></article>
            </div>
          </div>
        </section>
      </article>

      <section className={styles.moreWork} aria-labelledby="more-work-title">
        <div className="container">
          <div className={styles.moreWorkHeader}>
            <div>
              <p>Keep exploring</p>
              <h2 id="more-work-title">More case studies</h2>
            </div>
            <Link href="/#work">View all work →</Link>
          </div>
          <div className={styles.moreWorkGrid}>
            {caseStudies.filter((item) => item.slug !== caseStudy.slug).slice(0, 3).map((item) => (
              <Link href={`/work/${item.slug}`} key={item.slug}>
                <span>{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <strong>Read case study →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="case-cta-title">
        <div className="container">
          <div className={styles.ctaCard}>
            <p>Senior full-stack engineering · Hands-on technical leadership</p>
            <h2 id="case-cta-title">Looking for someone who can own the system around the feature?</h2>
            <div>
              <a href={siteVariables.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => track('Resume Click', { location: `case_study_${caseStudy.slug}` })}>View Résumé ↗</a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={openContact}>Contact Me ↗</button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </Main>
  )
}
