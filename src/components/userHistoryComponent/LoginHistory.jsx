/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Table, DatePicker, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Search_Api } from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import dayjs from "dayjs";
import { AiFillEye } from "react-icons/ai";
///styles
import "./styles.scss";
import moment from "moment";
const LoginHistory = ({ url }) => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { RangePicker } = DatePicker;
  const [DataList, setDataList] = useState([]);
  const [selectValue] = useState(1);
  const [dateTo, setDateTo] = useState(dayjs());
  const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, "day"));
  ////edit profile State
  const [setSortedInfo] = useState({});
  const [searchData, setSearchData] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);
  const [id, setId] = useState("");
  const handleChangeTable = (sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const reset = () => {
    setSearchData("");
    setMessage("");
    setDateFrom(dayjs().subtract(7, "day"));
    setDateTo(dayjs());
    tabledata({
      // index: paginationData.index,
      // noOfRecords: paginationData.noOfRecords,
      fromDate: dayjs().subtract(7, "day").toISOString().split("T")[0],
      toDate: dayjs().toISOString().split("T")[0],
      userId: "",
      type: selectValue,
    });
  };

  const handleChange2 = (event) => {
    setSearchText(event.target.value);
    // console.log(event);
  };
  // const handleChangeSelect = (value) => {
  //   setSelectValue(value);
  // };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
    tabledata();
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates?.length) {
      //   console.log("From: ", dates[0], ", to: ", dates[1]);
      setDateTo(dates[1]);
      setDateFrom(dates[0]);
    } else {
      // console.log("Clear");
    }
  };

  //////deposit Modal

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
        setSearchDataList([]);

        // console.log(res.data.data);
        setSearchDataList(res.data.data);
      })
      .catch((error) => {
        setSearchDataList([]);
        // console.log(error);
      });
  };
  const tabledata = async (DateFrom) => {
    setLoading((prev) => ({ ...prev, accountStatement: true }));
    // console.log(dateTo, dateTo.toISOString());
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${url}`,
        {
          // index: paginationData.index,
          // noOfRecords: paginationData.noOfRecords,
          fromDate: moment(dateFrom.toString()).format("YYYY-MM-DD"),
          toDate: moment(dateTo.toString()).format("YYYY-MM-DD"),
          userId: id,
          // type: selectValue,
          ...DateFrom,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // setDateFrom(dayjs());
        // setDateTo(dayjs());
        // console.log(res.data.data, "data");
        if (res?.data?.data) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data);
        } else {
          setDataList();
        }
      })
      .catch((erro) => {
        // console.log(erro, "eror");
        // antdmessage.error(erro.response.data.message);
        // if (erro.response.status === 401) {
        //   setLoading((prev) => ({ ...prev, accountStatement: false }));
        //   navigate("/");
        //   localStorage.removeItem("token");
        //   antdmessage.error(erro.response?.data.message);
        // }
      });
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
      title: "User Name",
      dataIndex: "username",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.username).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Date).toLowerCase().includes(value.toLowerCase()) ||
          String(record.IP).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Detail).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Date",
      dataIndex: "Date",
    },

    {
      title: "IP",
      dataIndex: "IP",
    },
    {
      title: "Detail",
      dataIndex: "Detail",
    },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.date + res.userid + res.lastLogin + index,
      Date: res?.lastLogin || res?.createdOn,
      IP: res?.ip || res?.ipAddress,
      username: res?.userid || res?.userId,
      Detail: (
        <Tooltip title={res?.deviceInfo} trigger={["hover"]}>
          <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
        </Tooltip>
      ),
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
  // const option = [
  //   {
  //     value: 1,
  //     label: "ALL",
  //   },
  //   {
  //     value: 3,
  //     label: "Deposit/Withdraw Report",
  //   },
  //   {
  //     value: 2,
  //     label: "Game Report",
  //   },
  // ];

  // const items = [
  //   {
  //     key: "1",
  //     label: "one",
  //   },
  //   {
  //     key: "2",
  //     label: "two",
  //   },
  //   {
  //     key: "3",
  //     label: "three",
  //   },
  //   {
  //     key: "4",
  //     label: "three",
  //   },
  //   {
  //     key: "5",
  //     label: "three",
  //   },
  //   {
  //     key: "6",
  //     label: "three",
  //   },
  // ];
  const [listDisplay, setListDisplay] = useState(false);
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
  };
  return (
    <>
      <div className="table-user-history" style={{ width: "98%" }}>
        <div className="search-input-user-history Account-list-search">
          <div className="left-col">
            <div className="search-input-account-statement">
              <div className="search-input-account-div">
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
          </div>
          <div className="account-serch-btn-user-history">
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
              <option value="500">500</option><option value="1000">1000</option><option value="2000">2000</option>
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
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable"
          onChange={handleChangeTable}
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

export default LoginHistory;
