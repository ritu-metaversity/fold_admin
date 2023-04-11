import { Table, Tooltip } from "antd";
import React from "react";

const TableComponent = ({ data }) => {
  const dataSource = [];
  data?.map((res, index) =>
    dataSource?.push({
      key: res?.userid + index + res?.pricevalue,
      UserName: res?.userid,
      Nation: res?.selectionname,
      Rate: res?.pricevalue,
      Amount: res?.stack,
      Date: res?.matchedtime,
      IP: res?.userIp,
      BDetails: (
        <Tooltip title={res?.deviceInfo} placement="top">
          <span style={{ color: "#128412" }}>Detail</span>
        </Tooltip>
      ),

      isback: res?.isback,
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
        pagination={false}
        scroll={{
          y: 300,
          x: "auto",
        }}
      />
    </div>
  );
};

export default TableComponent;
