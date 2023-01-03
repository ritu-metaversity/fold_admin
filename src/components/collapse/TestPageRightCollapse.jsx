import { Collapse } from "antd";
import React from "react";
const { Panel } = Collapse;
const TestPageRightCollapse = () => {
  return (
    <div>
      <Collapse bordered={false}>
        <Panel header="LIVE MATCH" key="1" className="live-match-header">
          <div className="live-match-section">
            <iframe src="" frameborder="0" style={{ height: "254px" }}></iframe>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default TestPageRightCollapse;
