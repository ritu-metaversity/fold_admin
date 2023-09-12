import React from "react";
import { NavLink } from "react-router-dom";
import Accountform from "../../components/craeteAccountForm/Form2";
///styles
import "./styles.scss";
import { CreatAaccounts_Commission_Screen } from "../../routes/Routes";
const CreateAccount = ({ IsSelfState }) => {
  return (
    <>
      <div className="hading-create-accounts">
        <h4> Create Accounts Commission</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink
            to={CreatAaccounts_Commission_Screen}
            style={{ color: "#74788d" }}
          >
            Create Accounts Commission
          </NavLink>
        </p>
      </div>
      <div className="section">
        <Accountform IsSelfState={IsSelfState} />
      </div>
    </>
  );
};

export default CreateAccount;
