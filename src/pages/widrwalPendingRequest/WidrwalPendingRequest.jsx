/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
///styles
// import "./styles.scss";
import { NavLink } from "react-router-dom";

import axios from "axios";
import {
  Approve_Withdraw_Request,
  Reject_Withdraw_Request,
  Widrwal_Pending_Request_Api,
} from "../../routes/Routes";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { notifyToast } from "../../components/toast/Tost";

const WidrwalPendingRequest = () => {
  const [searchText, setSearchText] = useState("");
  const [apiCall, setApiCall] = useState(0);
  const [deleteRowId, setdeleteRowId] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const [DataList, setDataList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const handleChange2 = (event) => {
    setSearchText(event.target.value);
    // console.log(event);
  };

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, depositPendingRequest: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Widrwal_Pending_Request_Api}`,
        {
          userId: "",
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
          setDataList(res?.data?.data?.dataList);
        } else {
          setDataList();
        }
      })
      .catch((error) => {});
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
      width: "15%",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.userId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.accountNumber)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.accountHolderName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.accountType)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.bankName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.ifsc).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      width: "25%",
    },
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      width: "25%",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      width: "25%",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      width: "25%",
    },
    {
      title: "Ifsc",
      dataIndex: "ifsc",
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "Action",
    },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.username + res.id + index,
      userId: res.userId,
      amount: res.amount,
      accountNumber: res.accountNumber,
      accountHolderName: res.accountHolderName,
      accountType: res.accountType,
      bankName: res.bankName,
      ifsc: res.ifsc,
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
            A
          </Button>
          <Button
            style={{ background: "#ed5c5c", color: "white", border: "none" }}
            onClick={() => {
              showModal(res.id);
              setApiCall(0);
            }}
          >
            R
          </Button>
        </div>
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

  const reject = async (id, remark) => {
    if (remark) {
      // settextareaError(false);

      setLoading((prev) => ({ ...prev, reject: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Reject_Withdraw_Request}`,
          {
            id: id,
            remark,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          notifyToast().succes(res.data.message);
          handleCancel();
          // setTextArea("");
          setDataList(DataList.filter((row) => row.id !== id));
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, reject: false }));
    } else {
      // settextareaError(true);
    }
  };

  const approve = async (id, remark) => {
    if (remark) {
      // settextareaError(false);

      setLoading((prev) => ({ ...prev, approve: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Approve_Withdraw_Request}`,
          {
            id,
            remark,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          notifyToast().succes(res.data.message);
          handleCancel();
          setDataList(DataList.filter((row) => row.id !== id));
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, approve: false }));
    } else {
      // settextareaError(true);
    }
  };
  const showModal = (id) => {
    setIsModalOpen(true);
    setdeleteRowId(id);
  };
  const handleOk = (remark) => {
    apiCall === 1 ? approve(deleteRowId, remark) : reject(deleteRowId, remark);
  };
  const handleCancel = () => {
    // setTextArea("");
    setIsModalOpen(false);
  };

  return (
    <UserModalContext.Provider>
      <>
        <DeleteModal
          showModal={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          headerColor={apiCall}
          remarkRender={0}
        />
        <div className="hading-create-accounts">
          <h4>Withdraw Pending Request</h4>
          <p>
            <NavLink to="/marketAnalysis">Home / </NavLink>
            <NavLink to="" style={{ color: "#74788d" }}>
              Withdraw Pending Request
            </NavLink>
          </p>
        </div>
        <div className="table">
          <div
            style={{
              paddingLeft: "5px",
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0px 10px 0px",
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
                <option value="500">500</option><option value="1000">1000</option><option value="2000">2000</option>
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
    </UserModalContext.Provider>
  );
};

export default WidrwalPendingRequest;
