import {
  Button,
  Input,
  Switch,
  Table,
  Modal,
  Tooltip,
  DatePicker,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { AiOutlinePlus } from "react-icons/ai";

import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { Account_List, Account_Statement_Api } from "../../routes/Routes";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import dayjs from "dayjs";
///styles
import "./styles.scss";
const AccountStatement = () => {
  const dateFormat = "YYYY-MM-DD";
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);
  const { RangePicker } = DatePicker;
  const [DataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState(1);
  const [dateTo, setDateTo] = useState("00:00:0000");
  const [dateFrom, setDateFrom] = useState("00:00:0000");

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });
  const reset = () => {
    setSearchText("");
    setMessage("");
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
    // console.log(event);
  };
  const handleChangeSelect = (value) => {
    setSelectValue(value);
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
    tabledata();
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      //   console.log("From: ", dates[0], ", to: ", dates[1]);
      setDateTo(dateStrings[0]);
      setDateFrom(dateStrings[1]);

      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };
  const navigate = useNavigate();

  //////deposit Modal

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, accountStatement: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Account_Statement_Api}`,
        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          toDate: dateTo,
          fromDate: dateFrom,
          userid: message,
          type: selectValue,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data?.dataList) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data?.dataList);
        } else {
          setDataList();
        }
      })
      .catch((erro) => {
        message.error(erro.response.data.message);
        if (erro.response.status === 401) {
          setLoading((prev) => ({ ...prev, accountStatement: false }));
          navigate("/");
          localStorage.removeItem("token");
          message.error(erro.response?.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, accountStatement: false }));
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.username)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Sr No",
      dataIndex: "SrNo",
      sorter: {
        compare: (a, b) => a.CR - b.CR,
        multiple: 3,
      },
    },

    {
      title: "Credit",
      dataIndex: "Credit",
      sorter: {
        compare: (a, b) => a.bst - b.bst,
        multiple: 1,
      },
    },
    {
      title: "Debit",
      dataIndex: "Debit",
      sorter: {
        compare: (a, b) => a.ust - b.ust,
        multiple: 1,
      },
    },
    {
      title: "pts",
      dataIndex: "pts",
      sorter: {
        compare: (a, b) => a.PPhone - b.PPhone,
        multiple: 1,
      },
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      sorter: {
        compare: (a, b) => a.AccountType - b.AccountType,
        multiple: 1,
      },
    },
    {
      title: "Fromto",
      dataIndex: "Fromto",
      sorter: {
        compare: (a, b) => a.Action - b.Action,
        multiple: 1,
      },
    },
  ];

  const data = [];
  DataList?.map((res, index) => {
    if (res) {
      data.push({
        key: res?.date + res.credit + res.pts + index,
        Date: res?.date,
        SrNo: res.sno,

        Credit: res.credit,
        Debit: res.debit,
        pts: res?.pts,
        Remark: res?.remark,
        Fromto: res.fromto,
      });
    }
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
  const option = [
    {
      value: 3,
      label: "Deposit/Withdraw Report",
    },
    {
      value: 2,
      label: "Game Report",
    },
  ];
  return (
    <UserModalContext.Provider value={{}}>
      <Mainlayout>
        <div className="hading-create-accounts">
          <h4>Account Statement</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            <NavLink to="/accountList" style={{ color: "#74788d" }}>
              Account Statement
            </NavLink>
          </p>
        </div>
        <div className="table" style={{ width: "98%", padding: "10px" }}>
          <div className="search Account-list-search">
            <div className="left-col">
              <div className="search-input-account-statement">
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
                  onChange={handleChange}
                  value={message}
                  style={{ margin: "7px 0px 7px 0px" }}
                />
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
                  onChange={onRangeChange}
                  defaultValue={[
                    dayjs("2015-06-06", dateFormat),
                    dayjs("2015-06-06", dateFormat),
                  ]}
                />
              </div>
              <div className="selct-account-statement">
                <label
                  style={{
                    color: "#495057",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Type
                </label>
                <Select
                  defaultValue="All"
                  style={{
                    width: 120,
                    margin: "7px 0px 7px 0px",
                  }}
                  onChange={handleChangeSelect}
                  options={option}
                />
              </div>
            </div>
          </div>
          <div className="account-serch-btn">
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
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="250">250</option>
                <option value="500">500</option>
              </select>
              &nbsp;entries
            </label>
            <div className="serch-input-account-statement">
              <input
                type="search"
                placeholder="search..."
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
      </Mainlayout>
    </UserModalContext.Provider>
  );
};

export default AccountStatement;
