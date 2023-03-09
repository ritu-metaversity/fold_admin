import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import QrForm from "../../components/BankMethodForm.jsx/Qr";

const QR = () => {
  return (
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4 style={{ fontSize: "15px!important" }}>ADD QR Code</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to="/bank/add-qr-code" style={{ color: "#74788d" }}>
            ADD QR Code
          </NavLink>
        </p>
      </div>
      <QrForm />
    </Mainlayout>
  );
};

export default QR;
