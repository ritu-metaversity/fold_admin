import { Table, Tabs } from "antd";
import React from "react";

const MyBets = () => {
  const dataSource = [
    // {
    //   key: "1",
    //   UserName: "Mike",
    //   Nation: 32,
    //   Rate: "10",
    //   Amount: "10 ",
    // },
  ];

  const columns = [
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Nation",
      dataIndex: "Nation",
      key: "Nation",
    },
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
  ];
  return (
    <div className="bets-tab">
      <Tabs
        defaultActiveKey="1"
        type="card"
        // size={size}
      >
        <Tabs.TabPane tab="Matched Bets" key="1">
          <Table dataSource={dataSource} columns={columns} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyBets;
