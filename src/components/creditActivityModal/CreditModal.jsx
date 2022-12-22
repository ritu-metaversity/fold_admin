import { Tabs } from "antd";
import React, { useState } from "react";
import DepositActivity from "../modalForm/DepositActivity";
import DepositForm from "../modalForm/DepositForm";
import WidrawalActivity from "../modalForm/WidrawalActivity";
import Transaction from "../moreCard/components/transaction/Transaction";
///styles
import "./styles.scss";
const CreditModal = ({ data }) => {
  const [tab1, settab1] = useState(0);

  const classes = ["credit-tab", "credit-tab2", "credit-tab3"];
  console.log("credit", data);
  const onChange = (activeKey) => {
    // this.setState({ activeKey });
    if (activeKey) {
      settab1(activeKey);
    }
  };
  return (
    <div className={classes[tab1]}>
      <Tabs
        defaultActiveKey="0"
        type="card"
        // size={size}
        onChange={onChange}
      >
        <Tabs.TabPane tab={"Credit Deposit"} key="0">
          <DepositActivity data={data} />
        </Tabs.TabPane>

        <Tabs.TabPane tab={"Credit Withdraw"} key="1">
          <WidrawalActivity data={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Credit History" key="2">
          <Transaction data={4} dataTransaction={data} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CreditModal;
