
import styles from './bg-img.module.css'

export default function BgImg({img, alt, add_classes, overlay, img_position, caption}) {

  return (
    <div className={`${styles.bg_img} ${add_classes}`}>
      {overlay && <div className={`${styles.overlay} ${styles[overlay]}`}></div>
      }
      <img src={img} alt={alt} style={{objectPosition: img_position}} />
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  )
}