import { Button, Modal, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Fancy_Book } from "../../routes/Routes";
import "./styles.scss";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];

const FancyRow = ({ data, prev }) => {
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
      .catch((error) => {
        console.log(error.response.data.message);
      });
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
            {pnl?.map((res) => {
              return (
                <div
                  className="pnl"
                  style={{ display: "flex", border: "1px solid rgb(60 70 72)" }}
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
                      color: res.pnl >= 0 ? "Green" : "red",
                      fontWeight: "500",
                    }}
                  >
                    {res?.pnl}
                  </p>
                </div>
              );
            })}
          </div>
        </Modal>
        <div className="collapse-table-container">
          <div
            className="row2"
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <div className="left-col-fancy">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => showModal(data.sid)}
              >
                {data.nation}
              </span>
            </div>
            <div className="colwrapper">
              <div
                className={`middle-col-fancy ${
                  data.gstatus === "SUSPENDED" ? "over" : ""
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
                      data.l1 > prev.l1
                        ? "#03B37F"
                        : data.l1 < prev.l1
                        ? "#FC4242"
                        : layColor[0],
                  }}
                >
                  <p>{data.l1 == 0 ? "" : data.l1}</p>
                  <p>{data.ls1 == 0 ? "" : data.ls1}</p>
                </Button>
                <Button
                  className="backButton"
                  style={{
                    backgroundColor:
                      data.b1 > prev.b1
                        ? "#03B37F"
                        : data.b1 < prev.b1
                        ? "#FC4242"
                        : backColor[0],
                  }}
                >
                  <p>{data.b1 == 0 ? "" : data.b1}</p>
                  <p>{data.bs1 == 0 ? "" : data.bs1}</p>
                </Button>
                <div className="overlay">
                  <p>SUSPENDED</p>
                </div>
              </div>
              <div
                className="right-col-fancy"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                min:100 max:1l
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default FancyRow;
