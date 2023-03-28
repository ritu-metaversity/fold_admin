/* eslint-disable eqeqeq */
import { Button } from "antd";
import React from "react";
import "./styles.scss";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];
const BookMarkRow = ({ data, prev, pnlData }) => {
  const myPnl = pnlData?.find((ele) => ele?.marketId, data[0]?.mid);

  const pnlBookMaker = [
    {
      pnl: myPnl?.pnl1,
      selectionId: myPnl?.selection1,
    },
    {
      pnl: myPnl?.pnl2,
      selectionId: myPnl?.selection2,
    },
    {
      pnl: myPnl?.pnl3,
      selectionId: myPnl?.selection3,
    },
  ];
  return (
    <div>
      {data?.map((item, index) => {
        const pnlValue =
          pnlBookMaker.find((ele) => ele?.selectionId == item?.sid)?.pnl || 0;
        return (
          <div className="table-row-col" key={item?.sid}>
            <div className="left-col-table">
              <p>{item?.nation}</p>
              {pnlValue >= 0 ? (
                <p style={{ color: "green" }}>{pnlValue}</p>
              ) : (
                <p style={{ color: "red" }}>{pnlValue}</p>
              )}
            </div>
            <div
              className={`right-col-table ${
                item?.gstatus === "SUSPENDED" ? "over" : ""
              }`}
            >
              <>
                <Button
                  className="backButton"
                  style={{
                    height: "37.5px",
                    backgroundColor: backColor[2],
                  }}
                >
                  <p>{"__"}</p>
                </Button>
                <Button
                  className="backButton"
                  style={{
                    height: "37.5px",
                    backgroundColor: backColor[1],
                  }}
                >
                  <p>{"__"}</p>
                </Button>
                <Button
                  className="backButton"
                  style={{
                    height: "37.5px",
                    backgroundColor:
                      item?.b1 > prev[index]?.b1
                        ? "#03B37F"
                        : item?.b1 < prev[index]?.b1
                        ? "#FC4242"
                        : backColor[0],
                  }}
                >
                  <p>{item?.b1 === "0" ? "" : item?.b1}</p>
                  <p>{item?.bs1 === "0" ? "" : item?.bs1}</p>
                </Button>
              </>

              <Button
                className="layButton"
                style={{
                  height: "37.5px",
                  backgroundColor:
                    item?.l1 > prev[index]?.l1
                      ? "#03B37F"
                      : item?.l1 < prev[index]?.l1
                      ? "#FC4242"
                      : layColor[0],
                }}
              >
                <p>{item?.l1 === "0" ? "" : item?.l1}</p>
                <p>{item?.ls1 === "0" ? "" : item?.ls1}</p>
              </Button>
              <Button
                className="layButton"
                style={{
                  height: "37.5px",
                  backgroundColor: layColor[1],
                }}
              >
                <p>{"__"}</p>
              </Button>
              <Button
                className="layButton"
                style={{
                  height: "37.5px",
                  backgroundColor: layColor[2],
                }}
              >
                <p>{"__"}</p>
              </Button>
              <div className="overlay">
                <p>SUSPENDED</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookMarkRow;
