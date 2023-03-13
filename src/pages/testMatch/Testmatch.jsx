import React from "react";
import TestPageLeftCollapse from "../../components/collapse/TestPageLeftCollapse";
import TestPageRightCollapse from "../../components/collapse/TestPageRightCollapse";
import MyBets from "../../components/collapsetable/MyBets";

///styles
import "./styles.scss";
const Testmatch = () => {
  return (
    <>
      <div className="container-test-match">
        <div className="left-body-container">
          <div className="Collapse">
            <TestPageLeftCollapse />
          </div>
        </div>
        <div className="right-body-container">
          <div style={{ position: "sticky", top: "5px" }}>
            <TestPageRightCollapse />
            <MyBets />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testmatch;
