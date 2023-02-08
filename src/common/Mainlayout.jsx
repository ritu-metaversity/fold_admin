import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import SiderBar from "../components/sider/SiderBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import "./styles.scss";
import axios from "axios";
import { User_Balance } from "../routes/Routes";
import { useSearchParams } from "react-router-dom";
const Mainlayout = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [siderBar, setSidebar] = useState(false);
  const counter = useRef(0);
  const ShowSideBar = () => {
    setSidebar(!siderBar);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  const clickfun = () => {
    setDisplay(!display);
  };

  return (
    <>
      {display ? (
        <div className="overlay-dropdown" onClick={clickfun}></div>
      ) : (
        ""
      )}

      <div className="header">
        <Header
          overlayState={display}
          setDisplay={setDisplay}
          // balance={userBalanceamount}
        />
      </div>
      <div className="content-conatiner">
        <div className="container">
          <div className="upcomig-2">
            <marquee>
              This is a sample scrolling text that has scrolls texts to right.
            </marquee>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className={siderBar ? "left-sider-active" : "left-sider"}>
              <SiderBar closeSidebar={closeSidebar} siderBar={siderBar} />
            </div>
            <div className="content" onClick={closeSidebar}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="sider-icon">
        {siderBar ? (
          <RxCross2 onClick={ShowSideBar} />
        ) : (
          <RxHamburgerMenu onClick={ShowSideBar} />
        )}
      </div>
    </>
  );
};

export default Mainlayout;
