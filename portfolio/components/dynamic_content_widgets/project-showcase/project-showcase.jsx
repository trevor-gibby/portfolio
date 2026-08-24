import Link from 'next/link'
import Image from 'next/image'

import styles from './project-showcase.module.scss'

export default function ProjectShowcase({ project, index }) {
  const isFeatured = index === 0

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <article
      className={`${styles.project} ${isFeatured ? styles.featured : ''}`}
      style={{ '--project-accent': project.accent }}
      onPointerMove={handlePointerMove}
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.copy}>
        <div className={styles.projectMeta}>
          <span className={styles.index}>0{index + 1}</span>
          <span>{project.context}</span>
        </div>
        <span className={styles.statusLabel}>{project.status}</span>
        <h3>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.caseSummary}>
          <div>
            <dt>Problem</dt>
            <dd>{project.homepage.problem}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.homepage.ownership}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>{project.homepage.outcome}</dd>
          </div>
        </dl>

        <ul className={styles.technologies} aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <Link className={styles.projectLink} href={`/work/${project.slug}`}>
          Read the case study <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.visual}>
        {project.image ? (
          <div className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <div className={styles.address}>independent prototype</div>
            </div>
            <div className={styles.imageWrap}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={3024}
                height={1898}
                priority={isFeatured}
                sizes="(max-width: 991px) 92vw, 52vw"
              />
            </div>
          </div>
        ) : (
          <div className={styles.systemPreview} aria-label={`${project.title} capability overview`}>
            <div className={styles.previewHeader}>
              <span>system / capability map</span>
              <span>0{index + 1}</span>
            </div>
            <div className={styles.previewCore}>{project.title}</div>
            <ul>
              {project.preview.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
