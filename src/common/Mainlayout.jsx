import React, { useContext } from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import SiderBar from "../components/sider/SiderBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import "./styles.scss";


import Marquee from "react-fast-marquee";
import { Outlet } from "react-router-dom";
import { LoaderContext } from "../App";

const Mainlayout = ({ view ,IsSelfState,logo,message}) => {
  const [display, setDisplay] = useState(false);
  const [siderBar, setSidebar] = useState(false);
 
 
 

  const { keyNew } = useContext(LoaderContext);

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
        <Header overlayState={display} setDisplay={setDisplay} logo={logo} />
      </div>
      <div className="content-conatiner">
        <div className="container">
          <div className="upcomig-2">
            <Marquee
              gradientWidth={0}
              gradientColor="transparent"
              // --
              speed={100}
            >
              {message}
            </Marquee>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className={siderBar ? "left-sider-active" : "left-sider"}>
              <SiderBar
                closeSidebar={closeSidebar}
                siderBar={siderBar}
                IsSelfState={IsSelfState}
                setSidebar={setSidebar}
              />
            </div>
            <div className="content" onClick={closeSidebar}>
              {view && <Outlet key={keyNew} context={[IsSelfState]} />}
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
