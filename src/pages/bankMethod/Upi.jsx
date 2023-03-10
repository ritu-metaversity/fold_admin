import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import UpiForm from "../../components/BankMethodForm.jsx/UpiForm";

const Upi = () => {
  return (
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4 style={{ fontSize: "15px!important" }}>ADD UPI</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to="/Upi_Method_Screen" style={{ color: "#74788d" }}>
            ADD UPI
          </NavLink>
        </p>
      </div>
      <UpiForm />
    </Mainlayout>
  );
};

export default Upi;
