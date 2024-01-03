/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Table, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// import DownloadReport from "../../components/downloadReport/DownloadReport";
import {
  Account_Statement,
  Account_Statement_Api,
  Search_Api,
} from "../../routes/Routes";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import dayjs from "dayjs";
///styles
import "./styles.scss";
import BetListModal from "../../components/modal/betListModal";
import DownloadReport from "../../components/downloadReport/DownloadReport";
const AccountStatement = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { RangePicker } = DatePicker;
  const [DataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState(1);
  const [dateTo, setDateTo] = useState(dayjs());
  const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, "day"));
  ////edit profile State
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchData, setSearchData] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ptsId, setPtsId] = useState("");
  const [remark, setRemark] = useState("");

  const handleChangeTable = (sorter) => {
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
    setSelectValue("1");
    setDateFrom(dayjs().subtract(7, "day"));
    setDateTo(dayjs());
    tabledata({
      index: paginationData.index,
      noOfRecords: paginationData.noOfRecords,
      fromDate: dayjs().subtract(7, "day").toISOString().split("T")[0],
      toDate: dayjs().toISOString().split("T")[0],
      userid: "",
      type: "1",
    });
  };

  const handleChange2 = (event) => {
    setSearchText(event.target.value);
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
    if (dates?.length) {
      setDateTo(dates[1]);
      setDateFrom(dates[0]);
    } else {
    }
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
        `${process.env.REACT_APP_BASE_URL}/${Account_Statement_Api}`,
        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          fromDate: moment(dateFrom.toString()).format("YYYY-MM-DD"),
          toDate: moment(dateTo.toString()).format("YYYY-MM-DD"),
          userid: searchData,
          type: selectValue,
          ...DateFrom,
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
      title: "Sr.No",
      dataIndex: "srNo",
      // sorter: (a, b) => a.SrNo - b.SrNo,
      // sortOrder: sortedInfo.field === "SrNo" ? sortedInfo.order : null,
    },
    {
      title: "date",
      dataIndex: "date",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.Date).toLowerCase().includes(value.toLowerCase()) ||
          String(record.SrNo).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Credit).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Debit).toLowerCase().includes(value.toLowerCase()) ||
          String(record.pts)
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          String(record.Remark).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Fromto).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      defaultSortOrder: "descend",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}</span>
      ),
      // sorter: (a, b) => a.Credit - b.Credit,
      // sorter: {
      //   compare: (a, b) => a. - b.Credit,
      //   // sortOrder: sortedInfo.field === "Credit" ? sortedInfo.order : null,
      // },
    },
    {
      title: "Debit",
      dataIndex: "debit",
      render: (text) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>{text}</span>
      ),
      // sorter: {
      //   compare: (a, b) => a.ust - b.ust,
      //   multiple: 1,
      // },
    },
    {
      title: "Pts",
      dataIndex: "pts",
      render: (text) => <span style={{ cursor: "pointer" }}>{text}</span>,
      // sorter: {
      //   compare: (a, b) => a.PPhone - b.PPhone,
      //   multiple: 1,
      // },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      // sorter: {
      //   compare: (a, b) => a.AccountType - b.AccountType,
      //   multiple: 1,
      // },
    },
    {
      title: "From To",
      dataIndex: "fromto",
      // sorter: {
      //   compare: (a, b) => a.Action - b.Action,
      //   multiple: 1,
      // },
    },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.date + res.credit + res.pts + index,
      date: res?.date,
      srNo: res.sno,
      credit: res.credit,
      debit: res.debit,
      pts: res?.pts,
      remark: res?.remark,
      fromto: res.fromto,
      marketid: res?.marketid,
    };
  });
  const reportDownloadHeader = [
    "Sr No",
    "Date",
    "Credit",
    "Debit",
    "Pts",
    "Remark",
    "Fromto",
  ];
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
      value: 1,
      label: "ALL",
    },
    {
      value: 3,
      label: "Deposit/Withdraw Report",
    },
    {
      value: 2,
      label: "Game Report",
    },
  ];

  const [listDisplay, setListDisplay] = useState(false);
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
  };
  const showModal = (id) => {
    setIsModalOpen(true);
    setPtsId(id);
  };
  const dataRsport = {
    reportColumnName: [
      "Sr.No",
      "date",
      "Credit",
      "Debit",
      "Pts",
      "Remark",
      "From To",
    ],
    reportType: "AccountStatement",
    startDate: moment(dateFrom.toString()).format("YYYY-MM-DD"),
    endDate: dayjs().toISOString().split("T")[0],
    userId: searchData,
    type: selectValue,
  };
  return (
    <UserModalContext.Provider value={{}}>
      <BetListModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        ptsId={ptsId}
        remark={remark}
        search={searchData}
      />
      <div className="hading-create-accounts">
        <h4>Account Statement</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Account_Statement} style={{ color: "#74788d" }}>
            Account Statement
          </NavLink>
        </p>
      </div>
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
          dataReport={dataRsport}
          // header={reportDownloadHeader}
          reportType="AccountStatement"
          reportFile={"AccountStatement"}
        />
        <Table
          columns={columns}
          onRow={(record) => {
            return {
              onClick: (event) => {
                if (record.marketid) {
                  setRemark(record?.Remark);
                  showModal(record.marketid);
                }
                return;
              }, // click row
            };
          }}
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
    </UserModalContext.Provider>
  );
};

export default AccountStatement;
