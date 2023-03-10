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
<<<<<<< HEAD
      key: "0",
=======
      key: 1,
>>>>>>> origin/feature
      children: <BetHistorytable id={1} />,
    },
    {
      label: "Casino",
<<<<<<< HEAD
      key: "1",
      children: <BetHistorytable id={2} />,
=======
      key: 2,
      children: <Casinotable id={2} />,
>>>>>>> origin/feature
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
