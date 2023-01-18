import { Tabs } from "antd";
import React from "react";
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
        <div className="heading">
          <h4 style={{ fontSize: "15px!important" }}>Bet History</h4>
        </div>
        <Tabs defaultActiveKey="0" type="card" items={items}></Tabs>
      </div>
    </Mainlayout>
  );
};

export default BetHistory;
