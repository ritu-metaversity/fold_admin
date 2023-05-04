import React from "react";
import Marquee from "react-fast-marquee";

import "./styles.scss";
import { arrayImg } from "./Data";
const HeaderSliderComponent = () => {
  return (
    <div>
      <Marquee gradient={false} speed={90} className="marquee-col">
        {arrayImg?.map((curElem) => {
          return (
            <div className="icon-div">
              <img src={curElem.img} alt="slide1" />
              <p>{curElem.name}</p>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default HeaderSliderComponent;
