import React, { useEffect } from "react";
import { Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import "./styles.scss";
import { Log_Out } from "../../routes/Routes";
import axios from "axios";
import { MdOutlinePayment } from "react-icons/md";
import { FaImage } from "react-icons/fa";
const { SubMenu } = Menu;
const SiderBar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const logout = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Log_Out}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        navigate("/");
        localStorage.clear();
        message.success(res.data.message);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
    //
  };
  const item = [
    {
      key: "1",
      icon: <AiFillDashboard />,
      label: <Link to="">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <TbBrandGoogleAnalytics />,
      label: <Link to="/marketanalysis">Market Analysis</Link>,
    },
    {
      key: "3",
      icon: <RiAccountCircleFill />,
      label: "Accounts",
      children: [
        {
          key: "4",
          label: (
            <Link to="/activeUser">
              <p className="acount-list">Accounts List for Active Users</p>
            </Link>
          ),
        },
        {
          key: "5",
          label: <Link to="/accountList">Accounts List</Link>,
        },
        {
          key: "6",
          label: <Link to="/creatAaccounts">Create Accounts</Link>,
        },
        userType == "4"
          ? {
              key: "7",
              label: <Link to="/createdomain">Create Domain</Link>,
            }
          : "",
      ],
    },
    {
      key: "8",
      icon: <RiBankFill />,
      label: <Link to="/bank">Bank</Link>,
    },
    {
      key: "9",
      icon: <RiBankFill />,
      label: <Link to="/Payment-method">Add Payment Method</Link>,
    },
    {
      key: "10",
      icon: <FaImage />,
      label: <Link to="/Update-Banner">Banner</Link>,
    },
    {
      key: "11",
      icon: <TbFileReport />,
      label: "Report",
      children: [
        {
          key: "12",

          label: <Link to="/currentsBets">CURRENT BETS</Link>,
        },
        {
          key: "13",

          label: <Link to="/betHistory"> BETS HISTORY</Link>,
        },
      ],
    },
    {
      key: "14",
      icon: <MdOutlinePayment />,
      label: "Payment Method",
      // children: [
      //   {
      //     key: "15",

      //     label: <Link to="">CURRENT BETS</Link>,
      //   },
      //   {
      //     key: "16",

      //     label: <Link to=""> BETS HISTORY</Link>,
      //   },
      // ],
    },
    {
      key: "17",
      icon: <CiLogout />,
      label: <span onClick={logout}>Log Out</span>,
    },
  ];
  return (
    <div>
      <Menu
        theme="dark"
        style={{ width: 256 }}
        items={item}
        mode="inline"
        className="sider-bar"
      ></Menu>
    </div>
  );
};

export default SiderBar;
