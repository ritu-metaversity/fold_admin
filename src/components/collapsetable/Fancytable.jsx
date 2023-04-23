/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import React from "react";
import FancyRow from "./FancyRow";
////
import "./styles.scss";

const FancyTable = ({ data, prev, maxbet, fancyPnldata }) => {
  return (
    <div>
      <div className="collapse-table-container">
        <div
          className="row"
          style={{
            display: "flex",
            height: "32px",
            alignItems: "center",
          }}
        >
          <div className="left-col-fancy" style={{ opacity: "0" }}></div>
          <div className="colwrapper">
            <div
              className="middle-col-fancy"
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "5px",
              }}
            >
              <Button
                className="header-btn"
                style={{
                  height: "32px",

                  background: "#E16F9A",
                }}
              >
                No
              </Button>
              <Button
                className="header-btn"
                style={{
                  height: "32px",
                  background: "#4FA1DC",
                }}
              >
                Yes
              </Button>
            </div>
            <div
              className="right-col-fancy"
              style={{ opacity: "0", display: "flex", flexWrap: "wrap" }}
            ></div>
          </div>
        </div>

        {data?.map((item, rowIndex, index) => {
          let bet = 0;
          if (fancyPnldata) {
            if (Object?.keys(fancyPnldata)?.includes(item?.sid)) {
              bet = fancyPnldata[item?.sid];
            }
          }

          return (
            <React.Fragment key={item?.sid + rowIndex?.sid + index}>
              <FancyRow
                data={item}
                prev={prev[rowIndex]}
                bet={bet}
                maxbet={
                  maxbet?.length && maxbet.find((id) => id.sid == item.sid)
                }
                // maxbet={maxbet?.length && maxbet[rowIndex]}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FancyTable;
