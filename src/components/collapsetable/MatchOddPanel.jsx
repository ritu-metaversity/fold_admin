import { Button, Spin } from "antd";
import React from "react";
import MatchOddsRow from "./MatchOddsRow";
////
import "./styles.scss";
const intToString = (num) => {
  // num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};
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
                {intToString(maxbet?.maxBet)}
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
