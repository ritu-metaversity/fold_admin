import { Button, Spin } from "antd";
import React from "react";
import "./styles.scss";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];

const FancyRow = ({ data, prev }) => {
  console.log(data);
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    return (
      <div>
        <div className="collapse-table-container">
          <div
            className="row2"
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <div className="left-col-fancy">{data.nation}</div>
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
                        ? "green"
                        : data.l1 < prev.l1
                        ? "red"
                        : layColor[0],
                  }}
                >
                  <p>{data.l1 === 0 ? "" : data.l1}</p>
                  <p>{data.ls1 === 0 ? "" : data.ls1}</p>
                </Button>
                <Button
                  className="backButton"
                  style={{
                    backgroundColor:
                      data.b1 > prev.b1
                        ? "green"
                        : data.b1 < prev.b1
                        ? "red"
                        : backColor[0],
                  }}
                >
                  <p>{data.b1 === 0 ? "" : data.b1}</p>
                  <p>{data.bs1 === 0 ? "" : data.bs1}</p>
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
    // return (
    //   <div
    //     className="row"
    //     style={{
    //       display: "flex",

    //       alignItems: "center",
    //     }}
    //   >
    //     <div className="left-col-fancy">
    //       <p style={{ margin: "0px" }}>{data.nation}</p>
    //     </div>
    //     <div className="colwrapper">
    //       <div
    //         className={`middle-col-fancy ${
    //           data.gstatus === "SUSPENDED" ? "over" : ""
    //         }`}
    //         style={{ display: "flex", gap: "5px", flexWrap: "nowrap" }}
    //       >
    //         <Button
    //           className="layButton"
    //           style={{
    //             backgroundColor:
    //               data.l1 > prev.l1
    //                 ? "green"
    //                 : data.l1 < prev.l1
    //                 ? "red"
    //                 : layColor[0],
    //           }}
    //         >
    //           <p>{data.l1 === 0 ? "" : data.l1}</p>
    //           <p>{data.ls1 === 0 ? "" : data.ls1}</p>
    //         </Button>
    //         <Button
    //           className="backButton"
    //           style={{
    //             backgroundColor:
    //               data.b1 > prev.b1
    //                 ? "green"
    //                 : data.b1 < prev.b1
    //                 ? "red"
    //                 : backColor[0],
    //           }}
    //         >
    //           <p>{data.b1 === 0 ? "" : data.b1}</p>
    //           <p>{data.bs1 === 0 ? "" : data.bs1}</p>
    //         </Button>
    //         <div className="overlay">
    //           <p>SUSPENDED</p>
    //         </div>
    //       </div>
    //       <div className="right-col-fancy">min:100 max:1l</div>
    //     </div>
    //   </div>
    // );
  }
};
export default FancyRow;
