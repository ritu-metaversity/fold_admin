/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Table, Tooltip, Radio, Button, Select } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
///styles
import "./styles.scss";

// import DepositForm from "../../components/modalForm/DepositForm";
// import MoreCard from "../../components/moreCard/MoreCard";
// import Widrawal from "../../components/modalForm/Widrawal";
// import CreditModal from "../../components/creditActivityModal/CreditModal";
import axios from "axios";

import { Search_Api, Tab_CurrentBet } from "../../../../routes/Routes";

import { LoaderContext } from "../../../../App";
import DownloadReport from "../../../downloadReport/DownloadReport";

export const UserModalContext = createContext({
  handleCancel: () => {},
});

const CurrentBetsTable = () => {
  const [searchText, setSearchText] = useState("");

  const { setLoading } = useContext(LoaderContext);

  const [DataList, setDataList] = useState([]);

  const [isDeleted, setIsDeleted] = useState(false);
  const [radioValuefilte, setRadioValuefilter] = useState("1");
  const [totalAmount, setTotalAmount] = useState("");
  const [sada, setsada] = useState("");

  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });

  //////deposit Modal

  //////withdrawal Modal

  ///show profile modal

  const tabledata = async (searchData) => {
    setSearchData(searchData);
    setLoading((prev) => ({ ...prev, currentBettabledata: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Tab_CurrentBet}`,
        {
          betType: radioValuefilte,
          noOfRecords: paginationData.noOfRecords,
          sportType: 1,
          isDeleted: false,
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
        setsada(res.data.data.totalBets);
        setTotalAmount(res.data.data.totalStake);

        if (res?.data?.data?.dataList) {
          setPaginationData({
            ...paginationData,
            totalPages: res.data.data?.totalPages || 1,
          });
          setDataList(res.data.data.dataList);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        // message.error(error.response?.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        //   message.error(error.response?.data.message);
        // }
      });
    setLoading((prev) => ({ ...prev, currentBettabledata: false }));
  };

  useEffect(() => {
    tabledata();
  }, [
    radioValuefilte,
    paginationData.index,
    paginationData.noOfRecords,
    isDeleted,
  ]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        currentBettabledata: false,
      }));
    };
  }, []);
  const columns = [
    {
      title: "Event Type",
      dataIndex: "eventType",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.EventType)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.EventName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.UserName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.MName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Nation)
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          String(record.URate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.PlaceDate).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      defaultSortOrder: "descend",

      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record.UserName.toLowerCase().includes(value.toLowerCase());
      // },
    },
    {
      title: "M Name",
      dataIndex: "mname",
    },
    {
      title: "Nation",
      dataIndex: "nation",
    },
    {
      title: "U Rate",
      dataIndex: "urate",
    },
    {
      title: "Price",
      dataIndex: "Price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Place Date",
      dataIndex: "placeDate",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      render: (text) => (
        <Tooltip title={text}>
          <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
        </Tooltip>
      ),
    },
  ];
  const reportDownloadHeader = [
    "Event Type",
    "Event Name",
    "User Name",
    "M Name",
    "Nation",
    "U Rate",
    "Amount",
    "Place Date",
    "Detail",
  ];
  const data = DataList?.map((res, index) => {
    return {
      key: res?.rate + res.time + index,
      isBack: res?.isback,
      eventType: res?.eventType,
      eventName: res?.eventNamem,
      userName: res?.username,
      mname: res?.marketname,
      nation: res?.nation,
      urate: res?.rate,
      Price: res?.price,
      amount: res?.amount,
      placeDate: res?.time,
      detail: res.deviceInfo,
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
  const [searchDataList, setSearchDataList] = useState([]);

  const [searchData, setSearchData] = useState("");

  const onChange = (e) => {
    setIsDeleted(e.target.value);
  };

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
        // console.log(res.data.data);
        setSearchDataList(res.data.data);
      })
      .catch((error) => {
        setSearchDataList([]);
        // console.log(error);
      });
  };
  const [id, setId] = useState("");
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
  };
  const pnlAmou = [
    { totalSoda: Number(sada).toFixed(3), totalAmount: totalAmount },
  ];
  const pnlHeader = ["Total Soda", "Total Amount"];
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
            <Radio
              checked={radioValuefilte === "1"}
              onClick={() => {
                setRadioValuefilter("1");
                // getTableData()
              }}
            >
              All
            </Radio>
            <Radio
              checked={radioValuefilte === "2"}
              onChange={() => setRadioValuefilter("2")}
            >
              Back
            </Radio>
            <Radio
              checked={radioValuefilte === "3"}
              onChange={() => setRadioValuefilter("3")}
            >
              Lay
            </Radio>
            {/* <div className="load-btn">
              <Button> load</Button>
            </div> */}
          </div>
          <div className="filter-Right-col">
            <h5>
              Total Soda: <span style={{ color: "green" }}>{sada}</span> Total
              Amount: <span style={{ color: "green" }}>{totalAmount}</span>
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
        <DownloadReport
          dataReport={data}
          header={reportDownloadHeader}
          reportType="CurrentBets"
          reportFile={"Current Sport Bets"}
          pnlHeader={pnlHeader}
          pnlAmount={pnlAmou}
        />
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable currentBetTable"
          rowClassName={(record) => {
            return record.isBack ? "blue" : "pink";
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

export default CurrentBetsTable;
