import { Tabs } from "antd";
import React from "react";
import Mainlayout from "../../common/Mainlayout";
import BetHistorytable from "../../components/table/betHistoryTable/BetHistorytable";

import Casinotable from "../../components/table/currentBets/casino/CasionTable";

// import "./styles.scss";
const BetHistory = () => {
  return (
    <Mainlayout>
      <div className="more-modal currentBets-Tab">
        <div className="heading">
          <h4 style={{ fontSize: "15px!important" }}>Bet History</h4>
        </div>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="Sports" key="1">
            <BetHistorytable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Mainlayout>
  );
};

export default BetHistory;
