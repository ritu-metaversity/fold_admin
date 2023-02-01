import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown, Modal, Space } from "antd";
import { BsWallet2 } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import img from "../../assets/img/logo.png";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import SelfDepositForm from "../selfDeposit/SelfDeposit";
import Changpassword from "../moreCard/components/changepassword/Changpassword";
import Changpasswordheader from "../moreCard/components/changepassword/headerchangePassword";
const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("username");

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
          key: "0",
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
      key: "1",
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
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-self-deposit"
        destroyOnClose
      >
        {modalKey == 0 ? (
          <SelfDepositForm handleCancel={handleCancel} />
        ) : (
          <Changpasswordheader />
        )}
      </Modal>
      <div className="header-col">
        <div className="logo">
          <img src={img} alt="" />
          {/* <h2>{}</h2> */}
        </div>

        <div className="up-coming">
          <marquee width="100%" height="100%">
            This is a sample scrolling text that has scrolls texts to right.
          </marquee>
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
            <BiFullscreen style={{ fontSize: "24px", color: "white" }} />
          </div>
          <div className="col-2">
            <IoIosAlert style={{ fontWeight: "500" }} />
            <p>
              {" "}
              <span style={{ color: "#FDCF13", fontWeight: "500" }}>
                Rule
              </span>{" "}
              PTS: 17,27,26,0000.00
            </p>
          </div>
        </div>
        <div className="select">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userName}
                <RiArrowDropDownLine />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
