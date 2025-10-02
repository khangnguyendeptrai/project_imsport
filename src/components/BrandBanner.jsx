import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
  imgbrand1, imgbrand2, imgbrand3,
  imgbrand4, imgbrand5, imgbrand6,
  imgbrand7, imgbrand8
} from '../assets/ExportImage.jsx'

import 'swiper/css';

const BrandBanner = () => {
  const dataImage = [
    { id: 1, image: imgbrand1 },
    { id: 2, image: imgbrand2 },
    { id: 3, image: imgbrand3 },
    { id: 4, image: imgbrand4 },
    { id: 5, image: imgbrand5 },
    { id: 6, image: imgbrand6 },
    { id: 7, image: imgbrand7 },
    { id: 8, image: imgbrand8 },
    { id: 9, image: imgbrand1 },
    { id: 10, image: imgbrand2 },
    { id: 11, image: imgbrand3 },
    { id: 12, image: imgbrand4 },
  ];

  const markVisibleSlides = (swiper) => {
    swiper.slides.forEach((slideEl) => {
      if (slideEl.classList.contains("swiper-slide-visible")) {
        const img = slideEl.querySelector("img");
        if (img && !img.classList.contains("show-brand-image")) {
          img.classList.add("show-brand-image"); // đánh dấu đã hiện lần đầu
        }
      }
    });
  };

  return (
    <div className='brand-banner w-screen container !py-10 mx-auto'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={7}
        watchSlidesProgress
         speed={3000}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onInit={(swiper) => markVisibleSlides(swiper)}
        onTouchEnd={(swiper) => {
           markVisibleSlides(swiper)
        }}
        onAutoplay={(swiper) => markVisibleSlides(swiper)}
      >
        {dataImage.map(item => (
          <SwiperSlide key={item.id}>
            <a href=''>
            <img
              src={item.image}
              alt=""
              className="h-[70px]  opacity-0 transition-opacity duration-500"
            />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BrandBanner;
