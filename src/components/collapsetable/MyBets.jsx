/* eslint-disable array-callback-return */
import { Table, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { Bet_List } from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";

const MyBets = () => {
  const [betData, setBetData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getBetsData = async () => {
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Bet_List}`,
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
        .catch((error) => {
          notifyToast().error(error.response.data.message);
          if (error.response.data.status === 401) {
            navigate("/");
            localStorage.clear();
          }
        });
    };
    getBetsData();
    const timer = setInterval(() => {
      getBetsData();
    }, 5000);
    return () => clearInterval(timer);
  }, [id, navigate]);

  // const { lastMessage } = useWebSocket(
  //   `${import.meta.env.VITE_ANKIT_SOCKET}admin/${id}/${localStorage.getItem(
  //     "token"
  //   )}`,
  //   {
  //     shouldReconnect: () => true,
  //   }
  // );

  // useEffect(() => {
  //   if (lastMessage?.data && JSON.parse(lastMessage?.data)?.data)
  //     setBetData(JSON.parse(lastMessage?.data).data);
  // }, [lastMessage]);

  const dataSource = [];
  betData?.map((res, index) => {
    dataSource.push(
      {
        key: res.marketname + res.userid + index,
        UserName: res.marketname,
        Rate: res.matchedtime?.split(" ")[0],
        Amount: res.matchedtime?.split(" ")[1],
        isback: res.isback,
      },
      {
        key: res.userid + res.marketname + index + 1,
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
      {
        key: res.userid + res.odds + index + 5,
      }
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
  const items = [
    {
      key: "0",
      label: "Matched Bets",
      children: (
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
      ),
    },
  ];
  return (
    <div className="bets-tab" style={{ marginTop: "5px" }}>
      <Tabs
        defaultActiveKey="0"
        type="card"
        // size={size}
        items={items}
      ></Tabs>
    </div>
  );
};

export default MyBets;
