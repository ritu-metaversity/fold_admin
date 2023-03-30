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
const MoreCard = ({ Apifun, data, handleCancelfunction }) => {
  const isMobile = useMediaQuery("(min-width: 768px)");

  const items = [
    {
      key: "0",
      label: "Profile",
      children: (
        <Profile data={data} handleCancelfunction={handleCancelfunction} />
      ),
    },
    {
      key: "1",
      label: isMobile ? "Change Password" : "C Pass",
      children: (
        <Changpassword
          data={data}
          handleCancelfunction={handleCancelfunction}
        />
      ),
    },
    {
      key: "2",
      label: isMobile ? "User lock" : "lock",
      children: (
        <UserLock
          data={data}
          handleCancelfunction={handleCancelfunction}
          Apifun={Apifun}
        />
      ),
    },
    {
      key: "3",
      label: isMobile ? "Accounts history" : "Acc history",
      children: (
        <Transaction
          data={5}
          dataTransaction={data}
          handleCancelfunction={handleCancelfunction}
        />
      ),
    },
    {
      key: "4",
      label: "Edit Profile",
      children: (
        <EditProfile data={data} handleCancelfunction={handleCancelfunction} />
      ),
    },
  ];

  return (
    <div className="more-modal">
      <Tabs
        defaultActiveKey="0"
        type="card"
        items={items}
        destroyInactiveTabPane
      ></Tabs>
    </div>
  );
};

export default MoreCard;
