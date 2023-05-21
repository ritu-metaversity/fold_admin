import React from "react";
import { NavLink } from "react-router-dom";
import CreateHelperForm from "../../components/createHelperForm/CreateHelperForm";
import "./styles.scss";
const CreateHelper = () => {
  return (
    <div>
      <div className="hading-create-accounts">
        <h4>MULTILOGIN ACCOUNT</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/create-helper" style={{ color: "#74788d" }}>
            Multi Login Account
          </NavLink>
        </p>
      </div>
      <div className="create-helper-form-div">
        <CreateHelperForm />
      </div>
    </div>
  );
};

export default CreateHelper;
