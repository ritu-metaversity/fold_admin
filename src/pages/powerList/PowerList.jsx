import { Button, Input, Switch, Table, Modal, Tooltip, Form } from "antd";
import React, { useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { message as antdMessage } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
///styles
// import "./styles.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { Delete_Power_List, Power_list } from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { GoTrashcan } from "react-icons/go";

const PoerList = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [DataList, setDataList] = useState([]);
  const [apiCall, setApiCall] = useState(0);
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
        antdMessage.error(error.response.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, accountTableData: false }));
          navigate("/");
          localStorage.clear();
          // antdMessage.error(error.response?.data.message);
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
          <Tooltip placement="top" title={"Delete"}>
            <Button
              onClick={() => {
                showModal(res.userId);
                setApiCall(2);
              }}
              style={{ border: "none" }}
            >
              <GoTrashcan style={{ color: "red" }} />
            </Button>
          </Tooltip>
        ),
      });
    }
  });
  const deletePoweList = async (userId) => {
    setLoading((prev) => ({ ...prev, deletePoweList: true }));
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
        antdMessage.success(res.data.message);
        setDataList(DataList?.filter((row) => row.userId !== userId));
        handleCancel();
      })
      .catch((error) => {
        antdMessage.error(error.response?.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, deletePoweList: false }));
          navigate("/");
          localStorage.removeItem("token");
        }
      });
    setLoading((prev) => ({ ...prev, deletePoweList: false }));
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
  const showModal = (id) => {
    setIsModalOpen(true);
    setdeleteRowId(id);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
    deletePoweList(deleteRowId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Mainlayout>
      <DeleteModal
        showModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        headerColor={apiCall}
        remarkRender={1}
      />
      <div className="hading-create-accounts">
        <h4>Helper List</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/Power_List_Screen" style={{ color: "#74788d" }}>
            Helper List
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
            {/* <Link to="/creatAaccounts">
              <Button style={{ color: "white", border: "none" }}>
                <AiOutlinePlus />
                Create Account
              </Button>
            </Link> */}
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
