
import styles from './my-work-card-1.module.css'

export default function MyWorkCard1({items}) {

  var containerAddClass = 'horizontal-scroll-mobile container';

  return (
    <div className={`${styles.mywork_card_1} ${containerAddClass}`}>
      <div className={`row overflow scrollbar-primary pb-4 pb-lg-0`} style={{"--bs-gutter-y": "1.5rem"}}>
        {items.map((item, index) => {

          return (
            (item.highlight) &&
            <div key={index} className={`${styles.col} col-11 col-md-8 col-lg-6`}>

              {(item.link) ?
                <a target="_blank" rel="nofollow" href={item.link} className={`${styles.item_card} box-shadow box-shadow-hover`}>
                  <img className={styles.img} alt={item.image_alt} src={item.image}/>
                  
                  <div className={styles.details}>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>
                </a>
                :
                <div className={`${styles.item_card} box-shadow box-shadow-hover`}>
                  <img className={styles.img} alt={item.image_alt} src={item.image}/>

                  <div className={styles.details}>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>
                </div>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}