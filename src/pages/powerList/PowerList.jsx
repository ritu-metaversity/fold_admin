import { Button, Input, Switch, Table, Modal, Tooltip, Form } from "antd";
import React, { createContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { AiOutlinePlus } from "react-icons/ai";
///styles
// import "./styles.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DepositForm from "../../components/modalForm/DepositForm";
import MoreCard from "../../components/moreCard/MoreCard";
import Widrawal from "../../components/modalForm/Widrawal";
import CreditModal from "../../components/creditActivityModal/CreditModal";
import axios from "axios";
import {
  Account_List,
  Delete_Power_List,
  Power_list,
} from "../../routes/Routes";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";

const PoerList = () => {
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);

  const [open, setOpen] = useState(false);
  const [profileModal, setprofileModal] = useState(false);
  const [DataList, setDataList] = useState([]);
  const [userData, setuserData] = useState([]);

  const [userId, setUserId] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("evemt-id");
  console.log(DataList, "DataList");
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
    // console.log(event);
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
  };

  const navigate = useNavigate();

  //////deposit Modal

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, accountTableData: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Power_list}`,
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
        if (res?.data?.data) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data || 1,
          });
          setDataList(res?.data?.data);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
        if (error.response.status === 401) {
          navigate("/");
          localStorage.removeItem("token");
          message.error(error.response?.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, accountTableData: false }));

    // setLoading(false);
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  const columns = [
    {
      title: "User ID",
      dataIndex: "UserID",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.UserID)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Password",
      dataIndex: "Password",
    },
    {
      title: "Active",
      dataIndex: "Active",
    },
    {
      title: "Action",
      dataIndex: "Action",
    },
  ];

  const data = [];
  DataList?.map((res) => {
    if (res) {
      data.push({
        UserID: res.userId,
        Password: res.password,
        Active: res.active ? "True" : "False",
        Action: (
          <Button
            style={{
              background: "rgb(80 165 241)",
              borderColor: "rgb(80 165 241)",
              color: "white",
            }}
            onClick={() => deletePoweList(res.userId)}
          >
            Delete
          </Button>
        ),
      });
    }
  });
  const deletePoweList = async (userId) => {
    setDataList(DataList.filter((row) => row.userId !== userId));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Delete_Power_List}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        if (error.response.status === 401) {
          navigate("/");
          localStorage.removeItem("token");
          message.error(error.response?.data.message);
        }
      });
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
    <Mainlayout>
      <div className="hading-create-accounts">
        <h4>Power List</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/Power_List_Screen" style={{ color: "#74788d" }}>
            Power List
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
            <Link to="/creatAaccounts">
              <Button style={{ color: "white", border: "none" }}>
                <AiOutlinePlus />
                Create Account
              </Button>
            </Link>
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
  );
};

export default PoerList;
