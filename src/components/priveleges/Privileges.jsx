import { Col, Row } from "antd";
import React from "react";
import CheckBoxComp from "../createHelperForm/CheckBoxComp";

export const permissionArray = [
  "ALL",
  "DEPOSIT",
  "WITHDRAW",
  "USER_LIST",
  "USER_LOCK",
  "BET_LOCK",
  "USER_PASSWORD_CHANGE",
  "ACTIVE_USER",
];
const Privileges = ({ onChange, checkValue }) => {
  const style = {
    background: "rgb(231 231 231)",
  };
  return (
    <>
      <Row>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "500",
            margin: "0px",
            color: "rgb(80 79 79 / 88%)",
          }}
        >
          Privileges
        </h3>
      </Row>
      <div className="priviliges-div">
        <Row gutter={30} style={style}>
          {permissionArray?.map((item) => {
            return (
              <Col sm={12} xs={24} md={8} lg={6} xl={6}>
                <CheckBoxComp
                  name={item}
                  fun={onChange}
                  checkValue={checkValue?.find(
                    (checkedItem) =>
                      checkedItem === item || checkedItem === "ALL"
                  )}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default Privileges;
