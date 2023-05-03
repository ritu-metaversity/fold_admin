import React from "react";

import "./styles.scss";
import { Button } from "antd";
import DrawerComponent from "../drawer/DrawerComponent";

import HeaderSliderComponent from "../headerSlider/HeaderSliderComponent";
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
          <HeaderSliderComponent />
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
