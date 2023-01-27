import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import PaymentForm from "../../components/createDomaincard/PaymentMethodForm";

const PaymentMethodPage = () => {
  return (
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4> Payment Method</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/activeUser">User / </NavLink>
          <NavLink to="/Payment-method" style={{ color: "#74788d" }}>
            Payment Method
          </NavLink>
        </p>
      </div>

      <PaymentForm />
    </Mainlayout>
  );
};

export default PaymentMethodPage;
