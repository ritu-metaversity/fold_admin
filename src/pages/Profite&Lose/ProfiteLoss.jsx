import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import CasinoProfiteLossTable from "../../components/ProfiteLossTable/CasinoProfiteLossTable";
import SportProfiteLossTable from "../../components/ProfiteLossTable/SportProfiteLossTable";

// import "./styles.scss";
const ProfiteLoss = () => {
  const items = [
    {
      label: "Sports",
      key: 1,
      children: <SportProfiteLossTable id={1} />,
    },
    {
      label: "Casino",
      key: 2,
      children: <CasinoProfiteLossTable id={2} />,
      // ,
    },
  ];

  return (
    <>
      <div className="more-modal currentBets-Tab">
        <div className="hading-create-accounts">
          <h4>Profite & Loss</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            {/* <NavLink to="/activeUser">User / </NavLink> */}
            <NavLink style={{ color: "#74788d" }}>PROFITE & LOSS</NavLink>
          </p>
        </div>
        <Tabs
          defaultActiveKey="0"
          type="card"
          items={items}
          destroyInactiveTabPane
        ></Tabs>
      </div>
    </>
  );
};

export default ProfiteLoss;
