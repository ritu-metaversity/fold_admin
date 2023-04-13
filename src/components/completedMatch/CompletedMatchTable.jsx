import { Table, Typography, Button } from "antd";
import React from "react";
import "./styles.scss";
import { useState } from "react";
import BetListModal from "../modal/betListModal";

const CompletedMatchTable = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ptsId, setPtsId] = useState("");
  const [remark, setRemark] = useState("");
  const { Text } = Typography;

  const dataSource = data?.map((completedData) => {
    return {
      name: completedData?.marketName,

      pnl: (
        <p style={{ color: completedData.pnl >= 0 ? "green" : "red" }}>
          {completedData.pnl}
        </p>
      ),
      view: (
        <Button
          onClick={() =>
            showModal({
              id: completedData.marketId,
              name: completedData.marketName,
            })
          }
          style={{
            background: "rgb(241, 133, 33)",
            borderColor: "rgb(241, 133, 33)",
            color: "white",
          }}
        >
          Bet List
        </Button>
      ),
    };
  });

  const columns = [
    {
      title: "Session",
      dataIndex: "name",
      key: "name",
      align: "right",
    },
    {
      title: "Profite & Loss",
      dataIndex: "pnl",
      key: "age",
      align: "right",
    },
    {
      title: "view",
      dataIndex: "view",
      key: "view",
      align: "right",
    },
  ];
  const showModal = (obj) => {
    setRemark(obj.name);
    setPtsId(obj.id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <BetListModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        ptsId={ptsId}
        remark={remark}
      />
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
                    {totalBorrow?.toFixed(1)}
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
