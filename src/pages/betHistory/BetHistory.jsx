import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import BetHistorytable from "../../components/table/betHistoryTable/BetHistorytable";
import Casinotable from "../../components/table/currentBets/casino/CasionTable";

// import "./styles.scss";
const BetHistory = () => {
  const items = [
    {
      label: "Sports",
      key: 1,
      children: <BetHistorytable id={1} />,
    },
    {
      label: "Casino",
      key: 2,
      children: <Casinotable id={2} />,
    },
  ];

  return (
    <>
      <div className="more-modal currentBets-Tab">
        <div className="hading-create-accounts">
          <h4>Bet History</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            {/* <NavLink to="/activeUser">User / </NavLink> */}
            <NavLink style={{ color: "#74788d" }}>Bet History</NavLink>
          </p>
        </div>
        <Tabs defaultActiveKey="0" type="card" items={items}></Tabs>
      </div>
    </>
  );
};

export default BetHistory;
