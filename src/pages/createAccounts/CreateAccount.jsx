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
          <NavLink to="">Home / </NavLink>
          <NavLink to="/activeUser">User / </NavLink>
          <NavLink to="">Create Accounts</NavLink>
        </p>
      </div>
      <div className="section">
       <Accountform/>
      </div>
    </Mainlayout>
  );
};

export default CreateAccount;
