import { Tabs } from "antd";
import React from "react";
import Mainlayout from "../../common/Mainlayout";
import Casinotable from "../../components/table/currentBets/casino/CasionTable";
import CurrentBetsTable from "../../components/table/currentBets/sports/Currentbets ";
import "./styles.scss";
const CurrentBets = () => {
  const items = [
    {
      label: "Sports",
      key: "0",
      children: <CurrentBetsTable />,
    },
    {
      label: "Casion",
      key: "1",
      children: <Casinotable />,
    },
  ];
  return (
    <Mainlayout>
      <div className="more-modal currentBets-Tab">
        <div className="heading">
          <h4 style={{ fontSize: "15px!important" }}>Current Bets</h4>
        </div>
        <Tabs defaultActiveKey="0" type="card" items={items}></Tabs>
      </div>
    </Mainlayout>
  );
};

export default CurrentBets;
