import { Table } from "antd";
import React from "react";

const CasionBetTable = ({ data }) => {
  const dataSource =
    data?.length > 0 &&
    data?.map((res, index) => {
      return {
        key: index,
        userid: res?.userid,
        selectionname: res?.selectionname,
        Rate: res?.rate,
        Amount: res?.amount,
        Date: res?.date,
        isback: res?.isback,
      };
    });
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowClassName={(record) => {
          return record?.isback ? "blue" : "pink";
        }}
        scroll={{
          y: 450,
          x: "auto",
        }}
      />
    </div>
  );
};

export default CasionBetTable;
