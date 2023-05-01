import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "./styles.scss";
import TopWinnerCard from "./Card";

const TopWinnerSlider = () => {
  return (
    <div>
      <div className="top-winner-heading">
        <h4>TOP WINNERS</h4>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView={6}
        autoplay={{ delay: 0 }}
        loop={true}
        speed={1000}
        breakpoints={{
          // when window width is >= 640px
          600: {
            slidesPerView: 3,
          },
          // when window width is >= 768px
          800: {
            slidesPerView: 4,
          },
          1000: {
            slidePrevView: 5,
          },
          1200: {
            slidePrevView: 6,
          },
        }}
        // pagination={true}
        modules={[Autoplay]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="sample-slider"
      >
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TopWinnerCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TopWinnerSlider;
