import { Button } from "antd";
import React, { useState } from "react";
import BookMarkRow from "./BookmarkRow";
import FancyRow from "./FancyRow";
import MatchOddsRow from "./MatchOddsRow";
////
import "./styles.scss";

const FancyTable = ({ data, name, prev }) => {
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
            >
              min:100 max:1l
            </div>
          </div>
        </div>

        {data.map((item, rowIndex) => (
          <FancyRow data={item} prev={prev[rowIndex]} />
        ))}
      </div>
    </div>
  );
};

export default FancyTable;
