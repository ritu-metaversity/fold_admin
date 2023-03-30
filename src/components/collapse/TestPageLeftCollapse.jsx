/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Collapse, Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import {
  bets_Lock_Status,
  Bets_Odds_Pnl,
  Bet_Lock,
  Bet_User_Book,
  Max_Bet_Min_Bet,
  Odds_List,
} from "../../routes/Routes";
import { socket } from "../../webSocket/Socket";
import Bookmarktable from "../collapsetable/BookmarkTable";
import FancyTable from "../collapsetable/Fancytable";
import MatchOddTable from "../collapsetable/MatchOddPanel";
import { notifyToast } from "../toast/Tost";
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
  const userType = localStorage.getItem("userType");
  const [searchparam] = useSearchParams();
  const { loading, setLoading } = useContext(LoaderContext);
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();
  const [oddPnl, setOddPnl] = useState([]);
  const [betStatus, setBetlockStatus] = useState([]);
  const [maxBetData, setMaxBetData] = useState([]);
  const [userBook, setUserBook] = useState([]);
  const [oddSocketConnected, setOddSocketConnected] = useState(false);
  const navigate = useNavigate();

  const id = searchparam.get("event-id");
  // console.log(, "odddata");
  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
  }, []);

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
      .catch((error) => {});
    // setLoading(false);
  };

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

  useEffect(() => {
    getOddPnl();
    const timer = setInterval(() => {
      getOddPnl();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getBetLock = async (marketNameid) => {
    setLoading((prev) => ({ ...prev, marketNameid: true }));
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
      .post(`${process.env.REACT_APP_BASE_URL}/${Bet_User_Book}`, data, {
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
  if (!odddata || !prevState) {
    return;
  }
  const endUIArray = [];
  const UIArray = Object.keys(odddata).map((keyName) => {
    if (
      !["Fancy2", "Fancy3", "OddEven"].includes(keyName) ||
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
      {odddata?.Odds[0]?.runners[0]?.name ? (
        <div className="heading">
          <h4>
            {`${odddata?.Odds[0]?.Series} > ${odddata?.Odds[0]?.runners[0]?.name} v ${odddata?.Odds[0]?.runners[1]?.name}`}
          </h4>
          <h4>{odddata?.Odds[0]?.eventTime}</h4>
        </div>
      ) : (
        ""
      )}

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
        {odddata?.Odds?.filter((item) => item.Name === "Match Odds").map(
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
                    maxbet={maxBetData.Odds?.length && maxBetData.Odds[index]}
                  />
                </div>
              </Panel>
            );
          }
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

                // maxbet={maxBetData}
              />
            </div>
          </Panel>
        ) : (
          ""
        )}
        {odddata?.Odds?.filter((item) => item.Name !== "Match Odds").map(
          (item, index) => {
            if (!(item?.runner?.length > 0)) return <></>;
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
                    maxbet={maxBetData.Odds?.length && maxBetData.Odds[index]}
                  />
                </div>
              </Panel>
            );
          }
        )}
      </Collapse>
      <Collapse bordered={false} defaultActiveKey={["Toss"]}>
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
