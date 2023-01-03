import { Button, Spin } from "antd";
import React from "react";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];

const MatchOddsRow = ({ data, prev }) => {
  console.log(data[0].status);
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    return (
      <div>
        {console.log(data[0].runners)}
        {data[0]?.runners?.map((item, runnerIndex) => {
          return (
            <div className="table-row-col">
              <div className="left-col-table">
                <p>{item.selectionId}</p>
                <p>0</p>
              </div>

              <div
                className={`right-col-table ${
                  data[0].status == "SUSPENDED" ? "over" : ""
                }`}
              >
                {item.ex.availableToBack
                  .map((curElm, index) => {
                    return (
                      <>
                        <Button
                          className="backButton"
                          style={{
                            backgroundColor:
                              curElm.price >
                              prev[0].runners[runnerIndex].ex.availableToBack[
                                index
                              ].price
                                ? "green"
                                : curElm.price <
                                  prev[0].runners[runnerIndex].ex
                                    .availableToBack[index].price
                                ? "red"
                                : backColor[index],
                          }}
                        >
                          <p>{curElm.price == 0 ? "__" : curElm.price}</p>
                          <p>{curElm.size == 0 ? "" : curElm.size}</p>
                        </Button>
                      </>
                    );
                  })
                  .reverse()}

                {item.ex.availableToLay.map((curElm, index) => {
                  return (
                    <>
                      <Button
                        className="layButton"
                        style={{
                          backgroundColor:
                            curElm.price >
                            prev[0].runners[runnerIndex].ex.availableToLay[
                              index
                            ].price
                              ? "green"
                              : curElm.price <
                                prev[0].runners[runnerIndex].ex.availableToLay[
                                  index
                                ].price
                              ? "red"
                              : layColor[index],
                        }}
                      >
                        <p>{curElm.price == 0 ? "__" : curElm.price}</p>
                        <p>{curElm.size == 0 ? "" : curElm.size}</p>
                      </Button>
                    </>
                  );
                })}
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

export default MatchOddsRow;
