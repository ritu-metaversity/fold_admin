import { Button, Spin } from "antd";
import React from "react";
const backColor = ["#72BBEF", "#72BBEFA3", "#72BBEFA3"];
const layColor = ["#F994BA", "#F994BACC", "#F994BACC"];

const MatchOddsRow = ({ data, prev, pnlData }) => {
  if (!data || !prev) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  } else {
    const myPnl = pnlData.find((item) => item?.marketId == data?.marketId);

    const plnOddsArray = myPnl
      ? [
          { pnl: myPnl.pnl1, selectionId: myPnl.selection1 },
          { pnl: myPnl.pnl2, selectionId: myPnl.selection2 },
          { pnl: myPnl.pnl3, selectionId: myPnl.selection3 },
        ]
      : [];
    return (
      <div>
        {data?.runners?.map((item, runnerIndex) => {
          const pnlValue =
            plnOddsArray.find((pnl) => pnl.selectionId == item.selectionId)
              ?.pnl || 0;
          return (
            <div className="table-row-col" key={item.selectionId}>
              <div className="left-col-table">
                <p>{item.name}</p>
                {pnlValue >= 0 ? (
                  <p style={{ color: "green" }}>{pnlValue}</p>
                ) : (
                  <p style={{ color: "red" }}>{pnlValue}</p>
                )}
              </div>

              <div
                className={`right-col-table ${
                  data?.status == "SUSPENDED" ? "over" : ""
                }`}
              >
                {item?.ex?.availableToBack
                  .map((curElm, index) => {
                    return (
                      <React.Fragment
                        key={curElm.price + item.selectionId + "back" + index}
                      >
                        <Button
                          className="backButton"
                          style={{
                            backgroundColor:
                              curElm?.price >
                              prev?.runners[runnerIndex]?.ex?.availableToBack[
                                index
                              ].price
                                ? "#03B37F"
                                : curElm?.price <
                                  prev?.runners[runnerIndex]?.ex
                                    .availableToBack[index]?.price
                                ? "#FC4242"
                                : backColor[index],
                          }}
                        >
                          <p>{curElm?.price === 0 ? "__" : curElm?.price}</p>
                          <p>{curElm?.size === 0 ? "" : curElm?.size}</p>
                        </Button>
                      </React.Fragment>
                    );
                  })
                  .reverse()}

                {item?.ex?.availableToLay?.map((curElm, index) => {
                  return (
                    <React.Fragment
                      key={curElm?.price + item?.selectionId + "lay" + index}
                    >
                      <Button
                        className="layButton"
                        style={{
                          backgroundColor:
                            curElm.price >
                            prev.runners[runnerIndex]?.ex.availableToLay[index]
                              .price
                              ? "#03B37F"
                              : curElm.price <
                                prev.runners[runnerIndex]?.ex.availableToLay[
                                  index
                                ].price
                              ? "#FC4242"
                              : layColor[index],
                        }}
                      >
                        <p>{curElm.price === 0 ? "__" : curElm.price}</p>
                        <p>{curElm.size === 0 ? "" : curElm.size}</p>
                      </Button>
                    </React.Fragment>
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
