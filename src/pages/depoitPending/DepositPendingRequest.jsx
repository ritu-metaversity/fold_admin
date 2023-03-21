/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table, Tooltip, Image } from "antd";
import React, { useEffect, useState } from "react";
///styles
// import "./styles.scss";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Approve_Deposit_Request,
  Deposit_Pending_Request_Api,
  Reject_Deposit_Request,
} from "../../routes/Routes";

import { useContext } from "react";
import { LoaderContext } from "../../App";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { notifyToast } from "../../components/toast/Tost";

const DepositPendingRequest = () => {
  const [searchText, setSearchText] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
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

  const navigate = useNavigate();

  const handleChange2 = (event) => {
    setSearchText(event.target.value);
    // console.log(event);
  };
  //////withdrawal Modal

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, depositPendingRequest: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Deposit_Pending_Request_Api}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data) {
          setDataList(res?.data?.data);
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
  }, []);

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

  const data = DataList?.map((res, index) => {
    return {
      key: res?.username + res.id + index + res.amount + res.image,
      userId: res.userId,
      amount: res?.amount,
      image: (
        <Image
          width={50}
          height={50}
          alt="loading"
          src={res.image}
          style={{ borderRadius: "100px" }}
        />
      ),
      Action: (
        <div
          className="action"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Tooltip placement="top" title="Approve">
            <Button
              style={{
                background: "#34c38f",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                showModal(res.id);
                setApiCall(1);
              }}
            >
              A
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Reject">
            <Button
              style={{
                background: "#ed5c5c",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                showModal(res.id);
                setApiCall(0);
              }}
            >
              R
            </Button>
          </Tooltip>
        </div>
      ),
    };
  });

  const reject = async (id, remark) => {
    setLoading((prev) => ({ ...prev, depositPendingRequestReject: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Reject_Deposit_Request}`,
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
    setLoading((prev) => ({ ...prev, depositPendingRequestReject: false }));
  };

  const approve = async (id, remark) => {
    setLoading((prev) => ({ ...prev, depositPendingRequestApprove: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Approve_Deposit_Request}`,
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
    setLoading((prev) => ({ ...prev, depositPendingRequestApprove: false }));
  };
  const showModal = (id) => {
    setIsModalOpen(true);
    setdeleteRowId(id);
  };
  const handleOk = (remark) => {
    // setIsModalOpen(false);
    apiCall === 1 ? approve(deleteRowId, remark) : reject(deleteRowId, remark);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <DeleteModal
        showModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        headerColor={apiCall}
        remarkRender={0}
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
          dataSource={data}
          className="accountTable"
          pagination={{ pageSize: paginationData.noOfRecords }}
        />
      </div>
    </>
  );
};

export default DepositPendingRequest;
