import React from "react";
import "./styles.scss";
import Marquee from "react-fast-marquee";
const UpComingComponent = ({message}) => {
  return (
    <>
      <div className="upcoming-container-div">
        <Marquee className="up-coming-marquee" gradient={false} speed={100}>
          {message}
        </Marquee>
      </div>
    </>
  );
};

export default UpComingComponent;
