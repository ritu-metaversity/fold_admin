import { Button, Collapse, Empty, message, Modal, Spin } from "antd";
import axios from "axios";
import { message as antdmessage } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../App";
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
import loader from "../../assets/img/loder.svg";
///styles
import "./styles.scss";

const { Panel } = Collapse;

const oddAbbrev = {
  Fancy2: "F2",
  Fancy3: "F3",
  OddEven: "OE",
};

const TestPageLeftCollapse = () => {
  const userType = localStorage.getItem("userType");
  const [searchparam] = useSearchParams();
  const { loading, setLoading } = useContext(LoaderContext);
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [oddPnl, setOddPnl] = useState([]);
  const [betStatus, setBetlockStatus] = useState([]);

  const [userBook, setUserBook] = useState([]);
  const navigate = useNavigate();

  const id = searchparam.get("event-id");
  // console.log(, "odddata");
  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (marketId) => {
    getUserBook(marketId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setUserBook([]);
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
        // console.log(res.data);

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
        message.error(error.response.data.message);
        if (error.response.data.status === 401) {
          navigate("/");
          localStorage.clear();
          message.error(error.response.data.message);
        }
      });
  };

  const getOddPnl = async () => {
    // setLoading(true);
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

        // setLoading(false);
      })
      .catch((error) => {
        antdmessage.error(error.response.data.message);
        if (error.response.data.status === 401) {
          navigate("/");
          localStorage.clear();
          message.error(error.response.data.message);
        }
      });
    // setLoading(false);
  };

  const BetLockStatus = async () => {
    setLoading((prev) => ({ ...prev, BetLockStatus: true }));
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
        // setLoading(false);
        if (res.data.data) {
          setBetlockStatus(res?.data?.data);
        } else {
          setBetlockStatus([]);
        }
      })
      .catch((error) => {
        // setLoading(false);
        message.error(error.response.data.message);
        if (error.response.data.status === 401) {
          setLoading((prev) => ({ ...prev, BetLockStatus: false }));
          console.log("navigate");
          navigate("/");
          localStorage.clear();
          // message.error(error.response.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, BetLockStatus: false }));
  };

  useEffect(() => {
    BetLockStatus();
  }, []);
  useEffect(() => {
    if (!odddata || !prevState) {
      if (!loading.getOdds) {
        setLoading((prev) => ({ ...prev, getOdds: true }));
      }
    } else {
      if (loading.getOdds) {
        setLoading((prev) => ({ ...prev, getOdds: false }));
      }
    }

    return () => setLoading((prev) => ({ ...prev, getOdds: false }));
  }, [odddata, prevState]);
  useEffect(() => {
    const timer = setInterval(() => {
      getOdds();
      getOddPnl();
    }, 500);

    return () => clearInterval(timer);
  }, [odddata]);

  const getBetLock = async (marketNameid) => {
    setLoading({ ...loading, [marketNameid]: true });

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
      message.error(err.response.data.message);

      if (err.response.data.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        message.error(err.response.data.message);
      } else {
        message.error(err.response.data.message);
      }
    }
    setLoading({ ...loading, [marketNameid]: false });
  };

  const getUserBook = async (marketId) => {
    const data = { marketId: marketId, userId: "" };
    setLoading((prev) => ({ ...prev, getUserBook: true }));
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

        if (error.response.data.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        } else {
          message.error(error.response.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, getUserBook: false }));
  };

  if (!odddata || !prevState) {
    return;
  }
  const endUIArray = [];
  const UIArray = Object.keys(odddata).map((keyName) => {
    if (
      !["Fancy2", "Fancy3", "Odds", "Bookmaker", "OddEven"].includes(keyName) ||
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
            key={keyName}
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
                  {userType == 4 ? (
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
                      {betStatus.find((res) => res === oddAbbrev[keyName])
                        ? " Bet / Unlock"
                        : "Bet Lock"}
                    </Button>
                  ) : (
                    ""
                  )}
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
      <div className="heading">
        <h4>TEST MATCHES PAKISTAN V NEW ZEALAND</h4>
        <h4>{odddata.Odds[0].eventTime}</h4>
      </div>
      <Collapse bordered={false} defaultActiveKey={["0", "1"]}>
        {odddata?.Odds?.map((item, index) => {
          return (
            <Panel
              key={index}
              header={
                <div
                  className="panel-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.Name}
                  <div className="btn" style={{ gap: "10px", display: "flex" }}>
                    {userType == 4 ? (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          getBetLock(item.marketId);
                        }}
                        type="primary"
                        style={{ background: "#F18521", color: "white" }}
                      >
                        {betStatus?.find((res) => res === item.marketId)
                          ? " Bet / Unlock"
                          : "Bet Lock"}
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal(item.marketId);
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
              className="left-panel-header"
            >
              <div className="collpase-div">
                <MatchOddTable
                  name={"10k"}
                  data={item}
                  prev={prevState?.Odds[index]}
                  pnlData={oddPnl}
                />
              </div>
            </Panel>
          );
        })}

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
                  {userType == 4 ? (
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
                      {betStatus?.find(
                        (res) =>
                          res ===
                          odddata?.Bookmaker?.find((type) => type.t !== "TOSS")
                            .mid
                      )
                        ? "Bet / Unlock"
                        : "Bet Lock"}
                    </Button>
                  ) : (
                    ""
                  )}
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
            key="2bm"
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
                  {userType == 4 ? (
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
                      {betStatus?.find(
                        (res) =>
                          res ===
                          odddata?.Bookmaker.find((type) => type.t === "TOSS")
                            .mid
                      )
                        ? "Bet / Unlock"
                        : "Bet Lock"}
                    </Button>
                  ) : (
                    ""
                  )}
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
