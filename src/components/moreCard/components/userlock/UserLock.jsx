import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Switch } from "antd";
import { MdOutlineLogin } from "react-icons/md";
///styles
// import './styles.scss'
const UserLock = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <div className="row-1">
          <label>Bet lock</label>
          <div className="input" style={{ justifyContent: "left !important" }}>
            <Switch size="small" />
          </div>
        </div>
        <div className="row-1">
          <label>User lock</label>
          <div className="input">
            <Switch size="small" />
          </div>
        </div>
        <div className="row-1">
          <label>Transaction Code</label>
          <div className="input">
            <input
              type="password"
              id="pwd"
              name="pwd"
              style={{ width: "100%", textAlign: "left" }}
              placeholder="Transaction Code"
            />
          </div>
        </div>
        <div className="row-button">
          <Button style={{ background: "black", borderColor: "black" }}>
            Submit
            <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserLock;
