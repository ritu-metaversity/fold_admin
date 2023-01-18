import { Table } from "antd";
import React from "react";
import "./styles.scss";

const UserBook = ({ data }) => {
  const dataSource = [];
  data?.dataList?.map((res) => {
    dataSource.push({
      key: res.userId + res.pnl2 + 2,
      name: res?.userId,
      selectionName1: res?.pnl1,
      selectionName2: res?.pnl2,
      selectionName3: data?.selectionName3 ? res?.pnl3 : "",
    });
  });
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      width: "369px",
    },
    {
      title: data?.selectionName1,
      dataIndex: "selectionName1",
      align: "right",

      key: "age",
      width: "369px",
    },
    {
      title: data?.selectionName2,
      dataIndex: "selectionName2",
      align: "right",
      key: "address",
      width: "369px",
    },
    data?.selectionName3 !== null
      ? {
          title: data?.selectionName3,
          dataIndex: "selectionName3",
          align: "right",
          key: "address",
          width: "369px",
        }
      : {},
  ];
  return (
    <div className="user-book">
      <Table
        dataSource={data?.dataList?.length ? dataSource : ""}
        columns={data?.dataList?.length ? columns : ""}
      />
    </div>
  );
};

export default UserBook;
