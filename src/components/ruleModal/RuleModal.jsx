import { Modal } from "antd";
import React, { useState } from "react";
import "./styles.scss";
import { Collapse } from "antd";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import flag from "../../assets/img/flag.png";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const RuleModal = ({ ruleModal, handleOk, handleCancel }) => {
  const [collapseKey, setCollapseKey] = useState([]);
  const onChange = (key) => {
    if (key) {
      if (key[1]) {
        setCollapseKey(key[1]);
      } else {
        setCollapseKey(key[0]);
      }
    } else {
    }
  };
  return (
    <>
      <Modal
        title="Rule"
        open={ruleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rule-modal"
        footer={null}
        width={800}
      >
        <p>
          <img src={flag} alt="" /> English
        </p>
        {["Football", "Horse Racing", "Tennis", "Cricket", "Table Tennis"].map(
          (res) => {
            return (
              <Collapse
                //   defaultActiveKey={["1"]}
                onChange={onChange}
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <HiMinusCircle style={{ fontSize: "16px" }} />
                  ) : (
                    <HiPlusCircle style={{ fontSize: "16px" }} />
                  )
                }
                activeKey={[collapseKey]}
                destroyInactivePanel
              >
                <Panel header={res} key={res}>
                  <Collapse
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <HiMinusCircle style={{ fontSize: "16px" }} />
                      ) : (
                        <HiPlusCircle style={{ fontSize: "16px" }} />
                      )
                    }
                  >
                    <Panel header={res}>
                      <p>{text}</p>
                    </Panel>
                  </Collapse>
                </Panel>
              </Collapse>
            );
          }
        )}
      </Modal>
    </>
  );
};

export default RuleModal;
