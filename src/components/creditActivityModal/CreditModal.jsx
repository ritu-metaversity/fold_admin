import { Tabs } from "antd";
import React, { useState } from "react";
import DepositActivity from "../modalForm/DepositActivity";
import WidrawalActivity from "../modalForm/WidrawalActivity";
import Transaction from "../moreCard/components/transaction/Transaction";
///styles
import "./styles.scss";
const CreditModal = ({ data }) => {
  const [tab1, settab1] = useState(0);

  const classes = ["credit-tab", "credit-tab2", "credit-tab3"];
  const onChange = (activeKey) => {
    if (activeKey) {
      settab1(activeKey);
    }
  };

  const items = [
    {
      key: "0",
      label: "Credit Deposit",
      children: <DepositActivity data={data} />,
    },
    {
      key: "1",
      label: "Credit Withdraw",
      children: <WidrawalActivity data={data} />,
    },
    {
      key: "2",
      label: "Credit History",
      children: <Transaction data={4} dataTransaction={data} />,
    },
  ];
  return (
    <div className={classes[tab1]}>
      <Tabs
        defaultActiveKey="0"
        type="card"
        onChange={onChange}
        items={items}
        destroyInactiveTabPane
      ></Tabs>
    </div>
  );
};

export default CreditModal;
