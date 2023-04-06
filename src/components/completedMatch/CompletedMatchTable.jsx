import { Table, Typography } from "antd";
import React from "react";
import "./styles.scss";

const CompletedMatchTable = ({ data }) => {
  const { Text } = Typography;
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
          y: 450,
        }}
        summary={(pageData) => {
          let totalBorrow = 0;

          pageData.forEach(({ pnl }) => {
            totalBorrow += pnl.props.children;
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text style={{ color: totalBorrow > 0 ? "green" : "red" }}>
                    {totalBorrow.toFixed(1)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default CompletedMatchTable;
