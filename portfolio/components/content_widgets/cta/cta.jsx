
import styles from './cta.module.scss';

export default function CTA({color = "primary", textColor = "light", title, subtitle, button1, button2, logo = "/logos/tg-logo", logoColor = "wash"})
{
  return (
    <div className={`${styles.cta} bg-${color} text-${textColor}`}>
      <img src={`${logo}.${logoColor}.svg`} alt="Trevor Gibby Logo" className={styles.logo} />

      <div className={`${styles.content} row justify-content-lg-between`}>
        <div className={`${styles.titleCol} col-lg-auto col-12 align-self-end`}>
          <h1 className={`${styles.title}`}>{title}</h1>
          {subtitle && 
          <p className={`${styles.subtitle} mb-lg-0 mb-5`}>{subtitle}</p>
          }
        </div>
        <div className={`${styles.buttonCol} col-lg-auto col-12 align-self-end`}>
          <div className={`${styles.buttonRow} row justify-content-lg-end align-items-end`}>
            <div className={`col-auto`}>
              <a href={button1.link} className={`btn btn-${button1.color}`}>{button1.text}</a>
            </div>
            {button2 && 
            <div className={`col-auto mt-2`}>
              <a href={button2.link} className={`btn btn-${button2.color}`}>{button2.text}</a>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}