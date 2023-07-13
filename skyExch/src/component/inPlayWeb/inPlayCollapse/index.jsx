import { Collapse } from "antd";
import { BsPlusSquareFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai";
import { useState } from "react";
import Title from "./Title";
import InPlayMatchRow from "../matchRow";
import React from "react";
///styles
import "./styles.scss";
const InPlayCollapse = () => {
  const [activeIcon, setActiveIcon] = useState(false);
  const { Panel } = Collapse;
  const onChange = (key) => {
    setActiveIcon(!activeIcon);
    console.log(key);
  };
  return (
    <>
      <div className="collapse-div">
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIcon={({ isActive }) => (isActive ? "" : "")}
        >
          <Panel
            header={
              <div className="collapse-header">
                <p>Cricket</p>
                {activeIcon ? <BsPlusSquareFill /> : <AiFillMinusSquare />}
              </div>
            }
            key="1"
          >
            <Title />
            {[1, 2, 3, 4, 5].map((curElm, index) => {
              return (
                <React.Fragment key={curElm + index}>
                  <InPlayMatchRow />
                </React.Fragment>
              );
            })}
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default InPlayCollapse;
