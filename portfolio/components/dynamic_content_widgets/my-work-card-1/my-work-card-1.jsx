
import styles from './my-work-card-1.module.scss'

import SlickSlider from '../../widget_templates/slick-slider/slick-slider.jsx'

import { useState, useEffect } from 'react'

export default function MyWorkCard1({items}) {

  // Create unique ID for each component instance
  const [componentId, setComponentId] = useState(null)
  useEffect(() => {
    const uniqueId = 'myworkcard' + Math.floor(Math.random() * 10000);
    setComponentId(uniqueId);
  }, []);


  let format_item_cards = [];
  items.map((item, index) => {
    format_item_cards.push(
      <div key={index} className={`item`} data-fancybox={componentId} data-src={'#' + componentId + '-' + index}>
        <div className={`card-wrapper`}>
          <div className={`img`}>
            <img alt={item.image_alt} src={item.image}/>
          </div>
          <div className={`title`}>
            {item.title}
          </div>
        </div>
      </div>
    )
  })

  return (

    <>
      <SlickSlider
        items={format_item_cards}
        classes={`${styles.mywork_card_1}`}
        arrows_tf={true}
        arrows_color="secondary"
        autoplay_tf={true}
        autoplay_speed={5}
        dots_tf={false}
        dots_classes="primary"
        desktop_slides={1}
        desktop_slides_scroll={1}
        mobile_slides={1}
        mobile_slides_scroll={1}
      />
      <div>
        
        {items.map((item, index) => {
          return (
            <div key={index} id={componentId + '-' + index} style={{display: 'none', width: '90%'}}>
              <div className={`row`}>
                <div className={`col-lg-6`}>
                  <img className={`img-fluid`} alt={item.image_alt} src={item.image}/>
                </div>
                <div className={`col-lg col-12`}>
                  <h2 className="text-primary h1 mb-0">{item.title}</h2>
                  <hr className="primary" />
                  <p>{item.long_description}</p>

                  {item.link && (
                    <a href={item.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}