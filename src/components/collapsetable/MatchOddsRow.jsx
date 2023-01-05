import { Button, Spin } from "antd";
import React from "react";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];

const MatchOddsRow = ({ data, prev }) => {
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    return (
      <div>
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
                                ? "#03B37F"
                                : curElm.price <
                                  prev[0].runners[runnerIndex].ex
                                    .availableToBack[index].price
                                ? "#FC4242"
                                : backColor[index],
                          }}
                        >
                          <p>{curElm.price === 0 ? "__" : curElm.price}</p>
                          <p>{curElm.size === 0 ? "" : curElm.size}</p>
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
                              ? "#03B37F"
                              : curElm.price <
                                prev[0].runners[runnerIndex].ex.availableToLay[
                                  index
                                ].price
                              ? "#FC4242"
                              : layColor[index],
                        }}
                      >
                        <p>{curElm.price === 0 ? "__" : curElm.price}</p>
                        <p>{curElm.size === 0 ? "" : curElm.size}</p>
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
