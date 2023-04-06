import { Table } from "antd";
import React from "react";
import "./styles.scss";

const CompletedMatchTable = ({ data }) => {
  const dataSource = data?.map((completedData) => {
    return {
      name: completedData?.marketName,

      pnl: (
        <p style={{ color: completedData.pnl >= 0 ? "green" : "red" }}>
          {completedData.pnl}
        </p>
      ),
    };
  });

  const columns = [
    {
      title: "Session",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Profite & Loss",
      dataIndex: "pnl",
      key: "age",
    },
  ];
  return (
    <div>
      <Table
        pagination={false}
        className="completed-match-table"
        dataSource={dataSource}
        columns={columns}
        scroll={{
          y: 350,
        }}
      />
    </div>
  );
};

export default CompletedMatchTable;
