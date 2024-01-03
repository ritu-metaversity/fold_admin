import { Table, Tooltip } from "antd";
import React from "react";
import DownloadReport from "../downloadReport/DownloadReport";
// import "./styles.scss";
const PtsModaltable = ({ data }) => {
  const dataSource = data?.map((res, index) => {
    return {
      key: res?.userid + index + res?.pricevalue,
      userid: res.userid,
      nation: res?.selectionname,
      rate: `${res.odds}(${res?.pricevalue}) `,
      amount: res?.stack,
      win: res.netpnl,
      date: res?.matchedtime,
      ip: res?.ipAddress,
      detail: res?.deviceInfo,

      isback: res?.isback,
    };
  });
  const columns = [
    {
      title: "userId",
      dataIndex: "userid",
      key: "userId",
    },
    {
      title: "Nation",
      dataIndex: "nation",
      key: "Nation",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "Rate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
      render: (text) => (
        <p style={{ color: text > 0 ? "green" : "red" }}>{text}</p>
      ),
    },
    {
      title: "win",
      dataIndex: "win",
      key: "win",
      render: (text) => (
        <p style={{ color: text > 0 ? "green" : "red" }}>{text}</p>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
    },

    {
      title: "IP",
      dataIndex: "ip",
      key: "IP",
    },
    {
      title: "B Details",
      dataIndex: "detail",
      key: "B Details",
      render: (text) => (
        <Tooltip title={text} placement="top">
          <span style={{ color: "#128412" }}>Detail</span>
        </Tooltip>
      ),
    },
  ];
  const reportDownloadHeader = [
    "User id",
    "Nation",
    "Rate",
    "Amount",
    "Uin",
    "Date",
    "Ip",
    "Detail",
  ];
  return (
    <div
      className="table-container"
      // style={{ height: "300px", overflow: "scroll" }}
    >
      <DownloadReport
        dataReport={dataSource}
        header={reportDownloadHeader}
        reportType="AccountSatementBetList"
        reportFile={"Bet List"}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) => {
          return record.isback ? "blue" : "pink";
        }}
        pagination={false}
        // scroll={{
        //   y: 450,
        //   x: "auto",
        // }}
      />
    </div>
  );
};

export default PtsModaltable;
