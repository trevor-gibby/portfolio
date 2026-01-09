
import Link from 'next/link'
import styles from './subnav-card-1.module.scss'

export default function SubnavCard1({pages}) {

  pages = pages.filter(page => page.showInSubNav);

  var horizontalScrollLg = pages.length > 3 ? true : false;
  var containerAddClass = horizontalScrollLg ? 'horizontal-scroll container-fluid' : 'horizontal-scroll-mobile container';
  var rowAddClass = horizontalScrollLg ? 'pb-lg-5' : '';

  // Check if slug is a hash link (either #section or /#section)
  const isHashLink = (slug) => slug.startsWith('#') || slug.startsWith('/#')

  return (
    <div className={`${styles.subnav_card_1} ${containerAddClass}`}>
      <div className={`row overflow scrollbar-primary pb-4 ${rowAddClass}`}>
        {pages.map((page, index) => {

          return (
            (page.showInSubNav) &&
            <div key={index} className={`${styles.col} col-11 col-md-5 col-lg-4`}>

              {isHashLink(page.slug) || page.openInNewTab ? (
                <a 
                  href={page.slug} 
                  className={`${styles.page_card}`}
                  {...(page.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <img className={styles.img} alt={page.alt} src={page.img}/>
                  
                  <div className={styles.details}>
                    <h3 className={styles.title}>{page.title}</h3>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </a>
              ) : (
                <Link href={page.slug} className={`${styles.page_card}`}>
                  <img className={styles.img} alt={page.alt} src={page.img}/>
                  
                  <div className={styles.details}>
                    <h3 className={styles.title}>{page.title}</h3>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}