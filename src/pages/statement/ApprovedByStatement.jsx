/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Table, DatePicker, Select, Image } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Statement, StatementPage } from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import dayjs from "dayjs";
///styles

const ApprovedByStatement = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { RangePicker } = DatePicker;
  const [DataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState(false);
  const [dateTo, setDateTo] = useState(dayjs());
  const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, "day"));
  ////edit profile State
  // const [sortedInfo, setSortedInfo] = useState({});
  const [searchData, setSearchData] = useState("");
  const [searchDataList, setSearchDataList] = useState([]);
  const [id, setId] = useState("");

  const [statusSelect, setStatusSelect] = useState(2);
  // const handleChangeTable = (sorter) => {
  //   setSortedInfo(sorter);
  // };

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });
  const reset = () => {
    setSearchData("");
    setMessage("");
    setSelectValue(false);
    setDateFrom(dayjs().subtract(7, "day"));
    setDateTo(dayjs());
    tabledata({
      index: paginationData.index,
      isWithdraw: false,
      noOfRecords: paginationData.noOfRecords,
      fromDate: dayjs().subtract(7, "day").format("YYYY-MM-DD hh:mm:ss"),
      toDate: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      userId: "",
      type: "1",
      status: 2,
    });
  };

  const handleChange2 = (event) => {
    setSearchText(event.target.value);
    // console.log(event);
  };
  const handleChangeSelect = (value) => {
    setSelectValue(value);
  };
  const handleChangeSelectStatus = (value) => {
    setStatusSelect(value);
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
        // "http://192.168.68.101/user/test3",
        `${process.env.REACT_APP_BASE_URL}/user/subadmin-poweruser-list`,
        { userId: value },
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
        // "http://192.168.68.105/user/get-pw-sat-statement",
        `${process.env.REACT_APP_BASE_URL}/${Statement}`,
        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          fromDate: moment(dateFrom.toString()).format("YYYY-MM-DD hh:mm:ss"),
          toDate: moment(dateTo.toString()).format("YYYY-MM-DD hh:mm:ss"),
          userId: id,
          isWithdraw: selectValue,
          status: statusSelect,
          ...DateFrom,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data?.statement) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data?.statement);
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
      title: "User Id",
      dataIndex: "userid",
      //   sorter: (a, b) => a.SrNo - b.SrNo,
      //   sortOrder: sortedInfo.field === "SrNo" ? sortedInfo.order : null,
    },
    {
      title: "Approved Time",
      dataIndex: "approved_time",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.userid).toLowerCase().includes(value.toLowerCase()) ||
          String(record.approvedby)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Remark).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Approved By",
      dataIndex: "approvedby",
      //   sorter: (a, b) => a.SrNo - b.SrNo,
      //   sortOrder: sortedInfo.field === "SrNo" ? sortedInfo.order : null,
    },

    {
      title: "Requested Time",
      dataIndex: "requestedtime",
      //   sorter: {
      //     compare: (a, b) => a.Credit - b.Credit,
      //     sortOrder: sortedInfo.field === "Credit" ? sortedInfo.order : null,
      //   },
    },
    {
      title: "Request Status",
      dataIndex: "request_status",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Remark",
      dataIndex: "Remark",
    },
    {
      title: "Deposit Image",
      dataIndex: "deposit_image",
    },
    // {
    //   title: "Deposit Type",
    //   dataIndex: "deposit_type",
    // },
  ];
  const status = {
    2: "APPROVED",
    1: "PENDING",
    3: "REJECT",
  };
  const colorStatus = {
    2: "#00864e",
    1: "white",
    3: "white",
  };
  const bgcolorStatus = {
    2: "#ccf6e4",
    1: "orange",
    3: "#DC3545",
  };
  const data = DataList?.map((res, index) => {
    return {
      key: res?.date + res.credit + res.pts + index,
      Date: res?.date,
      userid: res.userid,
      request_status: (
        <Button
          style={{
            fontWeight: 600,
            background: bgcolorStatus[res.request_status],
            border: "none",

            color: colorStatus[res.request_status],
          }}
        >
          {status[res.request_status]}
        </Button>
      ),
      approvedby: res.approvedby,
      approved_time: res.approved_time,
      requestedtime: res.requestedtime,
      amount: res?.amount,
      Remark: res?.remark,
      deposit_image: (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
          src={`https://admin-api-banners-new.s3.ap-south-1.amazonaws.com/${res.deposit_image}`}
        />
      ),
      // deposit_type: res?.deposit_type,
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
  const option = [
    // {
    //   value: "",
    //   label: "ALL",
    // },
    {
      value: false,
      label: "Deposit",
    },
    {
      value: true,
      label: "Withdraw",
    },
  ];
  const statusOption = [
    {
      value: 2,
      label: "SUCCESS",
    },
    {
      value: 1,
      label: "PENDING",
    },
    {
      value: 3,
      label: "REJECT",
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

  return (
    <>
      <div className="hading-create-accounts">
        <h4>HELPER Statement</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={StatementPage} style={{ color: "#74788d" }}>
            HELPER Statement
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
                        <p onClick={() => setIdText(res.userId, res.userId)}>
                          {res.userId}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="date-search date-search1">
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
                showTime={{ format: "hh:mm:ss" }}
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
                defaultValue="Deposit"
                style={{
                  width: 120,
                  margin: "7px 0px 7px 0px",
                }}
                onChange={handleChangeSelect}
                options={option}
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
                Status
              </label>
              <Select
                defaultValue="Success"
                style={{
                  width: 120,
                  margin: "7px 0px 7px 0px",
                }}
                onChange={handleChangeSelectStatus}
                options={statusOption}
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
          //   onRow={(record) => {
          //     return {
          //       onClick: (event) => {
          //         if (record.marketid) {
          //           setRemark(record?.Remark);
          //           showModal(record.marketid);
          //         }
          //         return;
          //       }, // click row
          //     };
          //   }
          // }
          dataSource={data}
          className="accountTable"
          // onChange={handleChangeTable}
          pagination={{ pageSize: paginationData.noOfRecords }}
          summary={(pageData) => {
            let totalRepayment = 0;

            pageData.forEach(({ amount }) => {
              totalRepayment += amount;
            });
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <div
                      style={{ color: totalRepayment > 0 ? "green" : "red" }}
                    >
                      {totalRepayment.toFixed(1)}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
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

export default ApprovedByStatement;
