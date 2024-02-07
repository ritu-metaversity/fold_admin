/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Modal, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
///styles
import "./styles.scss";
import { NavLink } from "react-router-dom";

import axios from "axios";
import {
  Bank_deposit_amount,
  Search_Api,
  Table_ActiveUser,
} from "../../routes/Routes";
import { BsArrowRightShort } from "react-icons/bs";
import { LoaderContext } from "../../App";
import { notifyToast } from "../../components/toast/Tost";
import ExposureModal from "../../components/exposureModal";

const Bank = () => {
  const [searchText, setSearchText] = useState("");
  const [Inputvalue, setInputvalue] = useState("");

  const [error, setError] = useState({});
  const { setLoading } = useContext(LoaderContext);
  const [DataList, setDataList] = useState([]);
  const [transactionCode, setTransactionCode] = useState("");
  const [errorTransaction, seterrorTransaction] = useState(false);
  const [listDisplay, setListDisplay] = useState(false);
  const [searchDataList, setSearchDataList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [id, setId] = useState("");
  ////edit profile State

  const [value, setvalue] = useState({});

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const reset = () => {
    setSearchText("");
    setInputvalue("");
    setSearchData("");
    setId("");
    tabledata("");
  };
  const handleChange = (event) => {
    setInputvalue(event.target.value);
    // console.log(event);
  };
  const handleClick = () => {
    setSearchText(Inputvalue);
    tabledata();
  };

  //////deposit Modal

  const tabledata = async (arg) => {
    setLoading((prev) => ({ ...prev, BankTable: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Table_ActiveUser}`,
        {
          id: arg !== undefined ? arg : id,
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
        // console.log(error);
        // if (error.response.status === 401) {
        //   setLoading((prev) => ({ ...prev, BankTable: false }));
        //   navigate("/");
        // }
      });
    setLoading((prev) => ({ ...prev, BankTable: false }));
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        BankTable: false,
        submitBankData: false,
      }));
    };
  }, [setLoading]);
  const submit = async (obj) => {
    if (!transactionCode) {
      setError({ ...error, [obj]: true });
      seterrorTransaction(true);
    } else if (value[obj]) {
      const currentVaue = value[obj];

      setError({ ...error, [obj]: false });
      setvalue({ ...value, [obj]: "" });
      setLoading((prev) => ({ ...prev, submitBankData: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Bank_deposit_amount}`,
          {
            userid: obj,
            amount: currentVaue,
            lupassword: transactionCode,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);

          notifyToast().succes(res.data.message);
          setError({});
          setTransactionCode("");
          tabledata();
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, submitBankData: false }));
    } else {
      setError({ ...error, [obj]: true });
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        submitBankData: false,
      }));
    };
  }, [setLoading]);
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
      title: "Client (P/L)%",
      dataIndex: "ClientPercentage",
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
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res.chips + res.pts + res.availabePts + index,
      username: <p style={{ textTransform: "uppercase" }}>{res?.username}</p>,
      CR: res?.chips,
      PTS: <p style={{ color: res?.pts >= 0 ? "green" : "red" }}>{res?.pts}</p>,
      Client: (
        <p style={{ color: res?.clientPl >= 0 ? "green" : "red" }}>
          {res?.clientPl}
        </p>
      ),
      ClientPercentage: (
        <p style={{ color: res?.clientPlPercentage >= 0 ? "green" : "red" }}>
          {res?.clientPlPercentage}
        </p>
      ),
      Exposer: (
        <span
          onClick={() => exposureShowModal(res?.userId)}
          style={{ cursor: "pointer" }}
        >
          {res?.exposure}
        </span>
      ),
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
                [res.userId]: res.clientPl,
              })
            }
          >
            All
            <BsArrowRightShort />
          </p>
          <input
            type="number"
            style={{
              height: "18px",
              width: "90px",
              padding: " 0.25rem 0.5rem",
              borderRadius: "5px",
              border: error[res.userId] ? "1px solid red" : "1px solid #ced4da",
            }}
            onChange={(e) =>
              setvalue({ ...value, [res.userId]: e.target.value })
            }
            value={value[res.userId] || ""}
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
  const onchangeTransactionCode = (e) => {
    const value = e.target.value;

    if (value) {
      seterrorTransaction(false);
    } else {
      seterrorTransaction(true);
    }
    setTransactionCode(value);
    // console.log(value);
  };
  const setIdText = (id, text) => {
    // console.log(id, text, "dtat");
    setSearchData(text);
    setId(id);
    setListDisplay(false);
    setSearchDataList([]);
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
        setSearchDataList([]);

        // console.log(res.data.data);
        setSearchDataList(res.data.data);
      })
      .catch((error) => {
        setSearchDataList([]);
        // console.log(error);
      });
  };
  const [exposerUserId, setExposerUserId] = useState("");
  const [exposureIsModal, setExposureIsModal] = useState(false);

  const exposureShowModal = (id) => {
    setExposerUserId(id);
    setExposureIsModal(true);
  };
  const handleCancel = () => {
    setExposureIsModal(false);
  };
  return (
    <>
      <>
        <Modal
          title="Exposure"
          open={exposureIsModal}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
          className="exposure-modal"
        >
          <ExposureModal userID={exposerUserId} />
        </Modal>
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
          <div className="search-header">
            <div className="search-left-col">
              <div className="input-col">
                <Input
                  placeholder="search here....."
                  name="message"
                  onChange={Search}
                  value={searchData}
                  autoComplete="off"
                  onFocus={() => setListDisplay(true)}
                  // onBlur={() => setListDisplay(false)}
                  style={{ margin: "7px 0px 7px 0px" }}
                />
                <div className={listDisplay ? "dropdownList" : "dropdownList2"}>
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
              <Button
                onClick={handleClick}
                style={{ background: "#eff2f7", color: "black" }}
              >
                Search
              </Button>
              <Button
                onClick={reset}
                style={{ background: "#23292E", color: "white" }}
              >
                Reset
              </Button>
            </div>
            <div className="search-right-col">
              <input
                type="password"
                placeholder="Transaction Code"
                value={transactionCode}
                onChange={onchangeTransactionCode}
                style={{
                  height: "32px",
                  borderRadius: "5px",
                  outline: "none",
                  border: errorTransaction
                    ? "1px solid red"
                    : "1px solid #ced4da",
                }}
              />
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
                <option value="100">100</option>
                <option value="250">250</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
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
    </>
  );
};

export default Bank;

// const data = [];

//
