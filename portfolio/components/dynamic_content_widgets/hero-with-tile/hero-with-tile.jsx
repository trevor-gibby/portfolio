import styles from './hero-with-tile.module.scss'

export default function HeroWithTile({
  bgColor = 'primary',
  tileColor = 'rgba(255, 255, 255, 0.7)',
  tileTextColor = 'primary',
  image,
  imageAlt = '',
  children
}) {
  const bgClass = `bg-${bgColor}`
  
  return (
    <section 
      className={`${bgClass} ${styles.hero}`}
      style={{
        '--tile-bg': tileColor,
        '--tile-text': `var(--${tileTextColor})`
      }}
    >
      {image && (
        <div className={styles.hero_image}>
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className="container">
        <div className="row align-items-center">
          <div className={`col-lg-auto ${styles.tile_col}`}>
            <div className={styles.tile}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
