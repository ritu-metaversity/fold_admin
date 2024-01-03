import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import LoginHistory from "../../components/userHistoryComponent/LoginHistory";
import {
  Change_Password_History,
  User_Login_History,
} from "../../routes/Routes";

import { UserModalContext } from "../activeUser/ActiveUser";

///styles
import "./styles.scss";

const UserHistory = () => {
  const url = [User_Login_History, Change_Password_History];
  const namearr = ["Login History", "Change Password History"];
  const fileName = ["Login History", "Change Password History"];

  const items = url.map((res, index) => {
    return {
      key: index + url[index],
      label: namearr[index],
      children: (
        <LoginHistory
          url={url[index]}
          key={index + url[index]}
          reportFile={fileName[index]}
        />
      ),
    };
  });

  return (
    <UserModalContext.Provider value={{}}>
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
          defaultActiveKey="1"
          type="card"
          items={items}
          destroyInactiveTabPane
        ></Tabs>
      </div>
    </UserModalContext.Provider>
  );
};

export default UserHistory;
