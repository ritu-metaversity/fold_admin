import {
  Button,
  Input,
  Table,
  Tooltip,
  Radio,
  Checkbox,
  Dropdown,
  Select,
} from "antd";

import React, { createContext, useEffect, useState } from "react";

import { AiFillEye } from "react-icons/ai";
///styles
// import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { Table_ActiveUser, Tab_CurrentBet } from "../../../../routes/Routes";
import { useMediaQuery } from "../../modalForm/UseMedia";
import { TabBet_History } from "../../../routes/Routes";
import { click } from "@testing-library/user-event/dist/click";

export const UserModalContext = createContext({
  handleCancel: () => {},
});

const BetHistorytable = () => {
  const isMobile = useMediaQuery("(min-width: 768px)");

  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [DataList, setDataList] = useState([]);
  const [userId, setUserId] = useState("");
  const [radioValue, setRadioValue] = useState("matched");
  const [totalAmount, setTotalAmount] = useState("");
  const [sada, setsada] = useState("");
  const [sportsKey, setSportsKey] = useState("");
  const [sportsId, setSportsId] = useState([]);

  ////get Sports Key
  const [valueDropDown, setvalueDropDown] = useState("");
  const [sendSportId, setSendSportId] = useState("");
  //get Sports List
  const [sportChangeId, setSportChangeId] = useState("");
  const [sendEventId, setSendEventId] = useState("");
  const [sportsList, setSportsList] = useState([]);
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  const navigate = useNavigate();

  //////deposit Modal

  //////withdrawal Modal

  ///show profile modal

  const tabledata = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${TabBet_History}`,
        {
          index: paginationData?.index,
          noOfRecords: paginationData?.noOfRecords,
          sportId: sendSportId,
          matchId: sendEventId,
          userId: "",
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
          navigate("/");
        }
      })
      .catch((error) => {
        if (error?.message == "Request failed with status code 401") {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    tabledata();
  }, [
    sendSportId,
    sendEventId,
    paginationData?.index,
    paginationData?.noOfRecords,
  ]);

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
        return String(record?.EventName)
          .toLowerCase()
          .includes(value.toLowerCase());
      },

      sorter: {
        compare: (a, b) => a.CR - b.CR,
        multiple: 3,
      },
    },
    {
      title: "User Name",
      dataIndex: "UserName",
      sorter: {
        compare: (a, b) => a.PTS - b.PTS,
        multiple: 2,
      },
    },
    {
      title: "M Name",
      dataIndex: "MName",
      sorter: {
        compare: (a, b) => a.Client - b.Client,
        multiple: 1,
      },
    },
    {
      title: "Nation",
      dataIndex: "Nation",
      sorter: {
        compare: (a, b) => a.Clientp - b.Clientp,
        multiple: 1,
      },
    },
    {
      title: "U Rate",
      dataIndex: "URate",
      sorter: {
        compare: (a, b) => a.Exposer - b.Exposer,
        multiple: 1,
      },
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: {
        compare: (a, b) => a.Available - b.Available,
        multiple: 1,
      },
    },
    {
      title: "Place Date",
      dataIndex: "PlaceDate",
      sorter: {
        compare: (a, b) => a.bst - b.bst,
        multiple: 1,
      },
    },
    {
      title: "Detail",
      dataIndex: "Detail",
      sorter: {
        compare: (a, b) => a.ust - b.ust,
        multiple: 1,
      },
    },
  ];

  const data = [];
  DataList?.map((res, index) => {
    data.push({
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
    });
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
        .post("http://api.a2zscore.com/admin-new-apis/sport/active-sport-list")
        .then((res) => {
          setSportsList(res?.data?.data);
        });
    };
    getSpotsList();
  }, []);

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
    await axios
      .post(
        "http://api.a2zscore.com/admin-new-apis/sport/event-detail-sport-wise",
        { sportId: id },
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
      });
  };

  /////call api on load button
  const getSportsid = () => {
    setSendSportId(valueDropDown);
    setSendEventId(sportChangeId);
  };
  const option1 = sportsList?.map((item, index) => ({
    key: item.sportId + item?.sportName + index,
    value: item?.sportId,
    label: item?.sportName,
  }));

  const option2 = sportsId?.map((item, index) => ({
    key: item.eventId + item?.eventName + index,
    value: item?.eventId,
    label: item?.eventName,
  }));
  return (
    <>
      <div className="table" style={{ width: "100%" }}>
        <div className="current-bets-filter">
          <div className="filter-left-col">
            <Radio
              checked={radioValue === "matched"}
              onChange={() => setRadioValue("matched")}
            >
              Matched
            </Radio>
            <Radio
              checked={radioValue === "Deleted"}
              onChange={() => setRadioValue("Deleted")}
            >
              Deleted
            </Radio>
          </div>
          <div className="filter-Middle-col">
            <Select
              labelInValue
              defaultValue={{
                value: "",
                label: "Select match",
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
                label: "Matchlist",
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
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={paginationData?.noOfRecords}
              onChange={(e) =>
                setPaginationData({
                  ...paginationData,
                  noOfRecords: Number(e.target.value),
                })
              }
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="750">750</option>
              <option value="1000">1000</option>
            </select>
            &nbsp;entries
          </label>
          <div className="input-search" style={{ paddingRight: "10px" }}>
            <Input
              placeholder="search here....."
              name="message"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable currentBetTable"
          rowClassName={(record) => {
            return record?.isBack ? "blue" : "pink";
          }}
          loading={loading}
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

export default BetHistorytable;
