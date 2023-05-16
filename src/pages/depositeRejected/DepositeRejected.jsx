/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image, Input, Select, Table } from "antd";
import React, { createContext, useEffect, useState } from "react";
///styles
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { columns } from "./depositeRejectedColumn";
import moment from "moment";
export const UserModalContext = createContext({
  handleCancel: () => {},
});

const DepositeRejected = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const [filterValue, setFilterValue] = useState("ALL");
  const [DataList, setDataList] = useState([]);

  const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  //////// change password

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
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
  };

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, activeUsertable: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/pw/list-all-deposit-request`,
        {
          id: "",
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          userId: "",
          type: filterValue,
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
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   setLoading((prev) => ({ ...prev, activeUsertable: false }));
        //   localStorage.removeItem("token");
        //   navigate("/");
        //   message.error(error.response.data.message);
        // }
      });
    setLoading((prev) => ({ ...prev, activeUsertable: false }));
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords, filterValue]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        activeUsertable: false,
      }));
    };
  }, [setLoading]);

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
  const data = DataList?.map((curElem) => {
    return {
      key: curElem.byPowerUser + curElem.image + curElem.time,
      byPowerUser: curElem.byPowerUser,
      remark: curElem.remark,
      image: (
        <Image
          src={curElem.image}
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
        ></Image>
      ),
      amount: curElem.amount,
      time: moment(curElem.time).format("DD-MM-YYYY , HH-MM-SS"),
      status: curElem.status,
    };
  });
  const filterAll = (value) => {
    setFilterValue(value);
  };
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Deposite Rejected</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/activeUser" style={{ color: "#74788d" }}>
            Active Users
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
              value={message}
            />
            <div className="serch-btn">
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
          <div className="right-col">
            <Select
              defaultValue="ALL"
              style={{
                width: 120,
              }}
              onChange={filterAll}
              options={[
                {
                  value: "ALL",
                  label: "ALL",
                },
                {
                  value: "APPROVED",
                  label: "APPROVED",
                },
                {
                  value: "REJECTED",
                  label: "REJECTED",
                },
              ]}
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
          onChange={handleChangeTable}
          className="accountTable"
          pagination={{ pageSize: paginationData.noOfRecords }}
        />
        <div className="pagination">
          <ul className="pagination-rounded mb-0">
            <ul className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end">
              <li className="page-item disabled">
                <span style={{ cursor: "pointer" }} onClick={ResetCounter}>
                  «
                </span>
              </li>
              <li className="page-item disabled">
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
                <button className="page-link">
                  {paginationData.index + 1}
                </button>
              </li>
              <li className="page-item disabled">
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
              <li className="page-item disabled">
                <span
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

export default DepositeRejected;
