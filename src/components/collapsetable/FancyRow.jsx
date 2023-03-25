import { Button, Modal, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Fancy_Book } from "../../routes/Routes";
import "./styles.scss";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];
const intToString = (num) => {
  // num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};
const FancyRow = ({ data, prev, bet, maxbet }) => {
  const [searchparam] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pnl, setPnl] = useState([]);
  const id = searchparam.get("event-id");

  const fancyBook = async (sid) => {
    const data = { matchId: id, fancyId: sid };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Fancy_Book}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPnl(res?.data?.data);
      })
      .catch((error) => {});
  };

  const showModal = (sid) => {
    setIsModalOpen(true);

    fancyBook(sid);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    return (
      <div>
        <Modal
          title="Run Amount"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal"
          footer={null}
          destroyOnClose
        >
          <div>
            <div className="heading-pnl" style={{ display: "flex" }}>
              <h4
                style={{
                  width: "200px",
                  margin: "2px",
                  paddingLeft: "5px",
                  color: "rgb(136 154 168)",
                  fontWeight: "500",
                }}
              >
                Run
              </h4>
              <h4
                style={{
                  margin: "2px",

                  color: "rgb(136 154 168)",
                  fontWeight: "500",
                }}
              >
                Amount
              </h4>
            </div>
            {pnl?.map((res, index) => {
              return (
                <React.Fragment key={res?.pnl + index + 1}>
                  <div
                    className="pnl"
                    style={{
                      display: "flex",
                      border: "1px solid rgb(60 70 72)",
                    }}
                  >
                    <p
                      style={{
                        width: "200px",
                        margin: "2px",
                        paddingLeft: "5px",
                        color: "rgb(136 154 168)",
                        fontWeight: "500",
                      }}
                    >
                      {res?.odds}
                    </p>
                    <p
                      style={{
                        margin: "2px",
                        color: res?.pnl >= 0 ? "Green" : "red",
                        fontWeight: "500",
                      }}
                    >
                      {res?.pnl}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </Modal>
        <div
          className="collapse-table-container"
          onClick={() => showModal(data?.sid)}
        >
          <div
            className="row2"
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <div className="left-col-fancy">
              <span style={{ cursor: "pointer" }}>{data?.nation}</span>
              <p
                style={{
                  marginBottom: "2px",
                  marginTop: "0px",
                  color: bet >= 0 ? "green" : "red",
                }}
              >
                {bet}
              </p>
            </div>
            <div className="colwrapper">
              <div
                className={`middle-col-fancy ${
                  data.gstatus === "SUSPENDED" ||
                  data.gstatus === "BALL RUNNING"
                    ? "over"
                    : ""
                }`}
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "5px",
                }}
              >
                <Button
                  className="layButton"
                  style={{
                    backgroundColor:
                      data?.l1 > prev?.l1
                        ? "#03B37F"
                        : data?.l1 < prev?.l1
                        ? "#FC4242"
                        : layColor[0],
                  }}
                >
                  <p>{data?.l1 === "0" ? "" : data?.l1}</p>
                  <p>{data?.ls1 === "0" ? "" : data?.ls1}</p>
                </Button>
                <Button
                  className="backButton"
                  style={{
                    backgroundColor:
                      data?.b1 > prev?.b1
                        ? "#03B37F"
                        : data?.b1 < prev?.b1
                        ? "#FC4242"
                        : backColor[0],
                  }}
                >
                  <p>{data?.b1 === "0" ? "" : data?.b1}</p>
                  <p>{data?.bs1 === "0" ? "" : data?.bs1}</p>
                </Button>
                <div className="overlay">
                  <p style={{ fontSize: "12px" }}>SUSPENDED</p>
                </div>
              </div>
              <div
                className="right-col-fancy"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                min:{maxbet?.minBet} max:
                {intToString(maxbet?.maxBet)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default FancyRow;
