import { Table, Tooltip } from "antd";
import React, { useState } from "react";

const TableComponent = ({ data, loading }) => {
  const dataSource = [];

  data.map((res) =>
    dataSource.push({
      key: "1",
      UserName: res.userid,
      Nation: res.selectionname,
      Rate: res.pricevalue,
      Amount: res.stack,
      Date: res.matchedtime,
      IP: res.ipAddress,
      BDetails: (
        <Tooltip title={res.deviceInfo} placement="top">
          <span style={{ color: "#128412" }}>Detail</span>
        </Tooltip>
      ),

      isback: res.isback,
    })
  );
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
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
    },
    {
      title: "B Details",
      dataIndex: "BDetails",
      key: "B Details",
    },
  ];
  return (
    <div className="table-container">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) => {
          return record.isback ? "blue" : "pink";
        }}
      />
    </div>
  );
};

export default TableComponent;
