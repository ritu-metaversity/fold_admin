import { Button, Collapse } from "antd";
import React from "react";
const { Panel } = Collapse;
const TestPageRightCollapse = () => {
  return (
    <div>
      <div className="heading-match-bet">
        <h5>MY BETS</h5>
        <Button
          style={{
            padding: "3px",
            background: "#F18521",
            border: "none",
            color: "white",
            borderRadius: "4px",
          }}
        >
          View more
        </Button>
      </div>
    </div>
  );
};

export default TestPageRightCollapse;
