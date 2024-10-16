/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Collapse, Modal, Switch } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import {
  bets_Lock_Status,
  Bets_Odds_Pnl,
  Bet_Lock,
  Bet_User_Book,
  Completed_match,
  Odds_List,
  Fancy_Pnl,
  Bets_Odds_Pnl_winner,
} from "../../routes/Routes";
// import { socket } from "../../webSocket/Socket";
import Bookmarktable from "../collapsetable/BookmarkTable";
import FancyTable from "../collapsetable/Fancytable";
import MatchOddTable from "../collapsetable/MatchOddPanel";
import { notifyToast } from "../toast/Tost";
import UserBook from "../userBook/UserBook";
import { MdOutlineLiveTv, MdScoreboard } from "react-icons/md";
///styles
import "./styles.scss";
// import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import CompletedMatchTable from "../completedMatch/CompletedMatchTable";
import { io } from "socket.io-client";
import moment from "moment";
import DeletedBetList from "./DeletedBetList";

const { Panel } = Collapse;

const oddAbbrev = {
  Fancy2: "F2",
  Fancy3: "F3",
  OddEven: "OE",
};

const URL = import.meta.env.VITE_ANISH_SOCKET || "";
const socket = io(URL);
const TestPageLeftCollapse = () => {
  const userType = localStorage.getItem("userType");
  // const [searchparam] = useSearchParams();
  const { loading, setLoading } = useContext(LoaderContext);
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [oddPnl, setOddPnl] = useState([]);
  const [betStatus, setBetlockStatus] = useState([]);
  const [maxBetData, setMaxBetData] = useState([]);
  const [userBook, setUserBook] = useState([]);
  const [oddSocketConnected, setOddSocketConnected] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [matchToggle, setmatchToggle] = useState(false);
  const [matchScore, setMatchScore] = useState(false);
  const [fancyPnldata, setFancyPnldata] = useState([]);
  const [completedModal, setIsCompletedModal] = useState(false);
  const [deletedModal, setDeletedModal] = useState(false);

  const [completedMatch, setCompletedMatch] = useState([]);
  const navigate = useNavigate();

  // const id = searchparam.get("event-id");
  const { id, sportId } = useParams();
  const tvRef = useRef(null);
  const scale = (tvRef.current?.clientWidth || 300) / 280;
  // console.log(, "odddata");
  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
  }, []);
  const [marketid, setMarketid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (marketId) => {
    getUserBook(marketId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsCompletedModal(false);
  };
  const handleCancel = () => {
    setUserBook([]);
    setIsModalOpen(false);
    setIsCompletedModal(false);
  };

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  const oddFromSocket = (response) => {
    setMaxBetData(response);
    // setOdddata((fancyOdds) => {
    //   if (fancyOdds) {
    //     const newFancy = { ...fancyOdds };
    //     setPrevState(newFancy);
    //   } else {
    //     setPrevState(response);
    //   }
    //   return { ...response };
    // });
  };
  const getOdds = async () => {
    await axios
      .get(`${Odds_List}${id}`)
      .then((res) => {
        if (res?.status === 200) {
          if (!odddata) {
            setPrevState(res?.data);
          } else {
            setPrevState(odddata);
          }
          setOdddata(res?.data);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    socket.on("OddsUpdated", oddFromSocket);
    socket.on("JoinedSuccessfully", () => {
      setOddSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    let timer = setInterval(
      () =>
        !oddSocketConnected &&
        socket.emit("JoinRoom", {
          eventId: id,
        }),
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, [oddSocketConnected]);

  useEffect(() => {
    oddSocketConnected && setOddSocketConnected(false);
  }, [id]);

  const getOddPnl = async (check) => {
    // setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${
          check == 0 ? Bets_Odds_Pnl : Bets_Odds_Pnl_winner
        }`,
        check == 0 ? { matchId: id } : { marketId: marketid },
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
      .catch((error) => {});
    // setLoading(false);
  };

  // const { lastMessage: oddPnlLastMessage } = useWebSocket(
  //   `${import.meta.env.VITE_ANKIT_SOCKET}adminodd/${id}/${localStorage.getItem(
  //     "token"
  //   )}`,
  //   {
  //     shouldReconnect: () => true,
  //   }
  // );

  // useEffect(() => {
  //   if (oddPnlLastMessage?.data && JSON.parse(oddPnlLastMessage?.data)?.data)
  //     setOddPnl(JSON.parse(oddPnlLastMessage?.data).data);
  // }, [oddPnlLastMessage]);

  // const maxBetMinBetData = async () => {
  //   setLoading((prev) => ({ ...prev, maxBetMinBetData: true }));
  //   await axios
  //     .get(`${Max_Bet_Min_Bet}/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       // setLoading(false);
  //       setMaxBetData(res.data);
  //     })
  //     .catch((error) => {});
  //   setLoading((prev) => ({ ...prev, maxBetMinBetData: false }));
  // };
  // useEffect(() => {
  //   maxBetMinBetData();
  // }, []);

  const BetLockStatus = async () => {
    setLoading((prev) => ({ ...prev, BetLockStatus: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${bets_Lock_Status}`,
        { matchId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // setLoading(false);
        if (res?.data?.data) {
          setBetlockStatus(res?.data?.data);
        } else {
          setBetlockStatus([]);
        }
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, BetLockStatus: false }));
  };

  useEffect(() => {
    if (userType !== "0") {
      BetLockStatus();
    }
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
  }, [odddata, prevState, setLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      getOdds();
    }, 500);

    return () => clearInterval(timer);
  }, [odddata]);
  const [pnlWinnerCheck, setPnlWinnerCheck] = useState(0);
  useEffect(() => {
    getOddPnl(pnlWinnerCheck);
    const timer = setInterval(() => {
      getOddPnl(pnlWinnerCheck);
    }, 5000);
    return () => clearInterval(timer);
  }, [pnlWinnerCheck]);

  const getBetLock = async (marketNameid) => {
    setLoading((prev) => ({ ...prev, marketNameid: true }));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/${Bet_Lock}`,
        { matchId: id, marketName: marketNameid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        notifyToast().succes(response.data.message);
        BetLockStatus();
      }
    } catch (err) {}
    setLoading((prev) => ({ ...prev, marketNameid: false }));
  };

  const getUserBook = async (marketId) => {
    const data = { marketId: marketId, userId: "" };
    setLoading((prev) => ({ ...prev, getUserBook: true }));
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/${Bet_User_Book}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserBook(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, getUserBook: false }));
  };

  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        getUserBook: false,
        marketNameid: false,
        BetLockStatus: false,
      }));
    };
  }, []);

  // const { lastMessage: fancyPnlLastMessage } = useWebSocket(
  //   `${
  //     import.meta.env.VITE_ANKIT_SOCKET
  //   }adminfancy/${id}/${localStorage.getItem("token")}`,
  //   {
  //     shouldReconnect: () => true,
  //   }
  // );
  // useEffect(() => {
  //   if (
  //     fancyPnlLastMessage?.data &&
  //     JSON.parse(fancyPnlLastMessage?.data)?.data
  //   )
  //     setFancyPnldata(JSON.parse(fancyPnlLastMessage?.data).data);
  // }, [fancyPnlLastMessage]);

  const showDeletedModal = () => {
    setDeletedModal(true);
  };

  const handleCancelDeletedModal = () => {
    setDeletedModal(false);
  };

  const getfancyPnl = async () => {
    const data = { matchId: id };
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/${Fancy_Pnl}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFancyPnldata(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getfancyPnl();
    const timer = setInterval(() => {
      // console.log("getfancy pnl");
      getfancyPnl();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getCompletedMatch = async () => {
    const data = { matchId: id, markettype: "Fancy2Market" };
    setLoading((prev) => ({ ...prev, getUserBook: true }));
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/${Completed_match}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCompletedMatch(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, getUserBook: false }));
  };

  const showModalCompletedMatch = () => {
    setIsCompletedModal(true);
    getCompletedMatch();
  };

  const host = window.location.hostname;

  if (!odddata || !prevState) {
    return;
  }
  const endUIArray = [];
  const UIArray = Object.keys(odddata).map((keyName) => {
    if (
      !["Fancy2", "Fancy3", "OddEven", "BallByBall"].includes(keyName) ||
      !odddata[keyName]?.length
    )
      return "";

    if (odddata[keyName]) {
      endUIArray?.push(
        <Collapse key={keyName} defaultActiveKey={keyName}>
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
                  {userType === "4" ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        getBetLock(oddAbbrev[keyName]);
                      }}
                      type="primary"
                      style={{ background: "#F18521", color: "white" }}
                    >
                      {betStatus?.find((res) => res === oddAbbrev[keyName])
                        ? "Bet / Unlock"
                        : "Bet Lock"}
                    </Button>
                  ) : (
                    ""
                  )}
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
                maxbet={maxBetData[keyName]}
                fancyPnldata={fancyPnldata}
              />
            </div>
          </Panel>
        </Collapse>
      );
    } else return "";
  });

  return (
    <div>
      <Modal
        title="Completed Session"
        open={completedModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
        className="completed-match-modal"
      >
        <CompletedMatchTable data={completedMatch} />
      </Modal>
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
      <Modal
        title="Deleted Bet List"
        open={deletedModal}
        // onOk={handleOk}
        onCancel={handleCancelDeletedModal}
        width={800}
        footer={null}
        destroyOnClose
        // className="user-Book-modal"
      >
        <DeletedBetList handleCancelDeletedModal={handleCancelDeletedModal} />
      </Modal>
      <>
        <div className="heading">
          <h4>
            {` ${odddata?.Odds[0]?.runners[0]?.name} v ${odddata?.Odds[0]?.runners[1]?.name}`}
          </h4>
          <p style={{ color: "white" }}>
            {moment(odddata?.Odds[0]?.lastMatchTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </p>
          <h4>{odddata?.Odds[0]?.eventTime}</h4>
        </div>
        <div className="switch-clas">
          <div className="switch-left-col">
            <Switch
              checked={matchToggle}
              onChange={() => {
                setmatchToggle(!matchToggle);
                setToggle(false);
                setMatchScore(false);
              }}
              size="small"
            />
            <MdOutlineLiveTv />
          </div>
          {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                paddingLeft: "10px",
              }}
            > */}
          <Button
            onClick={showModalCompletedMatch}
            style={{
              background: "rgb(241, 133, 33)",
              color: "white",
              border: "none",
            }}
          >
            Completed Session
          </Button>
          {userType == "4" ? (
            <Button
              onClick={showDeletedModal}
              style={{
                background: "rgb(241, 133, 33)",
                color: "white",
                border: "none",
              }}
            >
              Deleted Bets
            </Button>
          ) : (
            ""
          )}

          {/* </div> */}
          <div className="switch-right-col">
            <div className="switch-1">
              <MdScoreboard />
              <Switch
                checked={toggle}
                onChange={() => {
                  setToggle(!toggle);
                  setmatchToggle(false);
                  setMatchScore(false);
                }}
                size="small"
              />
              <MdScoreboard />
              <Switch
                checked={matchScore}
                onChange={() => {
                  setMatchScore(!matchScore);
                  setmatchToggle(false);
                  setToggle(false);
                }}
                size="small"
              />
            </div>
          </div>
        </div>
        {toggle && (
          <iframe
            width="100%"
            height="200px"
            title="score-iframe"
            // src={`${import.meta.env.VITE_MATCH_SCORE}/${id}`}
            src={`https://score.247idhub.com/index.html/event/${id}?theme=crazy-diamond`}
          />
        )}
        {matchToggle && (
          <iframe
            width="100%"
            className="live-iframe"
            ref={tvRef}
            style={{
              aspectRatio: "16/9",
              transform: `scale(${scale})`,
            }}
            title="score-iframe"
            src={`https://100tun.online/web/${id}.html?`}
            // src={`https://stream.openhomepageforapi.live/YGapp/play.html?name=ttfour&autoplay=true`}
            // src={`https://luckybet.one/?eventId=${id}`}
          />
        )}
        {matchScore && (
          <iframe
            width="100%"
            height="200px"
            title="score-iframe"
            src={`https://score.247idhub.com/go-score/template/${sportId}/${id}`}

            // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sportId}/${id}`}
          />
        )}
      </>
      {/* <ScoreComponent /> */}
      <Collapse
        bordered={false}
        defaultActiveKey={[
          0,
          "Match Odds",
          "2b",
          "Completed Match",
          "Tied Match",
          "4",
          "book",
        ]}
      >
        {host.includes("onlysession.in") ? null: odddata?.Odds?.filter((item) => item.Name === "Match Odds").map(
          (item, index) => {
            return (
              <Panel
                key={item.Name}
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
                    <div
                      className="btn"
                      style={{ gap: "10px", display: "flex" }}
                    >
                      {userType === "4" ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            getBetLock(item?.marketId);
                          }}
                          type="primary"
                          style={{ background: "#F18521", color: "white" }}
                        >
                          {betStatus?.find((res) => res == item.marketId)
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
                    data={item}
                    prev={prevState?.Odds[index]}
                    pnlData={oddPnl}
                    // maxbet={maxBetData.Odds?.length && maxBetData.Odds[index]}
                  />
                </div>
              </Panel>
            );
          }
        )}
        {host.includes("onlysession.in") ? null: odddata?.Bookmaker.filter((ele) => ele?.t !== "TOSS").length > 0 ? (
          <Panel
            header={
              <div
                className="panel-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key="book"
              >
                Bookmaker
                <div className="btn" style={{ gap: "10px", display: "flex" }}>
                  {userType === "4" ? (
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
            key="2b"
            className="left-panel-header"
          >
            <div className="collpase-div">
              <Bookmarktable
                data={odddata?.Bookmaker?.filter((ele) => ele?.t !== "TOSS")}
                prev={prevState?.Bookmaker?.filter((ele) => ele?.t !== "TOSS")}
                pnlData={oddPnl}
                maxbet={maxBetData?.Bookmaker?.filter(
                  (odd) => odd.t !== "TOSS"
                )}
              />
            </div>
          </Panel>
        ) : (
          ""
        )}
        {/* fancyOdds.Odds?.filter( (item) => !["Match Odds", "Tied
        Match"].includes(item.Name) */}
        {host.includes("onlysession.in") ? null: odddata?.Odds?.filter((item) => "Match Odds" !== item.Name).map(
          (item, index) => {
            if (!(item?.runners?.length > 0)) return <></>;

            return (
              <Panel
                key={item.Name}
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
                    <div
                      className="btn"
                      style={{ gap: "10px", display: "flex" }}
                    >
                      {userType === "4" ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            getBetLock(item.marketId);
                          }}
                          type="primary"
                          style={{ background: "#F18521", color: "white" }}
                        >
                          {betStatus?.find((res) => res == item.marketId)
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
                    data={item}
                    prev={prevState?.Odds[index]}
                    pnlData={oddPnl}
                    pnlWinnerCheck={pnlWinnerCheck}
                    setMarketid={setMarketid}
                    setPnlWinnerCheck={setPnlWinnerCheck}
                    maxbet={maxBetData.Odds?.length && maxBetData.Odds[index]}
                  />
                </div>
              </Panel>
            );
          }
        )}
      </Collapse>
      <Collapse bordered={false} defaultActiveKey={["Toss"]}>
        {host.includes("onlysession.in") ? null: odddata?.Bookmaker?.filter((ele) => ele?.t === "TOSS").length > 0 ? (
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
                Toss
                <div className="btn" style={{ gap: "10px", display: "flex" }}>
                  {userType === "4" ? (
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
            key="Toss"
            className="left-panel-header"
          >
            <div className="collpase-div">
              <Bookmarktable
                data={odddata?.Bookmaker?.filter((ele) => ele?.t === "TOSS")}
                prev={prevState?.Bookmaker?.filter((ele) => ele?.t === "TOSS")}
                pnlData={oddPnl}
                maxbet={maxBetData?.Bookmaker?.filter(
                  (odd) => odd.t === "TOSS"
                )}
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
