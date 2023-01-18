import { Spin } from "antd";
import React from "react";
import { FaBasketballBall } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
///styles
import "./styles.scss";
const Datatable = (props) => {
  const data = props?.data;

  if (!data) {
    return (
      <>
        <Spin
          style={{
            position: "absolute",
            left: "50%",
            top: "35%",
            height: "31px",
            width: "31px",
          }}
        />
      </>
    );
  }
  return data?.map((res) => {
    return (
      <div
        className="tabledata"
        key={res?.matchId + "marketAnalysis" + 1 + res.sportName}
      >
        <table className="table table-bordered">
          <thead className="table-head">
            <tr className="winner-table">
              <th colSpan="6" scope="col">
                <FaBasketballBall /> {res?.sportName}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="winner-table">
              <td scope="col" colSpan="0" className="teams-name">
                <Link to={`/test-match-screen?event-id=${res?.matchId}`}>
                  {res?.matchName}
                </Link>
              </td>
              <td scope="col">
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
              <td scope="col"></td>
              <td scope="col"></td>
            </tr>
            {res?.marketData?.map((market, index) => {
              return (
                <React.Fragment key={market?.marketName + "marketName" + index}>
                  <tr className="winner-table">
                    <td>
                      <span style={{ display: "flex", alignItems: "center" }}>
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
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });
};

export default Datatable;
