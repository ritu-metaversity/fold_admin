import React, { useEffect } from "react";
import { Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import "./styles.scss";
import { Log_Out } from "../../routes/Routes";
import axios from "axios";
const { SubMenu } = Menu;
const SiderBar = ({ closeSidebar }) => {
  const navigate = useNavigate();

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
        message.success(res.data.message);
        navigate("/");
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
        {
          key: "7",
          label: <Link to="/createdomain">Create Domain</Link>,
        },
      ],
    },
    {
      key: "8",
      icon: <RiBankFill />,
      label: <Link to="/bank">Bank</Link>,
    },

    {
      key: "9",
      icon: <TbFileReport />,
      label: "Report",
      children: [
        {
          key: "10",

          label: <Link to="/currentsBets">CURRENT BETS</Link>,
        },
        {
          key: "11",

          label: <Link to="/betHistory"> BETS HISTORY</Link>,
        },
      ],
    },
    {
      key: "12",
      icon: <RiBankFill />,
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
