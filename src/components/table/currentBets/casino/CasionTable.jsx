import { Button, Input, Table, Tooltip, Radio, Select } from "antd";

import React, { createContext, useContext, useEffect, useState } from "react";

import { AiFillEye } from "react-icons/ai";
///styles
// import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderContext } from "../../../../App";
import {
  Casino_Card_Data,
  Casiono,
  Search_Api,
  TabBet_History,
  Tab_CurrentBet,
} from "../../../../routes/Routes";

// import { Table_ActiveUser, Tab_CurrentBet } from "../../../../routes/Routes";

export const UserModalContext = createContext({
  handleCancel: () => {},
});

const Casinotable = () => {
  const [searchText, setSearchText] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [radioValuefilte, setRadioValuefilter] = useState("1");
  const [DataList, setDataList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [sada, setsada] = useState("");
  const [sportsId, setSportsId] = useState([]);
  const [userId, setUserId] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);
  ////get Sports Key
  const [valueDropDown, setvalueDropDown] = useState("");
  const [sendSportId, setSendSportId] = useState("");
  //get Sports List
  const [sportChangeId, setSportChangeId] = useState("");
  const [sendEventId, setSendEventId] = useState("");
  const [sportsList, setSportsList] = useState([]);
  //////// change password
  const [searchData, setSearchData] = useState("");
  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });

  const navigate = useNavigate();

  //////deposit Modal

  //////withdrawal Modal

  ///show profile modal

  const tabledata = async (searchData) => {
    setSearchData(searchData);
    setLoading((prev) => ({ ...prev, bethistorytabledata: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Tab_CurrentBet}`,
        {
          betType: radioValuefilte,
          noOfRecords: paginationData.noOfRecords,
          sportType: 2,
          index: paginationData.index,
          isDeleted: isDeleted,
          userId: searchData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setsada(res?.data?.data?.totalBets);
        setTotalAmount(res?.data?.data?.totalStake);
        if (res?.data?.data?.dataList) {
          setLoading(false);
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data?.dataList);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   localStorage.removeItem("token");
        //   navigate("/");
        //   message.error(error.response.data.message);
        // }
      });
    setLoading((prev) => ({ ...prev, bethistorytabledata: false }));
  };

  useEffect(() => {
    tabledata();
  }, [
    sendSportId,
    sendEventId,
    userId,
    paginationData?.index,
    paginationData?.noOfRecords,
    isDeleted,
  ]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        bethistorytabledata: false,
      }));
    };
  }, []);
  const columns = [
    {
      title: "Event Type",
      dataIndex: "EventType",
    },
    {
      title: "Event Name",
      dataIndex: "EventName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.EventName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.UserName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.MName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Nation).toLowerCase().includes(value.toLowerCase()) ||
          String(record.URate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.PlaceDate).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "UserName",
    },
    {
      title: "M Name",
      dataIndex: "MName",
    },
    {
      title: "Nation",
      dataIndex: "Nation",
    },
    {
      title: "U Rate",
      dataIndex: "URate",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
    },
    {
      title: "Place Date",
      dataIndex: "PlaceDate",
    },
    {
      title: "Detail",
      dataIndex: "Detail",
    },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.rate + res?.time + res?.amount + index,
      isBack: res?.isback,
      EventType: res?.eventType,
      EventName: res?.eventNamem,
      UserName: res?.username,
      MName: res?.marketname,
      Nation: res?.nation,
      URate: res?.rate,
      Amount: res?.amount,
      PlaceDate: res?.time,

      Detail: (
        <>
          <Tooltip title={res?.deviceInfo}>
            <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
          </Tooltip>
        </>
      ),
    };
  });

  const Increment = () => {
    if (paginationData?.index < paginationData?.totalPages) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index + 1,
      });
    }

    // setPageIndex(PageIndex + 1);
  };
  const Decrement = () => {
    if (paginationData?.index > 0) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index - 1,
      });
    }
    // setPageIndex(PageIndex - 1);
  };
  const ResetCounter = () => {
    setPaginationData({ ...paginationData, index: 0 });
  };
  const LastCounter = () => {
    setPaginationData({
      ...paginationData,
      index: paginationData?.totalPages - 1,
    });
  };
  /////////sprots list api
  useEffect(() => {
    const getSpotsList = async () => {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Casiono}`,
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
  }, [navigate]);

  //////first drop down value
  const handleChange = (value) => {
    setvalueDropDown(value.value);
    //  console.log(value.key); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    gatSportsId(value.value);
  };

  // second dropdown value
  const sportChange = (value) => {
    setSportChangeId(value.value);
  };

  const gatSportsId = async (id) => {
    setLoading((prev) => ({ ...prev, bethistorygatSportsId: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casino_Card_Data}`,
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

  /////call api on load button
  const getSportsid = () => {
    setSendSportId(valueDropDown);
    setSendEventId(sportChangeId);
    setUserId(searchText);
  };
  const option1 = sportsList?.map((item, index) => ({
    key: item.id + item?.name + index + index.logo,
    value: item?.id,
    label: item?.name,
  }));

  const option2 = sportsId?.map((item, index) => ({
    key: item.gameId + item?.gameCode + index,
    value: item?.gameId,
    label: item?.gameName,
  }));

  const onChange = (e) => {
    setIsDeleted(e.target.value);
  };

  const Search = async (e) => {
    const value = e.target.value;
    setSearchData(value);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Search_Api}term=${value}&_type=${value}&q=${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setSearchDataList(res.data.data);
      })
      .catch((error) => {
        setSearchDataList([]);
        // console.log(error);
      });
  };
  const [listDisplay, setListDisplay] = useState(false);
  const [id, setId] = useState("");
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
  };
  return (
    <>
      <div className="table" style={{ width: "100%" }}>
        <div className="current-bets-filter">
          <div className="filter-left-col">
            <Radio.Group onChange={onChange} value={isDeleted}>
              <Radio value={false}>Matched</Radio>
              <Radio value={true}>Deleted</Radio>
            </Radio.Group>
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

            <div className="load-btn">
              <Button onClick={getSportsid}> load</Button>
            </div>
          </div>
          <div className="filter-Right-col">
            <h5>
              Total Soda: <span style={{ color: "green" }}>{sada}</span> Total
              Amount:<span style={{ color: "green" }}>{totalAmount}</span>
            </h5>
          </div>
        </div>
        <div className="search-col-div">
          <div className="left-search-col">
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
          </div>
          <div className="middle-search-col">
            <Input
              placeholder="search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="right-search-col">
            <div className="search-bar-input">
              <Input
                placeholder="search here....."
                name="message"
                onChange={Search}
                value={searchData}
                style={{ width: "200px" }}
                autoComplete="off"
                // onFocus={() => setListDisplay(true)}
                // onBlur={() => setListDisplay(false)}
              />
              <div
                // className={listDisplay ? "dropdown-list" : "dropdown-list2"}
                style={{
                  position: "absolute",
                  zIndex: "8",
                  background: "white",
                  top: "100%",
                  height: "200px",
                  overflow: "scroll",
                  width: "200px",
                  borderRadius: "4px",
                  display: searchDataList?.length > 0 ? "block" : "none",
                }}
              >
                {searchDataList?.map((res, index) => {
                  return (
                    <div
                      style={{
                        borderBottom: "1px solid #e1dbdb",
                      }}
                      key={res.id + res.text + index}
                    >
                      <p
                        onClick={() => setIdText(res.id, res.text)}
                        style={{ margin: "0", padding: "4px" }}
                      >
                        {res.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              style={{ background: "black", color: "white", border: "none" }}
              onClick={() => tabledata(searchData)}
            >
              Load
            </Button>
            <Button
              style={{
                color: "#212529",
                backgroundColor: "#eaecee",
                border: "1px solid #eff2f7",
              }}
              onClick={() => {
                tabledata("");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable currentBetTable"
          rowClassName={(record) => {
            return record?.isBack ? "blue" : "pink";
          }}
          pagination={{ pageSize: paginationData.noOfRecords }}
        />
        <div className="pagination">
          <ul className="pagination-rounded mb-0">
            <ul
              role="menubar"
              aria-disabled="false"
              aria-label="Pagination"
              className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"
            >
              <li
                role="presentation"
                aria-hidden="true"
                className="page-item disabled"
              >
                <span
                  role="menuitem"
                  aria-label="Go to first page"
                  aria-disabled="true"
                  style={{ cursor: "pointer" }}
                  onClick={ResetCounter}
                >
                  «
                </span>
              </li>
              <li
                role="presentation"
                aria-hidden="true"
                className="page-item disabled"
              >
                <span
                  role="menuitem"
                  aria-label="Go to previous page"
                  aria-disabled="true"
                  style={{ cursor: "pointer" }}
                  onClick={Decrement}
                >
                  ‹
                </span>
              </li>
              <li role="presentation" className="page-item active">
                <button
                  role="menuitemradio"
                  type="button"
                  aria-label="Go to page 1"
                  aria-checked="true"
                  aria-posinset="1"
                  aria-setsize="1"
                  tabIndex="0"
                  className="page-link"
                >
                  {paginationData.index + 1}
                </button>
              </li>
              <li
                role="presentation"
                aria-hidden="true"
                className="page-item disabled"
              >
                <span
                  role="menuitem"
                  aria-label="Go to next page"
                  aria-disabled="true"
                  style={{ cursor: "pointer" }}
                  onClick={Increment}
                >
                  ›
                </span>
              </li>
              <li
                role="presentation"
                aria-hidden="true"
                className="page-item disabled"
              >
                <span
                  role="menuitem"
                  aria-label="Go to last page"
                  aria-disabled="true"
                  onClick={LastCounter}
                  style={{ cursor: "pointer" }}
                >
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

export default Casinotable;
