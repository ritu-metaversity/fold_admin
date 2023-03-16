import { Table, Tooltip } from "antd";
import React from "react";

const PtsModaltable = ({ data }) => {
  const dataSource = [];
  data?.map((res, index) =>
    dataSource?.push({
      key: res?.userid + index + res?.pricevalue,
      Nation: res?.marketname,
      Rate: res?.pricevalue,
      Amount: res?.stack,
      win: res.netpnl,
      Date: res?.matchedtime,
      IP: res?.ipAddress,
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
      title: "win",
      dataIndex: "win",
      key: "win",
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

export default PtsModaltable;
