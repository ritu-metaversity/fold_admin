/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Table, DatePicker, Select, Modal } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Casino_Card_Data,
  Casiono,
  Search_Api,
  Sport_Profite,
} from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import dayjs from "dayjs";
import moment from "moment";
import PnlBetHistory from "./PnlBetHistory";
import DownloadReport from "../downloadReport/DownloadReport";
///styles
// import "./styles.scss";
// import PtsModal from "./PtsModal";
const CasinoProfiteLossTable = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [pnlBetAmount, setPnlBetAmount] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { RangePicker } = DatePicker;
  const [DataList, setDataList] = useState([]);
  const [dateTo, setDateTo] = useState(dayjs());
  const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, "day"));
  ////edit profile State
  const [searchData, setSearchData] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);
  const [id, setId] = useState("");
  const [sportsList, setSportsList] = useState([]);
  const [sportsId, setSportsId] = useState([]);
  const [sportChangeId, setSportChangeId] = useState("");
  const [valueDropDown, setvalueDropDown] = useState("323334");

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });

  const reportDownloadHeader = ["Match Name", "Pnl", "Upline Amount"];

  const reset = () => {
    setSearchData("");
    setMessage("");
    setDateFrom(dayjs().subtract(7, "day"));
    setDateTo(dayjs());
    tabledata({
      sportId: "323334",
      matchId: "",
      fromDate: dayjs().subtract(7, "day").toISOString().split("T")[0],
      toDate: dayjs().toISOString().split("T")[0],

      userId: "",
      pageNumber: 0,
      pageSize: 25,
    });
  };

  const handleChange2 = (event) => {
    setSearchText(event.target.value);
  };

  const handleClick = () => {
    setSearchText(message);
    tabledata();
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates?.length) {
      setDateTo(dates[1]);
      setDateFrom(dates[0]);
    } else {
    }
  };

  //////deposit Modal

  const Search = async (e) => {
    const value = e.target.value;
    setSearchData(value);
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Search_Api}term=${value}&_type=${value}&q=${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSearchDataList([]);

        setSearchDataList(res.data.data);
      })
      .catch((error) => {
        setSearchDataList([]);
      });
  };
  const tabledata = async (DateFrom) => {
    setLoading((prev) => ({ ...prev, accountStatement: true }));
    // console.log(dateTo, dateTo.toISOString());
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Sport_Profite}`,
        {
          sportId: String(valueDropDown),
          matchId: String(sportChangeId),

          fromDate: moment(dateFrom.toString()).format("YYYY-MM-DD"),
          toDate: moment(dateTo.toString()).format("YYYY-MM-DD"),
          userId: id,
          pageNumber: paginationData.index,
          pageSize: paginationData.noOfRecords,
          ...DateFrom,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data.market);
          setPnlBetAmount(res?.data?.data.totalPnl);
        } else {
          setDataList();
        }
      })
      .catch((erro) => {});
    setLoading((prev) => ({ ...prev, accountStatement: false }));
  };

  useEffect(() => {
    tabledata({});
  }, [paginationData.index, paginationData.noOfRecords]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        accountStatement: false,
      }));
    };
  }, [setLoading]);
  const columns = [
    {
      title: "Match Name",
      dataIndex: "matchName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.pnl).toLowerCase().includes(value.toLowerCase()) ||
          String(record.matchName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.uplineAmount)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.commssionMila)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.commssionDiya)
            .toLowerCase()
            .includes(String(value).toLowerCase())
        );
      },
    },
    {
      title: "pnl",
      dataIndex: "pnl",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}</span>
      ),
    },

    {
      title: "uplineAmount",
      dataIndex: "uplineAmount",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text) => (
        <Button
          style={{ background: "orange", border: "none", color: "white" }}
          onClick={() => showModal(text)}
        >
          View
        </Button>
      ),
    },

    // {
    //   title: "commssionMila",
    //   dataIndex: "commssionMila",
    // },
    // {
    //   title: "commssionDiya",
    //   dataIndex: "commssionDiya",
    // },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.pnl + res.credit + res.commssionMila + index,
      matchName: res?.matchName,
      pnl: res.pnl,

      uplineAmount: res.uplineAmount,
      Action: res.matchId,
      // commssionMila: (
      //   <span style={{ color: res.commssionMila >= 0 ? "green" : "red" }}>
      //     {res.commssionMila}
      //   </span>
      // ),
      // commssionDiya: (
      //   <span style={{ cursor: "pointer" }}>{res?.commssionDiya}</span>
      // ),
    };
  });
  const Increment = () => {
    if (paginationData.index < paginationData.totalPages) {
      setPaginationData({ ...paginationData, index: paginationData.index + 1 });
    }

    // setPageIndex(PageIndex + 1);
  };
  const Decrement = () => {
    if (paginationData.index > 0) {
      setPaginationData({ ...paginationData, index: paginationData.index - 1 });
    }
    // setPageIndex(PageIndex - 1);
  };
  const ResetCounter = () => {
    setPaginationData({ ...paginationData, index: 0 });
  };
  const LastCounter = () => {
    setPaginationData({
      ...paginationData,
      index: paginationData.totalPages - 1,
    });
  };

  const [listDisplay, setListDisplay] = useState(false);
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
  };
  useEffect(() => {
    const getSpotsList = async () => {
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Casiono}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setSportsList(res?.data?.data);
        })
        .catch((error) => {});
    };
    getSpotsList();
  }, []);

  const gatSportsId = async (id) => {
    setLoading((prev) => ({ ...prev, bethistorygatSportsId: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Casino_Card_Data}`,
        { id: id, appUrl: window.location.hostname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data) {
          setSportsId(res?.data?.data);
        } else {
          setSportsId({});
        }
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, bethistorygatSportsId: false }));
  };

  const sportChange = (value) => {
    setSportChangeId(value.value);
  };
  const handleChange = (value) => {
    setvalueDropDown(value.value);
    //  console.log(value.key); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    gatSportsId(value.value);
  };
  const option1 = sportsList?.map((item, index) => ({
    key: item.id + item?.name + index,
    value: item?.id,
    label: item?.name,
  }));
  const option2 = sportsId?.map((item, index) => ({
    key: item.gameId + item?.gameName + index,
    value: item?.gameId,
    label: item?.gameName,
  }));
  const [matchId, setMatchId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setMatchId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const pnlAmou = [{ pnlBetAmount: Number(pnlBetAmount).toFixed(3) }];
  const pnlHeader = ["Pnl Bet Amount"];
  return (
    <>
      <Modal
        title="Bet History"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={900}
        className="pnl-bet-history"
        destroyOnClose
      >
        <PnlBetHistory matchId={matchId} sportId="2" />
      </Modal>
      <div className="table" style={{ width: "98%", padding: "10px" }}>
        <div className="search Account-list-search">
          <div className="left-col">
            <div className="search-input-account-statement">
              <div className="search-input-account-div">
                <label
                  style={{
                    color: "#495057",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Search By Client Name
                </label>
                <Input
                  placeholder="search here....."
                  name="message"
                  onChange={Search}
                  value={searchData}
                  autoComplete="off"
                  onFocus={() => setListDisplay(true)}
                  // onBlur={() => setListDisplay(false)}
                  style={{ margin: "7px 0px 7px 0px" }}
                  className="input-dropdown"
                />
                <div
                  className={listDisplay ? "dropdown-list" : "dropdown-list2"}
                >
                  {searchDataList?.map((res, index) => {
                    return (
                      <div
                        style={{ borderBottom: "1px solid #e1dbdb" }}
                        key={res.id + res.text + index}
                      >
                        <p onClick={() => setIdText(res.id, res.text)}>
                          {res.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="date-search">
              <label
                style={{
                  color: "#495057",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Select Date Range
              </label>
              <RangePicker
                bordered={false}
                className="rane-picker"
                value={[dateFrom, dateTo]}
                onChange={onRangeChange}
                disabledDate={(d) =>
                  !d ||
                  d.isBefore(dayjs().subtract(2, "month")) ||
                  d.isAfter(dayjs())
                }
                defaultValue={[dayjs(), dayjs()]}
              />
            </div>
            <div className="filter-Middle-col">
              <Select
                labelInValue
                defaultValue={{
                  value: "",
                  label: "Select Casino",
                }}
                style={{
                  width: 120,
                  paddingRight: "5px",
                }}
                onChange={handleChange}
                options={option1}
              ></Select>

              <Select
                labelInValue
                defaultValue={{
                  value: "",
                  label: "Casino List",
                }}
                style={{
                  width: 120,
                }}
                onChange={sportChange}
                options={option2}
              ></Select>
            </div>
          </div>
        </div>
        <div
          className="account-serch-btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={handleClick}
              style={{ background: "#23292E", color: "white" }}
            >
              Load
            </Button>
            <Button
              onClick={reset}
              style={{ background: "#eff2f7", color: "black" }}
            >
              Reset
            </Button>
          </div>
          <p
            style={{
              fontSize: "18px",
            }}
          >
            Pnl Bet Amount:
            <span style={{ color: pnlBetAmount < 0 ? "red" : "green" }}>
              {Number(pnlBetAmount).toFixed(3)}
            </span>
          </p>
        </div>
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={paginationData.noOfRecords}
              onChange={(e) =>
                setPaginationData({
                  ...paginationData,
                  noOfRecords: Number(e.target.value),
                })
              }
            >
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </select>
            &nbsp;entries
          </label>
          <div className="serch-input-account-statement">
            <input
              type="search"
              placeholder="search..."
              onChange={handleChange2}
              style={{
                border: "1px solid #ced4da",
                padding: "0.4rem 0.5rem",
                borderRadius: "3px",
              }}
            />
          </div>
        </div>
        <DownloadReport
          dataReport={data}
          header={reportDownloadHeader}
          reportType="CasinoProfitAndLoss"
          reportFile={"Casino Profit & Loss"}
          pnlHeader={pnlHeader}
          pnlAmount={pnlAmou}
        />
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable"
          pagination={{ pageSize: paginationData.noOfRecords }}
        />
        <div className="pagination">
          <ul className="pagination-rounded mb-0">
            <ul>
              <li>
                <span style={{ cursor: "pointer" }} onClick={ResetCounter}>
                  «
                </span>
              </li>
              <li>
                <span style={{ cursor: "pointer" }} onClick={Decrement}>
                  ‹
                </span>
              </li>
              <li role="presentation" className="page-item active">
                <button>{paginationData.index + 1}</button>
              </li>
              <li>
                <span style={{ cursor: "pointer" }} onClick={Increment}>
                  ›
                </span>
              </li>
              <li>
                <span onClick={LastCounter} style={{ cursor: "pointer" }}>
                  »
                </span>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CasinoProfiteLossTable;
