import { Table, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
let data = "04/01/2023 15:46:48";
const MyBets = () => {
  const [betData, setBetData] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchparam] = useSearchParams();
  const id = searchparam.get("event-id");

  useEffect(() => {
    const getBetsData = async () => {
      setloading(true);
      await axios
        .post(
          "http://api.a2zscore.com/admin-new-apis/bets/bet-list-by-matchid",
          { matchId: 31989829 },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          setBetData(res.data.data);
        })
        .catch((erroor) => {
          setloading(false);
          console.log(erroor);
        });
    };
    getBetsData();
  }, [id]);

  const dataSource = [];

  betData.forEach((res) => {
    dataSource.push(
      {
        UserName: res.marketname,
        // Nation: "Only 109 over run PAK / 100",
        Rate: data.split(" ")[0],
        Amount: data.split(" ")[1],
      },
      {
        UserName: "Over By Over",
        Nation: (
          <div className="nation" style={{ whiteSpace: "pre-wrap" }}>
            {res.selectionname}
          </div>
        ),
        Rate: "amit12340",
        Amount: "10 ",
      },
      {}
    );
  });

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
  ];
  return (
    <div className="bets-tab">
      <Tabs
        defaultActiveKey="1"
        type="card"
        // size={size}
      >
        <Tabs.TabPane tab="Matched Bets" key="1">
          <div className="bets-table">
            <Table
              dataSource={dataSource}
              columns={columns}
              rowClassName={(record, index) => {
                return record.isBack ? "blue" : "pink";
              }}
              loading={loading}
              pagination={{
                pageSize: 50,
              }}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyBets;
