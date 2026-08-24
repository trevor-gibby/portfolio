import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { track } from '@vercel/analytics/react'
import Image from 'next/image'

import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'
import ProjectShowcase from '@/components/dynamic_content_widgets/project-showcase/project-showcase'

import content from '@/variables/home.json'
import { caseStudies } from '@/variables/case-studies'
import skillGroups from '@/variables/skills.json'

import styles from './home.module.scss'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] }
  }
}

function useDocumentScrollProgress() {
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    let animationFrame = null
    let isActive = true

    const updateProgress = () => {
      animationFrame = null
      const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const scrollableHeight = Math.max(documentHeight - window.innerHeight, 1)
      scrollProgress.set(Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1))
    }

    const scheduleUpdate = () => {
      if (isActive && animationFrame === null) animationFrame = window.requestAnimationFrame(updateProgress)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(document.documentElement)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    window.addEventListener('load', scheduleUpdate)
    window.visualViewport?.addEventListener('resize', scheduleUpdate)
    document.fonts?.ready.then(scheduleUpdate)
    scheduleUpdate()

    return () => {
      isActive = false
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('load', scheduleUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleUpdate)
    }
  }, [scrollProgress])

  return scrollProgress
}

function SectionLabel({ index, children }) {
  return (
    <div className={styles.sectionLabel}>
      <span>{index}</span>
      <span className={styles.labelLine} />
      <span>{children}</span>
    </div>
  )
}

export default function Home({ siteVariables, session }) {
  const reduceMotion = useReducedMotion()
  const scrollYProgress = useDocumentScrollProgress()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const allSkills = skillGroups.flatMap((group) =>
    group.subSkills.flatMap((skill) => [skill.name, ...(skill.subSkills?.map((item) => item.name) || [])])
  )

  const openContact = (location) => {
    track('Contact Click', { location })
    showModal()
  }

  return (
    <>
      <motion.div className={styles.scrollProgress} style={{ scaleX: progress }} aria-hidden="true" />

      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.ambient} aria-hidden="true">
          <div className={styles.orbOne} />
          <div className={styles.orbTwo} />
          <div className={styles.grid} />
          <div className={styles.scanline} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroCopy}
            initial={false}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } }}
          >
            <motion.div variants={reveal} className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {siteVariables.availability}
            </motion.div>
            <motion.p variants={reveal} className={styles.eyebrow}>{content.hero.eyebrow}</motion.p>
            <motion.h1 variants={reveal} id="home-hero-title">
              Senior Full‑Stack Engineer <span>&amp; Hands‑On Technical Lead</span>
            </motion.h1>
            <motion.p variants={reveal} className={styles.heroIntro}>{content.hero.intro}</motion.p>
            <motion.div variants={reveal} className={styles.heroActions}>
              <a href="#work" className="btn btn-primary btn-lg">
                {content.hero.primaryCta}
                <span aria-hidden="true">↓</span>
              </a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => openContact('hero')}>
                {content.hero.secondaryCta}
                <span aria-hidden="true">↗</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.orbit} aria-hidden="true">
              <div className={styles.orbitTrack}><span className={styles.orbitNode} /></div>
            </div>
            <div className={styles.logoCard}>
              <div className={styles.cardTop}>
                <span>portfolio.system</span>
                <span className={styles.status}>HANDS-ON</span>
              </div>
              <Image src="/logos/insignia-2.png" alt="Trevor Gibby TG insignia" width={296} height={295} priority sizes="(max-width: 991px) 260px, 250px" />
              <div className={styles.cardCode} aria-hidden="true">
                <span>const</span> approach = {'{'}
                <br />
                &nbsp;&nbsp;systems: <b>&apos;practical&apos;</b>,
                <br />
                &nbsp;&nbsp;change: <b>&apos;incremental&apos;</b>,
                <br />
                &nbsp;&nbsp;leadership: <b>&apos;hands_on&apos;</b>
                <br />
                {'}'}
              </div>
            </div>
            <motion.div className={`${styles.floatChip} ${styles.chipOne}`} animate={reduceMotion ? {} : { y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <span>01</span> Product
            </motion.div>
            <motion.div className={`${styles.floatChip} ${styles.chipTwo}`} animate={reduceMotion ? {} : { y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
              <span>02</span> Platform
            </motion.div>
            <motion.div className={`${styles.floatChip} ${styles.chipThree}`} animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <span>03</span> Leadership
            </motion.div>
          </motion.div>

          <motion.div className={styles.stats} initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.65 }} aria-label="Selected evidence">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className={styles.scrollCue} aria-hidden="true"><span>Scroll to explore</span><i /></div>
      </section>

      <div className={styles.marquee} aria-label="Technology specialties">
        <div className={styles.marqueeTrack}>
          {[...allSkills.slice(0, 14), ...allSkills.slice(0, 14)].map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}<i aria-hidden="true" /></span>
          ))}
        </div>
      </div>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel index="01">Selected case studies</SectionLabel>
              <h2 id="work-title">Proof in the <span>decisions.</span></h2>
            </div>
            <p>Four stories about product ownership, reusable systems, operational resilience, and practical modernization.</p>
          </div>
          <div className={styles.projectList}>
            {caseStudies.filter((project) => project.featured).map((project, index) => (
              <ProjectShowcase key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-i-work" className={styles.principlesSection} aria-labelledby="principles-title">
        <div className="container">
          <div className={styles.principles}>
            <div className={styles.principlesIntro}>
              <SectionLabel index="02">How I work</SectionLabel>
              <h2 id="principles-title">Useful systems over impressive-sounding ones.</h2>
            </div>
            <div className={styles.principleList}>
              {content.principles.map((principle) => (
                <article key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                    <small>{principle.proof}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className="container">
          <SectionLabel index="03">Leadership &amp; impact</SectionLabel>
          <div className={styles.aboutGrid}>
            <div className={styles.portraitColumn}>
              <div className={styles.portrait}>
                <Image src="/headshots/headshot1-2.jpeg" alt="Trevor Gibby" width={1024} height={1024} sizes="(max-width: 767px) 90vw, 34vw" />
                <div className={styles.portraitTag}><span>Based in</span><strong>Texas, USA</strong></div>
              </div>
              <div className={styles.portraitNote}><span aria-hidden="true">✦</span><p>Product, platform, infrastructure, and the team doing the work.</p></div>
            </div>

            <div className={styles.aboutCopy}>
              <p className={styles.eyebrow}>{content.about.eyebrow}</p>
              <h2 id="about-title">{content.about.title}</h2>
              <p className={styles.aboutLead}>{content.about.lead}</p>
              {content.about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className={styles.resumeLinks}>
                <a href={siteVariables.resume} target="_blank" rel="noopener noreferrer" className={styles.textLink} onClick={() => track('Resume Click', { location: 'about', action: 'view' })}>
                  Read my résumé <span aria-hidden="true">↗</span>
                </a>
                <a href={siteVariables.resume} download className={styles.textLink} onClick={() => track('Resume Click', { location: 'about', action: 'download' })}>
                  Download PDF <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.impactGrid}>
            {content.impact.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={styles.expertise} aria-labelledby="skills-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel index="04">Focused capabilities</SectionLabel>
              <h2 id="skills-title">Across the stack.<br /><span>Beyond the code.</span></h2>
            </div>
            <p>These are the capabilities I expect to use most in a senior full-stack or hands-on lead role.</p>
          </div>

          <div className={styles.skillGrid}>
            {content.skills.map((skill, index) => (
              <article key={skill.name} className={styles.skillCard}>
                <span className={styles.skillIndex}>0{index + 1}</span>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
                <div className={styles.skillList}>
                  {skill.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className="container">
          <div className={styles.contactCard}>
            <div className={styles.contactCircuit} aria-hidden="true" />
            <p className={styles.eyebrow}>{content.contact.eyebrow}</p>
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.description}</p>
            <div className={styles.contactActions}>
              <a href={siteVariables.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => track('Resume Click', { location: 'final_cta' })}>
                {content.contact.resumeCta} <span aria-hidden="true">↗</span>
              </a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => openContact('final_cta')}>
                {content.contact.contactCta} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </>
  )
}
