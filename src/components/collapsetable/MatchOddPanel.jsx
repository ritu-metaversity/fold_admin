import { Button, Spin } from "antd";
import React from "react";
import MatchOddsRow from "./MatchOddsRow";
////
import "./styles.scss";

const MatchOddTable = ({ data, prev, pnlData, maxbet }) => {
  if (!data) return <Spin style={{ width: "100%", margin: "auto" }} />;
  else {
    return (
      <div>
        <div className="collapse-table-container">
          <div className="table-row-heading">
            <div className="left-text">
              {" "}
              <p>
                {/* {maxbet?.Bookmaker[0]} */}
                {/* ihiu */}
                min:{maxbet?.minBet} max:
                {maxbet?.maxBet}
              </p>
            </div>
            <div className="right-col-btn">
              <Button>Back</Button>
              <Button>Lay</Button>
            </div>
          </div>
          {/* {console.log(data, "pnlData")}
          {console.log(pnlData, "Data")} */}
          <MatchOddsRow
            name={"Pakistan"}
            data={data}
            prev={prev}
            pnlData={pnlData}
          />
        </div>
      </div>
    );
  }
};

export default MatchOddTable;
