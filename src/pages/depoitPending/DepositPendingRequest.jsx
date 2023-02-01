import {
  Button,
  Input,
  Switch,
  Table,
  Modal,
  Tooltip,
  Form,
  Image,
} from "antd";
import React, { createContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { AiOutlinePlus } from "react-icons/ai";
///styles
// import "./styles.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Deposit_Pending_Request_Api,
  Reject_Deposit_Request,
} from "../../routes/Routes";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const DepositPendingRequest = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [DataList, setDataList] = useState([]);
  const [apiCall, setApiCall] = useState(0);
  const [userId, setUserId] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
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

  //////withdrawal Modal

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, depositPendingRequest: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Deposit_Pending_Request_Api}`,
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
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, depositPendingRequest: false }));
          navigate("/");
          localStorage.removeItem("token");
          message.error(error.response?.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, depositPendingRequest: false }));

    // setLoading(false);
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      width: "25%",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.userId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
    },

    {
      title: "Image",
      dataIndex: "image",
      width: "25%",
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
        key: res?.username + res.id,
        userId: res.userId,
        amount: res?.amount,
        image: <Image width={100} src={res.image} />,
        Action: (
          <div
            className="action"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Button
              style={{ background: "#34c38f", color: "white", border: "none" }}
              onClick={() => {
                showModal(res.id);
                setApiCall(1);
              }}
            >
              Approve
            </Button>
            <Button
              style={{ background: "#ed5c5c", color: "white", border: "none" }}
              onClick={() => {
                showModal(res.id);
                setApiCall(0);
              }}
            >
              Reject
            </Button>
          </div>
        ),
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

  const reject = async (id) => {
    setDataList(DataList.filter((row) => row.id !== id));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Reject_Deposit_Request}`,
        {
          id: id,
        },
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
        console.log(error);
        message.error(error.response.data.message);
      });
  };

  const approve = async (id) => {
    setDataList(DataList.filter((row) => row.id !== id));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Reject_Deposit_Request}`,
        {
          id: id,
        },
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
        console.log(error);
        message.error(error.response.data.message);
      });
  };
  const showModal = (id) => {
    setIsModalOpen(true);
    setdeleteRowId(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    apiCall == 1 ? approve(deleteRowId) : reject(deleteRowId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <UserModalContext.Provider>
      <Mainlayout>
        <DeleteModal
          showModal={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          headerColor={apiCall}
        />
        <div className="hading-create-accounts">
          <h4>Deposit Pending Request</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            <NavLink to="" style={{ color: "#74788d" }}>
              Deposit Pending Request
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
    </UserModalContext.Provider>
  );
};

export default DepositPendingRequest;
