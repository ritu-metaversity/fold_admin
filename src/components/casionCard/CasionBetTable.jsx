import { Table, Tooltip } from "antd";
import React from "react";

const CasionBetTable = ({ data }) => {
  const dataSource = [];
  data?.map((res, index) =>
    dataSource?.push({
      key: index,
      userid: res.userid,
      selectionname: res.selectionname,
      Rate: res.rate,
      Amount: res.amount,
      Date: res.date,

      isback: res.isback,
    })
  );
  const columns = [
    {
      title: "userid",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: "selectionname",
      dataIndex: "selectionname",
      key: "selectionname",
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
  ];
  return (
    <div>
      <div
        className="radio-filter"
        style={{ justifyContent: "flex-end", display: "flex" }}
      >
        {/* <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>All</Radio>
            <Radio value={2}>Back</Radio>
            <Radio value={3}>Lay</Radio>
          </Radio.Group> */}
        <p>
          Total Soda: <span style={{ color: "green" }}>{78}</span> Total Amount:
          <span style={{ color: "green" }}>{88}</span>
        </p>
      </div>
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

export default CasionBetTable;
