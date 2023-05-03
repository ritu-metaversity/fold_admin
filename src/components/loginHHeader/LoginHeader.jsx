import React, { useState } from "react";
import slide1 from "../../assets/img/1.svg";
import slide2 from "../../assets/img/color1.svg";
import slide3 from "../../assets/img/color2.svg";
import slide4 from "../../assets/img/8-color.svg";
import slide5 from "../../assets/img/10-color.svg";
import slide6 from "../../assets/img/11-color.svg";

import "./styles.scss";
import Marquee from "react-fast-marquee";
import { Button } from "antd";
import DrawerComponent from "../drawer/DrawerComponent";
const LoginHeader = ({ setOpen, open, logo }) => {
  const showDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <DrawerComponent open={open} setOpen={setOpen} />
      <div className="login-header-container">
        <div className="login-header-left-col">
          <img src={logo} alt="logo" />
        </div>
        <div className="login-header-middle-col">
          <Marquee gradient={false} speed={90} className="marquee-col">
            <div className="icon-div">
              <img src={slide1} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide2} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide3} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide4} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide5} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide6} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide4} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide3} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide1} alt="slide1" />
              <p>sports</p>
            </div>
            <div className="icon-div">
              <img src={slide2} alt="slide1" />
              <p>sports</p>
            </div>
          </Marquee>
        </div>

        <div className="login-header-right-col">
          <Button className="login-btn" onClick={showDrawer}>
            login
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginHeader;
