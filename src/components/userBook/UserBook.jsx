import { Table, Typography } from "antd";
import React from "react";
import "./styles.scss";

const UserBook = ({ data }) => {
  const { Text } = Typography;

  const dataSource = data?.dataList?.map((res) => {
    return {
      key: res.userId + res.pnl2 + 2,
      name: res?.userId,
      selectionName1: (
        <p style={{ color: res?.pnl1 > 0 ? "green" : "red" }}>{res?.pnl1}</p>
      ),
      selectionName2: (
        <p style={{ color: res?.pnl2 > 0 ? "green" : "red" }}>{res?.pnl2}</p>
      ),

      selectionName3: data?.selectionName3 ? (
        <p style={{ color: res?.pnl2 > 0 ? "green" : "red" }}>{res?.pnl3}</p>
      ) : (
        ""
      ),
    };
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
        summary={(pageData) => {
          let totalBorrow = 0;
          let totalRepayment = 0;
          let totalselectionName = 0;
          pageData.forEach(
            ({ selectionName1, selectionName2, selectionName3 }) => {
              totalBorrow += selectionName1.props.children;
              totalRepayment += selectionName2.props.children;
              totalselectionName += selectionName3.props.children;
            }
          );
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text style={{ color: totalBorrow > 0 ? "green" : "red" }}>
                    {totalBorrow.toFixed(1)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Text style={{ color: totalRepayment > 0 ? "green" : "red" }}>
                    {totalRepayment.toFixed(1)}
                  </Text>
                </Table.Summary.Cell>
                {data?.selectionName3 !== null ? (
                  <Table.Summary.Cell index={2}>
                    <Text
                      style={{
                        color: totalselectionName > 0 ? "green" : "red",
                      }}
                    >
                      {totalselectionName.toFixed(1)}
                    </Text>
                  </Table.Summary.Cell>
                ) : (
                  ""
                )}
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default UserBook;
