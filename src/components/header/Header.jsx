/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown, Modal, Space } from "antd";
import { BsWallet2 } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import SelfDepositForm from "../selfDeposit/SelfDeposit";
import { CgMinimize } from "react-icons/cg";
// import Changpassword from "../moreCard/components/changepassword/Changpassword";
import Changpasswordheader from "../moreCard/components/changepassword/headerchangePassword";
// import { User_Balance } from "../../routes/Routes";
// import axios from "axios";
import DropDownHeader from "../dropDownMobileView/DropDownHeader";
import { useMediaQuery } from "../modalForm/UseMedia";
import { LoaderContext } from "../../App";
import { get_msg, MarketAnalysis_Screen } from "../../routes/Routes";
import axios from "axios";
import Marquee from "react-fast-marquee";
const Header = ({ overlayState, setDisplay, logo }) => {
  const logout = () => {
    localStorage.clear();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("username");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [message, setmessage] = useState("");

  const { userBalanceamount, userBalance, handle } = useContext(LoaderContext);

  // const userBalance = async () => {
  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/${User_Balance}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setUserBalance(res.data?.data?.balance);
  //       // console.log(res.data.data.balance);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     userBalance();
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    userType === "4"
      ? {
          label: (
            <span
              onClick={() => {
                showModal();
                setModalKey(0);
              }}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              <BsWallet2 />
              Self Deposit
            </span>
          ),
          key: 0,
        }
      : "",
    {
      label: (
        <span
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "12px",
          }}
          onClick={() => {
            showModal();
            setModalKey(1);
          }}
        >
          <HiOutlineKey />
          Change Password
        </span>
      ),
      key: 1,
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link to="/" onClick={logout}>
          <FiLogOut />
          Log Out
        </Link>
      ),
      key: "3",
    },
  ];
  useEffect(() => {
    userBalance();
  }, []);
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
      <div
        className="drop"
        style={{ display: !overlayState ? "none" : "block" }}
      >
        <DropDownHeader pts={userBalanceamount} />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-self-deposit"
        destroyOnClose
      >
        {modalKey === 0 ? (
          <SelfDepositForm handleCancel={handleCancel} />
        ) : (
          <Changpasswordheader handleCancelfunction={handleCancel} />
        )}
      </Modal>
      <div className="header-col">
        <div className="logo">
          <Link to={MarketAnalysis_Screen}>
            <img src={logo} alt="" style={{ paddingTop: "5px" }} />
          </Link>
        </div>

        <div className="up-coming">
          <Marquee width="100%" height="100%" speed={100}>
            {message}
          </Marquee>
        </div>
        <div className="serch-input">
          <input
            type="text"
            className="form-control bg-transparent shadow-none border-0"
            placeholder="search"
          />
          <AiOutlineSearch />
        </div>
        <div className="rule">
          <div className="col-1">
            {handle.active ? (
              <CgMinimize
                style={{ fontSize: "24px", color: "white" }}
                // onClick={() => window.requestFullscreen()}
                onClick={handle.exit}
              />
            ) : (
              <BiFullscreen
                style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
                // onClick={() => window.requestFullscreen()}
                onClick={handle.enter}
              />
            )}
          </div>

          <div className="col-2">
            <IoIosAlert style={{ fontWeight: "500" }} />
            <p>
              <span style={{ color: "#FDCF13", fontWeight: "500" }}>Rule</span>
              PTS: {userBalanceamount}
            </p>
          </div>
        </div>
        <div className="select">
          {/* <DropDownHeader /> */}
          {!isMobile ? (
            <div
              style={{ fontSize: "22px" }}
              onClick={() => setDisplay(!overlayState)}
            >
              <span
                onClick={(e) => e.preventDefault()}
                style={{ color: "white" }}
              >
                {userName}
                <RiArrowDropDownLine />
              </span>
            </div>
          ) : (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              children={
                <div>
                  <span onClick={(e) => e.preventDefault()}>
                    <Space>
                      {userName}
                      <RiArrowDropDownLine />
                    </Space>
                  </span>
                </div>
              }
            ></Dropdown>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
