import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import DomainCard from "../../components/createDomaincard/DomainCard";

const CreateDomain = () => {
  return (
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4>Create Domain</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/createdomain" style={{ color: "#74788d" }}>
            Create Domain
          </NavLink>
        </p>
      </div>

      <DomainCard />
    </Mainlayout>
  );
};

export default CreateDomain;
