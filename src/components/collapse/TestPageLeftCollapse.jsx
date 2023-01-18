import { Button, Collapse, message, Modal, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  bets_Lock_Status,
  Bets_Odds_Pnl,
  Bet_Lock,
  Odds_List,
} from "../../routes/Routes";
import Bookmarktable from "../collapsetable/BookmarkTable";
import FancyTable from "../collapsetable/Fancytable";
import MatchOddTable from "../collapsetable/MatchOddPanel";
import UserBook from "../userBook/UserBook";
///styles
import "./styles.scss";
const { Panel } = Collapse;

const oddAbbrev = {
  Fancy2: "F2",
  Fancy3: "F3",
  OddEven: "OE",
};

const TestPageLeftCollapse = () => {
  const [searchparam] = useSearchParams();
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [oddPnl, setOddPnl] = useState([]);
  const [betStatus, setBetlockStatus] = useState([]);
  const [loader, setLoader] = useState({});
  const [userBook, setUserBook] = useState([]);
  const navigate = useNavigate();

  const id = searchparam.get("event-id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (marketId) => {
    getUserBook(marketId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        if (res.data.data) {
          setBetlockStatus(res?.data?.data);
        } else {
          setBetlockStatus([]);
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

  useEffect(() => {
    BetLockStatus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getOdds();
      getOddPnl();
    }, 500);

    return () => clearInterval(timer);
  }, [odddata]);

  const getBetLock = async (marketNameid) => {
    setLoader({ ...loader, [marketNameid]: true });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/${Bet_Lock}`,
        { matchId: id, marketName: marketNameid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        message.success(response.data.message);
        BetLockStatus();
      }
    } catch (err) {
      if (err) {
        if (err.response.data.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          message.error(err.response.data.message);
        } else {
          message.error(err.response.data.message);
        }
      }
    }

    setLoader({ ...loader, [marketNameid]: false });
  };

  const getUserBook = async (marketId) => {
    const data = { marketId: marketId, userId: "" };
    await axios
      .post("http://api.a2zscore.com/admin-new-apis/bets/user-book", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserBook(res.data.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
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

    if (odddata[keyName] && odddata[keyName]?.length <= 0)
      endUIArray.push(
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
                      showModal(odddata[keyName][0]?.mid);
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
                    ) : betStatus.find((res) => res === oddAbbrev[keyName]) ? (
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
      <Modal
        title="User Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1140}
        footer={null}
        destroyOnClose
        className="user-Book-modal"
      >
        <UserBook data={userBook} />
      </Modal>
      <Collapse bordered={false} defaultActiveKey={["1", "2"]}>
        {odddata.Odds.length > 0 ? (
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
                      getBetLock(odddata?.Odds[0].marketId);
                    }}
                    type="primary"
                    style={{ background: "#F18521", color: "white" }}
                  >
                    {loader[odddata?.Odds[0].marketId] ? (
                      <Spin style={{ width: "100%", margin: "auto" }} />
                    ) : betStatus?.find(
                        (res) => res === odddata?.Odds[0].marketId
                      ) ? (
                      " Bet / Unlock"
                    ) : (
                      "Bet Lock"
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(odddata?.Odds[0].marketId);
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
                data={odddata?.Odds}
                prev={prevState?.Odds}
                pnlData={oddPnl}
              />
            </div>
          </Panel>
        ) : (
          ""
        )}
        {odddata?.Bookmaker.filter((ele) => ele?.t !== "TOSS").length > 0 ? (
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
                      getBetLock(
                        odddata?.Bookmaker?.find((type) => type.t !== "TOSS")
                          .mid
                      );
                    }}
                    type="primary"
                    style={{ background: "#F18521", color: "white" }}
                  >
                    {loader[
                      odddata?.Bookmaker?.find((type) => type.t !== "TOSS").mid
                    ] ? (
                      <Spin style={{ width: "100%", margin: "auto" }} />
                    ) : betStatus?.find(
                        (res) =>
                          res ===
                          odddata?.Bookmaker?.find((type) => type.t !== "TOSS")
                            .mid
                      ) ? (
                      "Bet / Unlock"
                    ) : (
                      "Bet Lock"
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(
                        odddata?.Bookmaker?.filter(
                          (ele) => ele?.t !== "TOSS"
                        )[0].mid
                      );
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
                data={odddata?.Bookmaker?.filter((ele) => ele?.t !== "TOSS")}
                prev={prevState?.Bookmaker?.filter((ele) => ele?.t !== "TOSS")}
                pnlData={oddPnl}
              />
            </div>
          </Panel>
        ) : (
          ""
        )}
      </Collapse>
      <Collapse bordered={false}>
        {odddata?.Bookmaker?.filter((ele) => ele?.t === "TOSS").length > 0 ? (
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
                      getBetLock(
                        odddata?.Bookmaker?.find((type) => type.t === "TOSS")
                          .mid
                      );
                    }}
                    type="primary"
                    style={{ background: "#F18521", color: "white" }}
                  >
                    {loader[
                      odddata?.Bookmaker.find((type) => type.t === "TOSS").mid
                    ] ? (
                      <Spin style={{ width: "100%", margin: "auto" }} />
                    ) : betStatus?.find(
                        (res) =>
                          res ===
                          odddata?.Bookmaker.find((type) => type.t === "TOSS")
                            .mid
                      ) ? (
                      "Bet / Unlock"
                    ) : (
                      "Bet Lock"
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(
                        odddata?.Bookmaker?.filter(
                          (ele) => ele?.t === "TOSS"
                        )[0].mid
                      );
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
                data={odddata?.Bookmaker?.filter((ele) => ele?.t === "TOSS")}
                prev={prevState?.Bookmaker?.filter((ele) => ele?.t === "TOSS")}
                pnlData={oddPnl}
              />
            </div>
          </Panel>
        ) : (
          ""
        )}
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
