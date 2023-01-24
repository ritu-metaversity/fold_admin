import Link from "antd/es/typography/Link";
import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import Accountform from "../../components/craeteAccountForm/Form";
///styles
import "./styles.scss";
const CreateAccount = () => {
  return (
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4>Create Account</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/activeUser">User / </NavLink>
          <NavLink to="/creatAaccounts" style={{ color: "#74788d" }}>
            Create Accounts
          </NavLink>
        </p>
      </div>
      <div className="section">
        <Accountform />
      </div>
    </Mainlayout>
  );
};

export default CreateAccount;
