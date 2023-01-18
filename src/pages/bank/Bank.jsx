import { Button, Input, Table, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
// import { AiOutlinePlus } from "react-icons/ai";
///styles
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Table_ActiveUser } from "../../routes/Routes";
import { BsArrowRightShort } from "react-icons/bs";
import { UserModalContext } from "../activeUser/ActiveUser";

const Bank = () => {
  const [searchText, setSearchText] = useState("");
  const [Inputvalue, setInputvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [DataList, setDataList] = useState([]);

  ////edit profile State

  const [value, setvalue] = useState({});

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  const reset = () => {
    setSearchText("");
    setInputvalue("");
  };
  const handleChange = (event) => {
    setInputvalue(event.target.value);
    // console.log(event);
  };
  const handleClick = () => {
    setSearchText(Inputvalue);
  };

  const navigate = useNavigate();

  //////deposit Modal

  const tabledata = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Table_ActiveUser}`,
        {
          id: "",
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("api", res.data.data.dataList);
        if (res.data.data.dataList) {
          setLoading(false);
          setPaginationData({
            ...paginationData,
            totalPages: res.data.data?.totalPages || 1,
          });
          setDataList(res.data.data.dataList);
        } else {
          setDataList();
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 401") {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  const submit = async (obj) => {
    setLoading(true);
    if (value[obj]) {
      const currentVaue = value[obj];

      setError({ ...error, [obj]: false });
      setvalue({ ...value, [obj]: "" });

      await axios
        .post(
          "http://api.a2zscore.com/admin-new-apis/dwc/bank-deposit-withdraw",
          {
            userid: obj,
            amount: currentVaue,
            lupassword: localStorage.getItem("pass"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          message.success(res.data.message);
          setLoading(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          setLoading(false);
        });
      setLoading(false);
    } else {
      setError({ ...error, [obj]: true });
      console.log("undefine");
    }
  };
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.username)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "CR",
      dataIndex: "CR",
    },
    {
      title: "PTS",
      dataIndex: "PTS",
    },
    {
      title: "Client (P/L)",
      dataIndex: "Client",
    },

    {
      title: "Exposur",
      dataIndex: "Exposer",
    },
    {
      title: "Available pts",
      dataIndex: "Available",
    },

    {
      title: "Account Type",
      dataIndex: "AccountType",
    },
    {
      title: "Action",
      dataIndex: "Action",
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
  ];

  const data = [];
  DataList.map((res) => {
    if (res) {
      data.push({
        // key: "1",
        username: res.username,
        CR: res.chips,
        PTS: res.pts,
        Client: res.clientPlPercentage,
        Exposer: res.exposure,
        Available: res.availabePts,
        AccountType: res.accountType,

        Action: (
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <p
              style={{
                fontSize: "12px",
                color: "#128412",
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
              }}
              onClick={() =>
                setvalue({
                  ...value,
                  [res.userId]: -Number(res.clientPlPercentage),
                })
              }
            >
              All
              <BsArrowRightShort />
            </p>
            <input
              style={{
                height: "18px",
                width: "90px",
                padding: " 0.25rem 0.5rem",
                border: "1px solid #ced4da",
                borderRadius: "5px",
                border: error[res.userId]
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
              onChange={(e) =>
                setvalue({ ...value, [res.userId]: e.target.value })
              }
              value={value[res.userId]}
            />
            <Button
              style={{
                padding: "0.25rem 0.5rem",
                background: "#50a5f1",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                submit(res.userId);
              }}
            >
              Submit
            </Button>
          </span>
        ),
      });
    } else {
      data.push({
        key: "",
        username: "",
        CR: "",
        PTS: "",
        Client: "",
        Clientp: "",
        Exposer: "",
        Available: "",
        bst: "",
        ust: "",
        PPhone: "",
        AccountType: "",
        Action: "",
      });
    }
  });

  const onChange = (filters, sorter, extra) => {
    console.log(filters, sorter, extra);
  };

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

  return (
    <UserModalContext.Provider>
      <Mainlayout>
        {loading ? (
          <Spin style={{ width: "100%", margin: "auto" }} />
        ) : (
          <>
            <div className="heading">
              <h4 style={{ fontSize: "15px!important" }}>Bank</h4>
            </div>
            <div className="table">
              <div className="search">
                <div className="left-col">
                  <Input
                    placeholder="search here....."
                    name="message"
                    onChange={handleChange}
                    value={Inputvalue}
                  />
                  <div className="serch-btn">
                    <Button
                      onClick={reset}
                      style={{ background: "#23292E", color: "white" }}
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleClick}
                      style={{ background: "#eff2f7", color: "black" }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
                <div className="right-col">
                  <input
                    placeholder="Transaction Code"
                    style={{
                      height: "32px",
                      borderRadius: "5px",
                      outline: "none",
                      border: "1px solid #ced4da",
                    }}
                  />
                  <Button style={{ background: "black", color: "white" }}>
                    <Link to="">Transfer All</Link>
                  </Button>
                </div>
              </div>

              <div style={{ paddingLeft: "5px" }}>
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
                    <option value="2">2</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    <option value="750">750</option>
                    <option value="1000">1000</option>
                  </select>
                  &nbsp;entries
                </label>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                className="accountTable"
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
        )}
      </Mainlayout>
    </UserModalContext.Provider>
  );
};

export default Bank;

// const data = [];

//
