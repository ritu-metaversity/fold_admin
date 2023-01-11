import { Table, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bet_List } from "../../routes/Routes";
let data = "04/01/2023 15:46:48";
const MyBets = () => {
  const [betData, setBetData] = useState([]);
  const [searchparam] = useSearchParams();

  const id = searchparam.get("event-id");

  useEffect(() => {
    const getBetsData = async () => {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Bet_List}`,
          { matchId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setBetData(res?.data?.data);
        })
        .catch((erroor) => {
          console.log(erroor);
        });
    };
    const timer = setInterval(() => {
      getBetsData();
    }, 500);
    return () => clearInterval(timer);
  }, [id]);

  const dataSource = [];

  betData.forEach((res) => {
    dataSource.push(
      {
        UserName: res.marketname,
        // Nation: "Only 109 over run PAK / 100",
        Rate: data.split(" ")[0],
        Amount: data.split(" ")[1],
        isback: res.isback,
      },
      {
        UserName: res.userid,
        Nation: (
          <div className="nation" style={{ whiteSpace: "pre-wrap" }}>
            {res.selectionname}
          </div>
        ),
        Rate: res.odds,
        isback: res.isback,
        Amount: res.stack,
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
              rowClassName={(record) => {
                return record.isback ? "blue" : "pink";
              }}
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
