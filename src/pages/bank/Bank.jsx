import { Button, Input, Table, message, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
// import { AiOutlinePlus } from "react-icons/ai";
///styles
import "./styles.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { Bank_deposit_amount, Table_ActiveUser } from "../../routes/Routes";
import { BsArrowRightShort } from "react-icons/bs";
import { UserModalContext } from "../activeUser/ActiveUser";
import { LoaderContext } from "../../App";

const Bank = () => {
  const [searchText, setSearchText] = useState("");
  const [Inputvalue, setInputvalue] = useState("");

  const [error, setError] = useState({});
  const { loading, setLoading } = useContext(LoaderContext);
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
    setLoading((prev) => ({ ...prev, BankTable: true }));
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
        if (res.data.data?.dataList) {
          setPaginationData({
            ...paginationData,
            totalPages: res.data.data?.totalPages || 1,
          });
          setDataList(res.data.data?.dataList);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, BankTable: false }));
          navigate("/");
        }
      });
    setLoading((prev) => ({ ...prev, BankTable: false }));
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  useEffect(() => {
    return () => {
      console.log("Clean UP Bank");
      setLoading((prev) => ({ ...prev, BankTable: false }));
    };
  }, []);
  const submit = async (obj) => {
    if (value[obj]) {
      const currentVaue = value[obj];

      setError({ ...error, [obj]: false });
      setvalue({ ...value, [obj]: "" });
      setLoading((prev) => ({ ...prev, submitBankData: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Bank_deposit_amount}`,
          {
            userid: obj,
            amount: currentVaue,
            lupassword: "",
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
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
      setLoading((prev) => ({ ...prev, submitBankData: false }));
    } else {
      setError({ ...error, [obj]: true });
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
      width: 100,
      onCell: () => {
        return {
          style: {
            whiteSpace: "break-spaces",
            maxWidth: 100,
          },
        };
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
      title: "Exposure",
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
    // {
    //   title: "Status",
    //   dataIndex: "Status",
    // },
  ];

  const data = [];
  DataList?.map((res, index) => {
    data.push({
      key: res.chips + res.pts + res.availabePts + index,
      username: res?.username,
      CR: res?.chips,
      PTS: res?.pts,
      Client: res?.clientPlPercentage,
      Exposer: res?.exposure,
      Available: res?.availabePts,
      AccountType: res?.accountType,

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
              border: error[res.userId] ? "1px solid red" : "1px solid #ced4da",
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

  return (
    <>
      <Mainlayout>
        <>
          {/* <div className="heading">
            <h4 style={{ fontSize: "15px!important" }}>Bank</h4>
          </div> */}
          <div className="hading-create-accounts">
            <h4 style={{ fontSize: "15px!important" }}>Bank</h4>
            <p>
              <NavLink to="/marketAnalysis">Home / </NavLink>
              {/* <NavLink to="/activeUser">User / </NavLink> */}
              <NavLink to="/bank" style={{ color: "#74788d" }}>
                Bank
              </NavLink>
            </p>
          </div>
          <div className="table">
            <div className="search">
              <div className="left-col">
                <Input
                  placeholder="search here....."
                  name="message"
                  onChange={handleChange}
                  value={Inputvalue.message}
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
              {/* <div className="right-col">
                <input
                  type="password"
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
              </div> */}
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
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="250">250</option>
                  <option value="500">500</option>
                </select>
                &nbsp;entries
              </label>
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
        </>
      </Mainlayout>
    </>
  );
};

export default Bank;

// const data = [];

//
