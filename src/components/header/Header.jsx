import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown, Space } from "antd";
import { BsWallet2 } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import img from "../../assets/img/logo.png";
import "./styles.scss";

const Header = ({ SiderBar, setSidebar }) => {
  const items = [
    {
      label: (
        <a href="/">
          <BsWallet2 />
          Self Deposit
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="/">
          <HiOutlineKey />
          Change Password
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a href="/">
          <FiLogOut />
          Log Out
        </a>
      ),
      key: "3",
    },
  ];
  return (
    <>
      <div className="header-col">
        <div className="logo">
          <img src={img} alt="" />
          {/* <h2>{}</h2> */}
        </div>

        <div className="up-coming">
          <marquee width="100%" direction="right" height="100%">
            This is a sample scrolling text that has scrolls texts to right.
          </marquee>
        </div>
        <div class="serch-input">
          <input
            type="text"
            class="form-control bg-transparent shadow-none border-0"
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
                verygood777
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
