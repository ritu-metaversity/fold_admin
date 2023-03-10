import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import SiderBar from "../components/sider/SiderBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import "./styles.scss";
import axios from "axios";
import { get_msg } from "../routes/Routes";
import Marquee from "react-fast-marquee";
const Mainlayout = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [siderBar, setSidebar] = useState(false);
  const [message, setmessage] = useState("");
  const ShowSideBar = () => {
    setSidebar(!siderBar);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  const clickfun = () => {
    setDisplay(!display);
  };

  const getMsg = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${get_msg}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setmessage(res?.data?.message);
      });
  };
  useEffect(() => {
    getMsg();
  }, []);
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
            <Marquee style={{ margin: "auto" }}>{message}</Marquee>
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
