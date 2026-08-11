import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Link from 'next/link'

import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'
import ProjectShowcase from '@/components/dynamic_content_widgets/project-showcase/project-showcase'
import BlogCard from '@/components/dynamic_content_widgets/blog-card/blog-card'

import content from '@/variables/home.json'
import projects from '@/variables/my-work.json'
import skillGroups from '@/variables/skills.json'
import blogPostsData from '@/variables/blog-posts.json'

import styles from './home.module.scss'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] }
  }
}

const recentPosts = blogPostsData.posts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

function useDocumentScrollProgress() {
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    let animationFrame = null
    let isActive = true

    const updateProgress = () => {
      animationFrame = null

      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
      const scrollableHeight = Math.max(documentHeight - window.innerHeight, 1)
      const nextProgress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)

      scrollProgress.set(nextProgress)
    }

    const scheduleUpdate = () => {
      if (isActive && animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateProgress)
      }
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
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
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

  return (
    <>
      <motion.div className={styles.scrollProgress} style={{ scaleX: progress }} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.ambient} aria-hidden="true">
          <div className={styles.orbOne} />
          <div className={styles.orbTwo} />
          <div className={styles.grid} />
          <div className={styles.scanline} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroCopy}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } }
            }}
          >
            <motion.div variants={reveal} className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {siteVariables.availability}
            </motion.div>
            <motion.p variants={reveal} className={styles.eyebrow}>{content.hero.eyebrow}</motion.p>
            <motion.h1 variants={reveal}>
              I build digital systems that <span>move teams forward.</span>
            </motion.h1>
            <motion.p variants={reveal} className={styles.heroIntro}>{content.hero.intro}</motion.p>
            <motion.div variants={reveal} className={styles.heroActions}>
              <a href="#my-work" className="btn btn-primary btn-lg">
                {content.hero.primaryCta}
                <span aria-hidden="true">↓</span>
              </a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={showModal}>
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
              <div className={styles.orbitTrack}>
                <span className={styles.orbitNode} />
              </div>
            </div>
            <div className={styles.logoCard}>
              <div className={styles.cardTop}>
                <span>portfolio.system</span>
                <span className={styles.status}>ONLINE</span>
              </div>
              <img src="/logos/insignia-2.png" alt="Trevor Gibby TG insignia" />
              <div className={styles.cardCode} aria-hidden="true">
                <span>const</span> craft = {'{'}
                <br />
                &nbsp;&nbsp;systems: <b>&apos;resilient&apos;</b>,
                <br />
                &nbsp;&nbsp;interfaces: <b>&apos;intentional&apos;</b>,
                <br />
                &nbsp;&nbsp;teams: <b>&apos;empowered&apos;</b>
                <br />
                {'}'}
              </div>
            </div>
            <motion.div
              className={`${styles.floatChip} ${styles.chipOne}`}
              animate={reduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>01</span> Front end
            </motion.div>
            <motion.div
              className={`${styles.floatChip} ${styles.chipTwo}`}
              animate={reduceMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span>02</span> Architecture
            </motion.div>
            <motion.div
              className={`${styles.floatChip} ${styles.chipThree}`}
              animate={reduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span>03</span> Leadership
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.65 }}
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className={styles.scrollCue}>
          <span>Scroll to explore</span>
          <i aria-hidden="true" />
        </div>
      </section>

      <div className={styles.marquee} aria-label="Technology specialties">
        <div className={styles.marqueeTrack}>
          {[...allSkills.slice(0, 14), ...allSkills.slice(0, 14)].map((skill, index) => (
            <span key={`${skill}-${index}`}>
              {skill}<i aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <section id="about" className={styles.about}>
        <div className="container">
          <SectionLabel index="01">About</SectionLabel>
          <div className={styles.aboutGrid}>
            <div className={styles.portraitColumn}>
              <div className={styles.portrait}>
                <img src="/headshots/headshot1-2.jpeg" alt="Trevor Gibby" loading="lazy" />
                <div className={styles.portraitTag}>
                  <span>Based in</span>
                  <strong>Texas, USA</strong>
                </div>
              </div>
              <div className={styles.portraitNote}>
                <span aria-hidden="true">✦</span>
                <p>Building at the intersection of product, people, and technology.</p>
              </div>
            </div>

            <div className={styles.aboutCopy}>
              <p className={styles.eyebrow}>{content.about.eyebrow}</p>
              <h2>{content.about.title}</h2>
              <p className={styles.aboutLead}>{content.about.lead}</p>
              {content.about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <a
                href={siteVariables.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                Read my résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="my-work" className={styles.work}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel index="02">Selected work</SectionLabel>
              <h2>Systems with <span>real-world weight.</span></h2>
            </div>
            <p>A selection of product platforms and interactive experiences built to solve meaningful problems.</p>
          </div>

          <div className={styles.projectList}>
            {projects.filter((project) => project.highlight).map((project, index) => (
              <ProjectShowcase key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={styles.expertise}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel index="03">Capabilities</SectionLabel>
              <h2>Across the stack.<br /><span>Beyond the code.</span></h2>
            </div>
            <p>I move fluidly between interface details, application architecture, delivery systems, and engineering leadership.</p>
          </div>

          <div className={styles.skillGrid}>
            {skillGroups.map((group, index) => (
              <article
                key={group.name}
                className={styles.skillCard}
              >
                <span className={styles.skillIndex}>0{index + 1}</span>
                <h3>{group.name}</h3>
                <div className={styles.skillList}>
                  {group.subSkills.map((skill) => (
                    <span key={skill.name}>{skill.name}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.principles}>
            <div className={styles.principlesIntro}>
              <p className={styles.eyebrow}>How I work</p>
              <h2>Engineering is a team sport.</h2>
            </div>
            <div className={styles.principleList}>
              {content.principles.map((principle) => (
                <article key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section id="blog" className={styles.insights}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <SectionLabel index="04">Writing</SectionLabel>
                <h2>Notes from the <span>workbench.</span></h2>
              </div>
              <Link href="/blog" className={styles.textLink}>All writing <span aria-hidden="true">→</span></Link>
            </div>
            <div className={styles.blogGrid}>
              {recentPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className={styles.contact}>
        <div className="container">
          <div className={styles.contactCard}>
            <div className={styles.contactCircuit} aria-hidden="true" />
            <p className={styles.eyebrow}>{content.contact.eyebrow}</p>
            <h2>{content.contact.title}</h2>
            <p>{content.contact.description}</p>
            <div className={styles.contactActions}>
              <button type="button" className="btn btn-primary btn-lg" onClick={showModal}>
                Start a conversation <span aria-hidden="true">↗</span>
              </button>
              <a href={`mailto:${siteVariables.email}`} className={styles.emailLink}>{siteVariables.email}</a>
            </div>
          </div>
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </>
  )
}
