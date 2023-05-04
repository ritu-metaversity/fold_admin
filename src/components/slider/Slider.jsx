import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";

import { sliderImageArray } from "./SliderData";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";
const Slider = () => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={true}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="swiper-slider-div"
      >
        {sliderImageArray.map((img) => {
          return (
            <SwiperSlide>
              <img src={img} alt="" width="100%" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
