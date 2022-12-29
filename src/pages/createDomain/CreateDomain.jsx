import React from "react";
import Mainlayout from "../../common/Mainlayout";
import DomainCard from "../../components/createDomaincard/DomainCard";

const CreateDomain = () => {
  return (
    <Mainlayout>
      <div style={{ margin: "20px" }}>
        <h3 style={{ color: "#555" }}>Account List For Active Users</h3>
        <DomainCard />
      </div>
    </Mainlayout>
  );
};

export default CreateDomain;
