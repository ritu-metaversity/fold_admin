import { Button, Collapse, message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Bookmarktable from "../collapsetable/BookmarkTable";
import FancyTable from "../collapsetable/Fancytable";
import MatchOddTable from "../collapsetable/MatchOddPanel";
///styles
import "./styles.scss";
const { Panel } = Collapse;

const TestPageLeftCollapse = () => {
  const [searchparam] = useSearchParams();
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [bookmaker, setBookmaker] = useState([]);

  const navigate = useNavigate();
  const id = searchparam.get("event-id");

  // const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getOdds = async () => {
      await axios
        .post(
          "http://api.a2zscore.com/admin-new-apis/enduser/get-fancy-odds",
          { eventId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res?.status == 200) {
            if (!odddata) {
              setPrevState(res?.data);
            } else {
              setPrevState(odddata);
            }
            setOdddata(res?.data);
          }
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 401") {
            localStorage.removeItem("token");
            navigate("/");
            message.error(error.response.data.message);
          }
        });
    };

    const timer = setTimeout(() => {
      getOdds();
    }, 500);
    return () => clearTimeout(timer);
  }, [odddata]);

  if (!odddata || !prevState) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel
          header={
            <div
              className="panel-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              MATCH_ODDS
              <div className="btn" style={{ gap: "10px", display: "flex" }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="primary"
                  style={{ background: "#F18521", color: "white" }}
                >
                  Bet Lock
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="primary"
                  style={{
                    background: "#F18521",
                    color: "white",
                  }}
                >
                  User Book
                </Button>
              </div>
            </div>
          }
          key="1"
          className="left-panel-header"
        >
          <div className="collpase-div">
            <MatchOddTable
              name={"10k"}
              data={odddata.Odds}
              prev={prevState.Odds}
            />
          </div>
        </Panel>

        <Panel
          header={
            <div
              className="panel-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Bookmaker
              <div className="btn" style={{ gap: "10px", display: "flex" }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="primary"
                  style={{ background: "#F18521", color: "white" }}
                >
                  Bet Lock
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="primary"
                  style={{
                    background: "#F18521",
                    color: "white",
                  }}
                >
                  User Book
                </Button>
              </div>
            </div>
          }
          key="2"
          className="left-panel-header"
        >
          <div className="collpase-div">
            <Bookmarktable
              name={"10k"}
              data={odddata.Bookmaker}
              prev={prevState.Bookmaker}
            />
          </div>
        </Panel>

        <div className="fancy-panel-conatiner">
          {Object.keys(odddata).map((keyName) => {
            if (["Odds", "Bookmaker"].includes(keyName)) return "";
            return (
              <Collapse>
                <Panel
                  header={
                    <div
                      className="panel-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {keyName}
                      <div
                        className="btn"
                        style={{ gap: "10px", display: "flex" }}
                      >
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          type="primary"
                          style={{
                            background: "#F18521",
                            color: "white",
                          }}
                        >
                          User Book
                        </Button>
                      </div>
                    </div>
                  }
                  key="3"
                  className="left-panel-header"
                >
                  <div className="collpase-div">
                    <FancyTable
                      name={keyName}
                      data={odddata[keyName]}
                      prev={prevState[keyName]}
                    />
                  </div>
                </Panel>
              </Collapse>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default TestPageLeftCollapse;
