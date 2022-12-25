import { Tabs } from "antd";
import React from "react";
import Mainlayout from "../../common/Mainlayout";
import Casinotable from "../../components/table/currentBets/casino/CasionTable";
import CurrentBetsTable from "../../components/table/currentBets/sports/Currentbets ";
import "./styles.scss";
const CurrentBets = () => {
  return (
    <Mainlayout>
      <div className="more-modal currentBets-Tab">
        <div className="heading">
          <h4 style={{ fontSize: "15px!important" }}>Current Bets</h4>
        </div>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="Sports" key="1">
            <CurrentBetsTable />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Casion" key="2">
            <Casinotable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Mainlayout>
  );
};

export default CurrentBets;
