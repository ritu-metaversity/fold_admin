import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import LoginHistory from "../../components/userHistoryComponent/LoginHistory";
import {
  Change_Password_History,
  User_Login_History,
} from "../../routes/Routes";

import { UserModalContext } from "../activeUser/ActiveUser";

///styles
import "./styles.scss";

const UserHistory = () => {
  const items = [
    {
      key: "1",
      label: "Login History",
      children: <LoginHistory url={User_Login_History} />,
    },
    {
      key: "2",
      label: "Change Password History",
      children: <LoginHistory url={Change_Password_History} />,
    },
  ];
  return (
    <UserModalContext.Provider value={{}}>
      <Mainlayout>
        <div className="hading-create-accounts">
          <h4>USER HISTORY</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            <NavLink to="" style={{ color: "#74788d" }}>
              USER HISTORY
            </NavLink>
          </p>
        </div>
        <div className="user-history-tab">
          <Tabs
            defaultActiveKey="0"
            type="card"
            items={items}
            destroyInactiveTabPane
          ></Tabs>
        </div>
      </Mainlayout>
    </UserModalContext.Provider>
  );
};

export default UserHistory;
