import React from "react";
import { NavLink } from "react-router-dom";
import BankForm from "../../components/BankMethodForm.jsx/BankForm";

const BankPage = () => {
  return (
    <>
      <div className="hading-create-accounts">
        <h4 style={{ fontSize: "15px!important" }}>ADD Bank</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to="/Bank_Method_Screen" style={{ color: "#74788d" }}>
            ADD Bank
          </NavLink>
        </p>
      </div>
      <BankForm />
    </>
  );
};

export default BankPage;
