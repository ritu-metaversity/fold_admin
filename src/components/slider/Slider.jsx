import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import slide1 from "../../assets/img/slide1.png";
import slide2 from "../../assets/img/slide2.png";
import slide3 from "../../assets/img/slide3.jpg";
import slide4 from "../../assets/img/slide4.jpg";

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
        <SwiperSlide>
          <img src={slide1} alt="" width="100%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" width="100%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" width="100%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" width="100%" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
