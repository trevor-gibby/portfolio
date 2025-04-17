import React from 'react';
import Slider from 'react-slick';
import styles from './slick-slider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SlickSlider({
  items = [],

  classes = '',
  inlineStyles = {},

  arrows_tf = false,
  arrows_color = 'primary',

  autoplay_tf = false,
  autoplay_speed = 5,

  dots_tf = false,
  dots_classes = '',

  desktop_slides = 3,
  desktop_slides_scroll = 3,

  mobile_slides = 1,
  mobile_slides_scroll = 1,
}) {
  // Slick slider settings
  const settings = {
    arrows: arrows_tf,
    autoplay: autoplay_tf,
    autoplaySpeed: autoplay_speed * 1000,
    dots: dots_tf,
    dotsClass: dots_classes,
    slidesToShow: desktop_slides,
    slidesToScroll: desktop_slides_scroll,
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: mobile_slides,
          slidesToScroll: mobile_slides_scroll,
        },
      },
    ],
  };

  return (
    <div className={`${styles.slick_slider} ${classes} row`} style={inlineStyles}>
      <div className={`col-12 arrows-${arrows_color}`}>

        <Slider {...settings}>
          {items.map((item, index) => {
            // Check if the item is a React component or an HTML string
            if (React.isValidElement(item)) {
              // Render React component directly
              return (
                <div key={index} className={``}>
                  {item}
                </div>
              );
            } else if (typeof item === 'string') {
              // Render HTML string using dangerouslySetInnerHTML
              return (
                <div
                  key={index}
                  className={``}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              );
            } else {
              // Handle invalid item types (optional)
              console.warn(`Invalid item type at index ${index}:`, item);
              return null;
            }
          })}
        </Slider>
      </div>
    </div>
  );
}