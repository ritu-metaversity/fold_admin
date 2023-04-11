import React, { Suspense } from "react";
import TestPageRightCollapse from "../../components/collapse/TestPageRightCollapse";
import MyBets from "../../components/collapsetable/MyBets";

import "./styles.scss";
const TestPageLeftCollapse = React.lazy(() =>
  import("../../components/collapse/TestPageLeftCollapse")
);
///styles
const Testmatch = () => {
  return (
    <>
      <div className="container-test-match">
        <div className="left-body-container">
          <div className="Collapse">
            <Suspense fallback={""}>
              <TestPageLeftCollapse />
            </Suspense>
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
