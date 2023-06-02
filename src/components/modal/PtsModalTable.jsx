import { Table, Tooltip } from "antd";
import React from "react";
// import "./styles.scss";
const PtsModaltable = ({ data }) => {
  const dataSource = data?.map((res, index) => {
    return {
      key: res?.userid + index + res?.pricevalue,
      userId: res.userid,
      Nation: res?.selectionname,
      Rate: `${res.odds}(${res?.pricevalue}) `,
      Amount: (
        <p style={{ color: res?.stack > 0 ? "green" : "red" }}>{res?.stack}</p>
      ),
      win: (
        <p style={{ color: res.netpnl > 0 ? "green" : "red" }}>{res.netpnl}</p>
      ),
      Date: res?.matchedtime,
      IP: res?.ipAddress,
      BDetails: (
        <Tooltip title={res?.deviceInfo} placement="top">
          <span style={{ color: "#128412" }}>Detail</span>
        </Tooltip>
      ),

      isback: res?.isback,
    };
  });
  const columns = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
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
    <div
      className="table-container"
      // style={{ height: "300px", overflow: "scroll" }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) => {
          return record.isback ? "blue" : "pink";
        }}
        pagination={false}
        scroll={{
          y: 450,
          x: "auto",
        }}
      />
    </div>
  );
};

export default PtsModaltable;
