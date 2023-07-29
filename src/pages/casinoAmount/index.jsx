/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
///styles
import { NavLink } from "react-router-dom";

import axios from "axios";

import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Button, Input, Modal, Select, Table } from "antd";
import { Casion_amount, Multiple_login } from "../../routes/Routes";
import { columns } from "./colums";
import { notifyToast } from "../../components/toast/Tost";
// import { columns } from "./Colums";
// import AddurlList from "./AddurlList";
// import ViewUrlList from "./ViewUrlList";

const CasinoAmount = () => {
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const [inputValue, setInputValue] = useState([]);
  const [DataList, setDataList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  ///show profile modal

  const casinoAmount = async () => {
    setLoading((prev) => ({ ...prev, casinoAmount: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bet-modifier/get"}`,
        {
          userId: searchValue,
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
        if (res?.data?.data) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data);
          setInputValue(res?.data?.data?.map((item) => item.value));
        } else {
          setDataList([]);
          setInputValue([]);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, casinoAmount: false }));

    // setLoading(false);
  };

  useEffect(() => {
    casinoAmount();
  }, [paginationData.index, paginationData.noOfRecords, searchValue]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        accountTableData: false,
      }));
    };
  }, [setLoading]);

  //   const Increment = () => {
  //     if (paginationData.index < paginationData.totalPages) {
  //       setPaginationData({ ...paginationData, index: paginationData.index + 1 });
  //     }

  //     // setPageIndex(PageIndex + 1);
  //   };
  //   const Decrement = () => {
  //     if (paginationData.index > 0) {
  //       setPaginationData({ ...paginationData, index: paginationData.index - 1 });
  //     }
  //     // setPageIndex(PageIndex - 1);
  //   };
  //   const ResetCounter = () => {
  //     setPaginationData({ ...paginationData, index: 0 });
  //   };
  //   const LastCounter = () => {
  //     setPaginationData({
  //       ...paginationData,
  //       index: paginationData.totalPages - 1,
  //     });
  //   };

  const dataSource = DataList?.map((curElm, index) => {
    return {
      key: curElm.appid + curElm.userid + index,
      appid: curElm?.userid,
      userid: (
        <Input
          value={inputValue[index]}
          type="number"
          onChange={(e) =>
            setInputValue((o) => {
              const newO = { ...o };
              newO[index] = e.target.value;
              return newO;
            })
          }
          style={{ width: "200px" }}
        />
      ),
      action: (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Button
            style={{ background: "orange", color: "white", border: "none" }}
            onClick={() => {
              casinoAmountUpdate({ value: inputValue[index], id: curElm.id });
            }}
            disabled={
              inputValue[index] != curElm.value && inputValue[index] > 0
                ? false
                : true
            }
          >
            Update
          </Button>
        </div>
      ),
    };
  });

  const casinoAmountUpdate = async (value) => {
    setLoading((prev) => ({ ...prev, casinoAmountUpdate: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bet-modifier/update"}`,
        value,
        //   index: paginationData.index,
        //   noOfRecords: paginationData.noOfRecords,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          notifyToast().succes(res.data.message);
          casinoAmount();
        } else {
          notifyToast().error(res.data.message);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, casinoAmountUpdate: false }));

    // setLoading(false);
  };
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Casino Amount</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Casion_amount} style={{ color: "#74788d" }}>
            Multi Login
          </NavLink>
        </p>
      </div>
      <div className="search">
        <label htmlFor="" style={{ display: "block", marginBlock: "10px" }}>
          Search User
        </label>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          style={{ width: "300px" }}
        />
      </div>
      <div className="table">
        {/* <div style={{ paddingLeft: "5px" }}>
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
        </div> */}
        <Table
          columns={columns}
          dataSource={dataSource}
          className="accountTable"
          pagination={false}
        />
        {/* <div className="pagination">
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
        </div> */}
      </div>
    </>
  );
};

export default CasinoAmount;
