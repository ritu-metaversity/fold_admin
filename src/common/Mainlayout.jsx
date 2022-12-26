import React from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import SiderBar from "../components/sider/SiderBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import "./styles.scss";
const Mainlayout = ({ children }) => {
  const [siderBar, setSidebar] = useState(false);

  const ShowSideBar = () => {
    setSidebar(!siderBar);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  return (
    <>
      <div className="header">
        <Header />
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
