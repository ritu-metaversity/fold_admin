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
import { Link, useNavigate } from "react-router-dom";
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
import {
  get_msg,
  HelperActiveUser_Screen,
  Log_Out,
  MarketAnalysis_Screen,
} from "../../routes/Routes";
import axios from "axios";
import Marquee from "react-fast-marquee";
import LogoutModal from "../logoutModal/LogoutModal";
import RuleModal from "../ruleModal/RuleModal";
import { notifyToast } from "../toast/Tost";
const Header = ({ overlayState, setDisplay, logo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("username");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [message, setmessage] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const { userBalanceamount, userBalance, handle, setLoading } =
    useContext(LoaderContext);
  const [ruleModal, setRuleModal] = useState(false);
  const navigate = useNavigate();
  // const userBalance = async () => {
  //   await axios
  //     .post(
  //       `${import.meta.env.VITE_BASE_URL}/${User_Balance}`,
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
  const logout = async () => {
    setLoading((prev) => ({ ...prev, logout2: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Log_Out}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading((prev) => ({ ...prev, logout: false }));
        navigate("/");
        localStorage.clear();
        notifyToast().succes(res.data.message);
      })
      .catch((error) => {});

    setLoading((prev) => ({ ...prev, logout2: false }));
    //
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setRuleModal(false);
    logout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setRuleModal(false);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const showRuleModal = () => {
    setRuleModal(true);
  };
  const items = [
    userType === "4"
      ? {
          label: (
            <span
              onClick={() => {
                setModalKey(0);
                showModal();
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
            setModalKey(1);
            showModal();
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
        <span
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "12px",
          }}
          onClick={showModal2}
        >
          <FiLogOut />
          Log Out
        </span>
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
        `${import.meta.env.VITE_BASE_URL}/${get_msg}`,
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

  const poweruser_permisions = JSON.parse(
    localStorage.getItem("poweruser_permisions") || "[]"
  );

  const redirect = {
    DEPOSIT: "Deposit-Pending-Request",
    WITHDRAW: "Widrwal-Pending-Request",
    ALL: "Deposit-Pending-Request",
    USER_LOCK: HelperActiveUser_Screen,
    ACTIVE_USER: HelperActiveUser_Screen,
    USER_PASSWORD_CHANGE: HelperActiveUser_Screen,
    BET_LOCK: HelperActiveUser_Screen,
  };
  return (
    <>
      <RuleModal
        ruleModal={ruleModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <LogoutModal
        handleOk={handleOk}
        isModalOpen={isModalOpen2}
        handleCancel={handleCancel}
      />
      <div
        className="drop"
        style={{ display: !overlayState ? "none" : "block" }}
      >
        <DropDownHeader
          pts={userBalanceamount}
          logout={logout}
          showRuleModal={showRuleModal}
        />
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
          <Changpasswordheader
            handleCancelfunction={handleCancel}
            logout={logout}
          />
        )}
      </Modal>
      <div className="header-col">
        <div className="logo">
          <Link
            to={
              userType === "7"
                ? redirect[poweruser_permisions[0]]
                : "/marketAnalysis"
            }
          >
            <img src={logo} alt="" style={{ paddingTop: "5px" }} />
          </Link>
        </div>

        <div className="up-coming">
          <Marquee
            width="100%"
            height="100%"
            speed={100}
            gradientWidth={0}
            gradientColor="transparent"
          >
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
              <span
                style={{
                  color: "#FDCF13",
                  fontWeight: "500",
                  paddingRight: "5px",
                  cursor: "pointer",
                }}
                onClick={showRuleModal}
              >
                Rule
              </span>
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
