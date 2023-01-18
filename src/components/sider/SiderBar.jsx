import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import "./styles.scss";
const { SubMenu } = Menu;
const SiderBar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
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
      label: "Market Analysis",
      children: [
        {
          key: "4",
          label: <Link to="/activeUser">Accounts List for Active Users</Link>,
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
      label: <Link to="/bank">Market Analysis</Link>,
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
      label: (
        <Link to="/" onClick={logout}>
          Log Out
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Menu
        theme="dark"
        style={{ width: 256 }}
        items={item}
        mode="inline"
      ></Menu>
    </div>
  );
};

export default SiderBar;
