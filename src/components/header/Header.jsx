import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Dropdown, Space } from "antd";
import { BsWallet2 } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import img from "../../assets/img/logo.png";
import "./styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
  };

  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("username");
  const items = [
    userType === "4"
      ? {
          label: (
            <Link>
              <BsWallet2 />
              Self Deposit
            </Link>
          ),
          key: "0",
        }
      : "",
    {
      label: (
        <Link>
          <HiOutlineKey />
          Change Password
        </Link>
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
