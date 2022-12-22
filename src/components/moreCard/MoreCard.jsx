import { Tabs } from "antd";
import React from "react";
import { useMediaQuery } from "../modalForm/UseMedia";
import Changpassword from "./components/changepassword/Changpassword";
import EditProfile from "./components/editprofile/Editprofile";
import Profile from "./components/profile/Profile";
import Transaction from "./components/transaction/Transaction";
import UserLock from "./components/userlock/UserLock";
///styles
import "./styles.scss";
const MoreCard = ({ data }) => {
  const isMobile = useMediaQuery("(min-width: 768px)");

  return (
    <div className="more-modal">
      <Tabs
        defaultActiveKey="1"
        type="card"
        // size={size}
      >
        <Tabs.TabPane tab="Profile" key="1">
          <Profile data={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={isMobile ? "Change Password" : "C Pass"} key="2">
          <Changpassword data={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={isMobile ? "User lock" : "lock"} key="3">
          <UserLock data={data} />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={isMobile ? "Accounts history" : "Acc history"}
          key="4"
        >
          <Transaction data={5} dataTransaction={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Edit Profile" key="5">
          <EditProfile data={data} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MoreCard;
