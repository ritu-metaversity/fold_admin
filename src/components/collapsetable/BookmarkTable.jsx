import { Button, Spin } from "antd";
import React, { useState } from "react";
import BookMarkRow from "./BookmarkRow";
import MatchOddsRow from "./MatchOddsRow";
////
import "./styles.scss";

const Bookmarktable = ({ data, name, prev }) => {
  if (data) {
    return (
      <div>
        <div className="collapse-table-container">
          <div className="table-row-heading">
            <div className="left-text">
              <p>{name}</p>
            </div>
            <div className="right-col-btn">
              <Button>Back</Button>
              <Button>Lay</Button>
            </div>
          </div>

          <BookMarkRow name={"Pakistan"} data={data} prev={prev} />
        </div>
      </div>
    );
  } else {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
};

export default Bookmarktable;
