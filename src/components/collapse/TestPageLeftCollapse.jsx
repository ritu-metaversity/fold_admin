import { Button, Collapse, message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  bets_Lock,
  bets_Lock_Status,
  Bets_Odds_Pnl,
  Bet_Lock,
  Odds_List,
} from "../../routes/Routes";
import Bookmarktable from "../collapsetable/BookmarkTable";
import FancyTable from "../collapsetable/Fancytable";
import MatchOddTable from "../collapsetable/MatchOddPanel";
///styles
import "./styles.scss";
const { Panel } = Collapse;

const oddAbbrev = {
  Fancy2: "f2",
  Fancy3: "f3",
  OddEven: "od",
};

const TestPageLeftCollapse = () => {
  const [searchparam] = useSearchParams();
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [oddPnl, setOddPnl] = useState([]);
  const [betStatus, setBetlockStatus] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const id = searchparam.get("event-id");

  const getOdds = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Odds_List}`,
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

  const getOddPnl = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Bets_Odds_Pnl}`,
        { matchId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOddPnl(res.data.data);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        }
      });
  };

  const BetLockStatus = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${bets_Lock_Status}`,
        { matchId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setBetlockStatus(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    BetLockStatus();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      getOdds();
      getOddPnl();
    }, 500);

    return () => clearInterval(timer);
  }, [odddata]);

  const getBetLock = async (marketNameid) => {
    setLoader({ ...loader, [marketNameid]: true });
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Bet_Lock}`,
        { matchId: id, marketName: marketNameid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        BetLockStatus();
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        }
      });
    setLoader({ ...loader, [marketNameid]: false });
  };

  if (!odddata || !prevState) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  const endUIArray = [];

  const UIArray = Object.keys(odddata).map((keyName) => {
    if (
      ["Odds", "Bookmaker", "Fancy"].includes(keyName) ||
      !odddata[keyName]?.length
    )
      return "";

    if (odddata[keyName] && odddata[keyName].length <= 0)
      endUIArray?.push(
        <Collapse key={keyName}>
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
                <div className="btn" style={{ gap: "10px", display: "flex" }}>
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
    else
      return (
        <Collapse key={keyName}>
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
                <div className="btn" style={{ gap: "10px", display: "flex" }}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      getBetLock(oddAbbrev[keyName]);
                    }}
                    type="primary"
                    style={{
                      background: "#F18521",
                      color: "white",
                    }}
                  >
                    {loader[oddAbbrev[keyName]] ? (
                      <Spin style={{ width: "100%", margin: "auto" }} />
                    ) : betStatus[oddAbbrev[keyName]] ? (
                      " Bet / Unlock"
                    ) : (
                      "Bet Lock"
                    )}
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
  });

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={["1", "2"]}>
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
                    getBetLock("modss");
                  }}
                  type="primary"
                  style={{ background: "#F18521", color: "white" }}
                >
                  {loader.modss ? (
                    <Spin style={{ width: "100%", margin: "auto" }} />
                  ) : betStatus.modss ? (
                    " Bet / Unlock"
                  ) : (
                    "Bet Lock"
                  )}
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
              pnlData={oddPnl}
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
                    getBetLock("bm");
                  }}
                  type="primary"
                  style={{ background: "#F18521", color: "white" }}
                >
                  {loader.bm ? (
                    <Spin style={{ width: "100%", margin: "auto" }} />
                  ) : betStatus.bm ? (
                    "Bet / Unlock"
                  ) : (
                    "Bet Lock"
                  )}
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
              data={odddata.Bookmaker.filter((ele) => ele?.t !== "TOSS")}
              prev={prevState.Bookmaker.filter((ele) => ele?.t !== "TOSS")}
              pnlData={oddPnl}
            />
          </div>
        </Panel>
      </Collapse>
      <Collapse bordered={false}>
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
              Bookmaker TOSS
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
              data={odddata.Bookmaker.filter((ele) => ele?.t === "TOSS")}
              prev={prevState.Bookmaker.filter((ele) => ele?.t === "TOSS")}
              pnlData={oddPnl}
            />
          </div>
        </Panel>
        <div className="fancy-panel-conatiner">
          {UIArray.map((item) => {
            return item;
          })}
          {endUIArray.map((item) => {
            return item;
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default TestPageLeftCollapse;
