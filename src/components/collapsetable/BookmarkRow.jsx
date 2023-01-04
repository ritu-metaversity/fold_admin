import { Button, Spin } from "antd";
import React from "react";
import "./styles.scss";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];
const BookMarkRow = ({ data, prev }) => {
  console.log(prev);
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    return (
      <div>
        {data?.map((item, index) => {
          return (
            <div className="table-row-col">
              <div className="left-col-table">
                <p>{item.nation}</p>
                <p>{item.gstatus}</p>
              </div>
              <div
                className={`right-col-table ${
                  item.gstatus === "SUSPENDED" ? "over" : ""
                }`}
                style={{ padding: "4px 0px 4px 0px" }}
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
                        item.b1 > prev[index].b1
                          ? "green"
                          : item.b1 < prev[index].b1
                          ? "red"
                          : backColor[0],
                    }}
                  >
                    <p>{item.b1 === 0 ? "__" : item.b1}</p>
                    <p>{item.bs1 === 0 ? "" : item.bs1}</p>
                  </Button>
                </>

                <Button
                  className="layButton "
                  style={{
                    height: "37.5px",
                    backgroundColor:
                      item.l1 > prev[index].l1
                        ? "green"
                        : item.l1 < prev[index].l1
                        ? "red"
                        : layColor[0],
                  }}
                >
                  <p>{item.l1 === 0 ? "" : item.l1}</p>
                  <p>{item.ls1 === 0 ? "" : item.ls1}</p>
                </Button>
                <Button
                  className="layButton"
                  style={{
                    height: "37.5px",
                    backgroundColor: layColor[index],
                  }}
                >
                  <p>{"__"}</p>
                </Button>
                <Button
                  className="layButton"
                  style={{
                    height: "37.5px",
                    backgroundColor: layColor[index],
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
  }
};

export default BookMarkRow;
