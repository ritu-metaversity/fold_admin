import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import BetHistorytable from "../../components/table/betHistoryTable/BetHistorytable";

// import "./styles.scss";
const BetHistory = () => {
  const items = [
    {
      label: "Sports",
      key: "0",
      children: <BetHistorytable />,
    },
  ];

  return (
    <Mainlayout>
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
    </Mainlayout>
  );
};

export default BetHistory;
