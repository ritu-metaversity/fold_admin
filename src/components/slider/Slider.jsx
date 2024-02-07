import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";

import { sliderImageArray } from "./SliderData";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";
import axios from "axios";
const Slider = () => {
  const [bannerList, setBannerList] = useState([]);

  const getBanner = async () => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"enduser/user-banner-list"}`,
        { type: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setBannerList(res.data.data);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);
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
        {bannerList?.map((img) => {
          return (
            <SwiperSlide>
              <img src={img?.path} alt="" width="100%" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
