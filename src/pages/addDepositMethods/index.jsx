import React from "react";
///styles
// import "./styles.scss";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import { add_Deposit_Methods } from "../../routes/Routes";
import AddDeposit from "./AddDeposit";
import AllDepositMethods from "./AllDepositMethods";
const AddDepositMethods = () => {
  const items = [
    {
      key: "1",
      label: `Add Deposit`,
      children: <AllDepositMethods />,
    },
    {
      key: "2",
      label: `All Deposit Payment`,
      children: <AddDeposit />,
    },
  ];

  return (
    <div>
      <div className="hading-create-accounts">
        <h4>Add Deposit</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to={add_Deposit_Methods} style={{ color: "#74788d" }}>
            Add Deposit
          </NavLink>
        </p>
      </div>
      <Tabs defaultActiveKey="1" items={items} type="card" />
      {/* <div className="addWithdrawalSub-conatiner">
        <div className="addWithdrawalSub-left-col">
       
        </div>
        <div className="addWithdrawalSub-right-col">
          <p style={{ paddingLeft: "20px", fontWeight: 800 }}>
            All Payment Method
          </p>
         
       
        </div>
      </div> */}
    </div>
  );
};

export default AddDepositMethods;
