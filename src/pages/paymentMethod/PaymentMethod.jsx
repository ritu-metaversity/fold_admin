import React from "react";
import { NavLink } from "react-router-dom";
import PaymentForm from "../../components/createDomaincard/PaymentMethodForm";

const PaymentMethodPage = () => {
  return (
    <>
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
    </>
  );
};

export default PaymentMethodPage;
