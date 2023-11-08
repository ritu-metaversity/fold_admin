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
import CasinoLock from "./components/casinoLock";
import ExposureLimit from "./components/ExposureLimit";
const MoreCard = ({ Apifun, data, handleCancelfunction, helper }) => {
  const isMobile = useMediaQuery("(min-width: 768px)");
  const findPermission = JSON.parse(
    localStorage.getItem("poweruser_permisions") || "[]"
  );
  const filterPermission = (item, permissions) => {
    let newItem = [];
    newItem = item.filter((itemEle) => {
      const isThere = Array.isArray(itemEle.permissions)
        ? itemEle.permissions.some((element) => permissions.includes(element))
        : false;
      if (Array.isArray(itemEle.children)) {
        itemEle.children = filterPermission(itemEle.children, permissions);
      }
      return isThere;
    });

    return newItem;
  };
  const items = [
    {
      key: "0",
      label: "Profile",
      children: (
        <Profile data={data} handleCancelfunction={handleCancelfunction} />
      ),
      permissions: ["ADMIN"],
    },
    {
      key: "1",
      label: isMobile ? "Change Password" : "C Pass",
      children: (
        <Changpassword
          data={data}
          handleCancelfunction={handleCancelfunction}
          helper={helper}
        />
      ),
      permissions: ["ALL", "ADMIN", "USER_PASSWORD_CHANGE"],
    },
    {
      key: "2",
      label: isMobile ? "User lock" : "lock",
      children: (
        <UserLock
          data={data}
          handleCancelfunction={handleCancelfunction}
          Apifun={Apifun}
          helper={helper}
        />
      ),
      permissions: ["ALL", "USER_LOCK", "ADMIN", "BET_LOCK"],
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
      permissions: ["ADMIN"],
    },
    {
      key: "4",
      label: "Edit Profile",
      children: (
        <EditProfile data={data} handleCancelfunction={handleCancelfunction} />
      ),
      permissions: ["ADMIN"],
    },
    {
      key: "5",
      label: "Casino Allowed",
      children: (
        <CasinoLock
          userData={data}
          handleCancelfunction={handleCancelfunction}
        />
      ),
      permissions: ["ADMIN"],
    },
    
    {
      key: "6",
      label: "Exposure Limit",
      children: (
        <ExposureLimit
          userData={data}
          handleCancelfunction={handleCancelfunction}
        />
      ),
      permissions: ["ADMIN"],
    },
  ];

  return (
    <div className="more-modal">
      <Tabs
        defaultActiveKey="0"
        type="card"
        items={filterPermission(items, findPermission)}
        destroyInactiveTabPane
      ></Tabs>
    </div>
  );
};

export default MoreCard;
