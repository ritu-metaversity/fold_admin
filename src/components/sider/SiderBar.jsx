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
    console.log(localStorage.removeItem("token"));

    navigate("/");
  };

  return (
    <div>
      <Menu theme="dark" style={{ width: 256 }} mode="inline">
        <Menu.Item icon={""} key="1">
          <Link to="/">
            <AiFillDashboard />
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item icon={""} key="2">
          <Link to="/marketanalysis">
            <TbBrandGoogleAnalytics />
            Market Analysis
          </Link>
        </Menu.Item>
        <SubMenu
          key="3"
          title={
            <span>
              <RiAccountCircleFill />
              Account
            </span>
          }
        >
          <Menu.Item key="4" style={{ paddingLeft: "40px!important" }}>
            <Link to="/activeUser">Accounts List for Active Users</Link>{" "}
          </Menu.Item>
          <Menu.Item key="5" style={{ paddingLeft: "40px!important" }}>
            <Link to="/accountList">Accounts List</Link>{" "}
          </Menu.Item>
          <Menu.Item key="6" style={{ paddingLeft: "40px!important" }}>
            <Link to="/creatAaccounts">Create Accounts</Link>{" "}
          </Menu.Item>
          <Menu.Item key="7" style={{ paddingLeft: "40px!important" }}>
            <Link to="/createdomain">Create Domain</Link>{" "}
          </Menu.Item>
        </SubMenu>
        <Menu.Item icon={""} key="8">
          <Link to="/bank">
            <RiBankFill />
            Bank
          </Link>
        </Menu.Item>

        <SubMenu
          key="sub3"
          title={
            <span to="/news">
              <TbFileReport />
              Report
            </span>
          }
        >
          <Menu.Item
            key="9"
            style={{
              paddingLeft: "40px!important",
              borderTop: "1px solid gray",
            }}
          >
            <Link to="/currentsBets">CURRENT BETS</Link>
          </Menu.Item>
          <Menu.Item key="10" style={{ paddingLeft: "40px!important" }}>
            <Link to="/betHistory"> BETS HISTORY</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item icon={""} key="11">
          <Link to="/" onClick={logout}>
            <RiBankFill />
            Log Out
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SiderBar;
