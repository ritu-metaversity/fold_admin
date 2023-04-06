import { Empty } from "antd";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
///styles
import "./styles.scss";
const Datatable = (props) => {
  const data = props?.data;
  const obj = {
    4: 4,
    1: 62,
    2: 2,
    3: 5,
    1477: 54,
    6: 3,
    7: 10,
    8: 16,
    27454571: 11,
  };
  if (!data) {
    return (
      <>
        <Empty />
      </>
    );
  }

  return data?.map((res) => {
    const newRes = res?.marketData?.some((market, index) => {
      return (
        market.marketName === "Match Odds" ||
        market.marketName.includes("Bookmaker")
      );
    });

    // newRes.map((res) => {});
    if (newRes) {
      return (
        <Link to={`/Detail/${res?.sportId}/${res?.matchId}`}>
          <div
            className="tabledata"
            key={res?.matchId + "marketAnalysis" + 1 + res.sportName}
          >
            <table className="table table-bordered">
              <thead className="table-head">
                <tr className="winner-table">
                  <th colSpan="6">
                    {/* <FaBasketballBall /> */}
                    <i className={`d-icon icon-${obj[res.sportId]}`}></i>
                    <span style={{ paddingLeft: "10px" }}>{props?.name}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="winner-table">
                  <td colSpan="0" className="teams-name">
                    {res?.matchName}
                  </td>
                  <td>
                    <span
                      className="me-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                      }}
                    >
                      {res?.time}
                      <HiCheckCircle
                        style={{ fontSize: "18px", color: "#a01919" }}
                      />
                    </span>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                {res?.marketData?.map((market, index) => {
                  if (
                    market.marketName === "Match Odds" ||
                    market.marketName.includes("Bookmaker")
                  ) {
                    return (
                      <React.Fragment
                        key={market?.marketName + "marketName" + index}
                      >
                        <tr className="winner-table">
                          <td>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "700",
                              }}
                            >
                              {market?.marketName}
                              <HiCheckCircle
                                style={{ fontSize: "18px", color: "#a01919" }}
                              />
                            </span>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr className="winner-table">
                          {market?.selectionName1 ? (
                            <td>
                              {market?.selectionName1}{" "}
                              {market?.selectionAmount1 >= 0 ? (
                                <span
                                  style={{
                                    color: "green",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount1}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount1}
                                </span>
                              )}
                            </td>
                          ) : (
                            ""
                          )}
                          {market?.selectionName2 ? (
                            <td>
                              {market?.selectionName2}{" "}
                              {market?.selectionAmount2 >= 0 ? (
                                <span
                                  style={{
                                    color: "green",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount2}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount2}
                                </span>
                              )}
                            </td>
                          ) : (
                            ""
                          )}
                          {market?.selectionName3 ? (
                            <td>
                              {market?.selectionName3}{" "}
                              {market?.selectionAmount3 >= 0 ? (
                                <span
                                  style={{
                                    color: "green",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount3}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  {market?.selectionAmount3}
                                </span>
                              )}
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                        {/* <hr />  */}
                      </React.Fragment>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </Link>
      );
    }
  });
};

export default Datatable;
