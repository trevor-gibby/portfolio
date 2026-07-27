import { motion, useReducedMotion } from 'framer-motion'
import styles from './project-showcase.module.scss'

export default function ProjectShowcase({ project, index }) {
  const reduceMotion = useReducedMotion()
  const isFeatured = index === 0

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <motion.article
      className={`${styles.project} ${isFeatured ? styles.featured : ''}`}
      style={{ '--project-accent': project.accent }}
      initial={reduceMotion ? false : { opacity: 0, y: 70 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.copy}>
        <div className={styles.projectMeta}>
          <span className={styles.index}>0{index + 1}</span>
          <span>{project.eyebrow}</span>
        </div>
        <h3>{project.title}</h3>
        <p className={styles.summary}>{project.short_description}</p>
        <p className={styles.description}>{project.long_description}</p>

        <ul className={styles.technologies} aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {project.link ? (
          <a className={styles.projectLink} href={project.link} target="_blank" rel="noopener noreferrer">
            {project.link_label} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className={styles.privateLink}>
            <span className={styles.lockDot} aria-hidden="true" />
            {project.link_label}
          </span>
        )}
      </div>

      <div className={styles.visual}>
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <span />
            <span />
            <span />
            <div className={styles.address}>{project.title.toLowerCase().replaceAll(' ', '-')}.app</div>
          </div>
          <div className={styles.imageWrap}>
            <img src={project.image} alt={project.image_alt} loading="lazy" />
          </div>
        </div>

        {isFeatured && project.gallery?.length > 0 && (
          <motion.div
            className={styles.galleryPeek}
            initial={reduceMotion ? false : { opacity: 0, x: 40, rotate: 0 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0, rotate: 2.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <img src={project.gallery[0].image} alt={project.gallery[0].image_alt} loading="lazy" />
          </motion.div>
        )}
      </div>
    </motion.article>
  )
}
