import { Button, Spin } from "antd";
import React from "react";
import BookMarkRow from "./BookmarkRow";
////
import "./styles.scss";

const Bookmarktable = ({ data, prev, pnlData, maxbet }) => {
  if (data) {
    return (
      <div>
        <div className="collapse-table-container">
          <div className="table-row-heading">
            <div className="left-text">
              <p>
                {/* {maxbet?.Bookmaker[0]} */}
                min:{maxbet?.Bookmaker[0].minBet} max:
                {maxbet?.Bookmaker[0].maxBet}
              </p>
            </div>
            <div className="right-col-btn">
              <Button>Back</Button>
              <Button>Lay</Button>
            </div>
          </div>

          <BookMarkRow
            name={"Pakistan"}
            data={data}
            prev={prev}
            pnlData={pnlData}
          />
        </div>
      </div>
    );
  } else {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
};

export default Bookmarktable;
