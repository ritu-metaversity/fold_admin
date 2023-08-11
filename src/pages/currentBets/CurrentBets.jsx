import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Casinotable from "../../components/table/currentBets/casino/CasionTable";
import CurrentBetsTable from "../../components/table/currentBets/sports/Currentbets ";
import "./styles.scss";
const CurrentBets = () => {
  const items = [
    {
      label: "Sports",
      key: "0",
      children: <CurrentBetsTable id={1} />,
    },
    {
      label: "Casino",
      key: "1",
      children: <Casinotable  />,
    },
  ];
  return (
    <>
      <div className="more-modal currentBets-Tab">
        <div className="hading-create-accounts">
          <h4>Current Bets</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            {/* <NavLink to="/activeUser">User / </NavLink> */}
            <NavLink to="/currentsBets" style={{ color: "#74788d" }}>
              Current Bets
            </NavLink>
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

export default CurrentBets;
