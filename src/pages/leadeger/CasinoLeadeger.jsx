import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create_Ledeger2 } from "../../routes/Routes";
import axios from "axios";
import { Button, Input, Modal, Select, Table } from "antd";
import "./styles.scss";
import { notifyToast } from "../../components/toast/Tost";

const CasinoLeader = () => {
  const [activeSportData, setActiveSportData] = useState([]);
  const [sportId, setSportId] = useState(4);
  const [lederData, setLederData] = useState([]);
  const [isLedgerCreated, setIsLedgerCreated] = useState("");

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 10,
    totalPages: 1,
  });

  const createLedeger = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bmx/report/event-for-ledger"}`,
        // `${"http://192.168.0.142/admin-new-apis"}/${"bmx/report/event-for-ledger"}`,

        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          isLedgerCreated: isLedgerCreated || null,
          isCasino: true,
          // sportId: sportId,
          // date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setPaginationData({
          ...paginationData,
          totalPages: res?.data?.data?.totalPages || 1,
        });
        setLederData(res?.data?.data?.response);
      });
  };

  const activeSport = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"sport/active-sport-list"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setActiveSportData(res?.data?.data);
      });
  };
  useEffect(() => {
    activeSport();
    createLedeger();
  }, [
    isLedgerCreated,
    sportId,
    paginationData.index,
    paginationData.noOfRecords,
  ]);
  const [data, setData] = useState({});
  const dataSource = lederData?.map((res) => {
    return {
      matchName: res?.matchName,
      matchid: res.matchid,
      isactive: res.isactive ? "Active" : "In Active",
      isLedgerCreateRequested: res?.isLedgerCreated ? "Yes" : "No",
      // mongoBetCount: res?.mongoBetCount,
      // mySqlBetCount: res?.mySqlBetCount,
      ledgerCreatedAtDate: res?.ledgerCreatedAtDate,
      isRollBacked: res?.isRollBacked ? "Yes" : "No",
      lastRollBackedAt: res?.lastRollBackedAt,
      Date: res?.ledgerCreatedAt,
      Action:
        res?.isRollBacked == false ? (
          <Button
            onClick={() => {
              showModal();
              setData({
                matchId: res?.matchid,
                dateStr: res?.ledgerCreatedAtDate,
                userId: localStorage.getItem("userid"),
                password: "",
                isCasino: true,
              });
            }}
            style={{ background: "orange", border: "none", color: "white" }}
          >
            Create Roll Back
          </Button>
        ) : res?.isLedgerCreatedForRollBack == null ||
          res?.isLedgerCreatedForRollBack == false ? (
          <Button
            onClick={() => {
              showModal(true);
              setData({
                matchId: res?.matchid,
                dateStr: res?.ledgerCreatedAtDate,
                userId: localStorage.getItem("userid"),
                password: "",
                isCasino: true,
              });
            }}
            style={{ background: "orange", border: "none", color: "white" }}
          >
            Create ledeger
          </Button>
        ) : (
          <Button
            onClick={() => {
              showModal();
              setData({
                matchId: res?.matchid,
                dateStr: res?.ledgerCreatedAtDate,
                userId: localStorage.getItem("userid"),
                password: "",
                isCasino: true,
              });
            }}
            style={{ background: "orange", border: "none", color: "white" }}
          >
            Create Roll Back
          </Button>
        ),
    };
  });

  const columns = [
    {
      title: "Match Name",
      dataIndex: "matchName",
      key: "matchName",
    },
    {
      title: "Status",
      dataIndex: "isactive",
      key: "isactive",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Ledger Post",
      dataIndex: "isLedgerCreateRequested",
      key: "isLedgerCreateRequested",
    },
    {
      title: "Leder Date",
      dataIndex: "ledgerCreatedAtDate",
      key: "ledgerCreatedAtDate",
    },

    {
      title: "Roll Back",
      dataIndex: "isRollBacked",
      key: "isRollBacked",
    },
    {
      title: "Roll Back Date",
      dataIndex: "lastRollBackedAt",
      key: "lastRollBackedAt",
    },

    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const handleChange2 = (value) => {
    setIsLedgerCreated(value);
  };
  const option2 = [
    {
      value: "false",
      label: "No",
    },
    {
      value: "true",
      label: "Yes",
    },
  ];

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

  const createRollback = async () => {
    await axios
      .post(
        // "https://ledger.247idhub.com/bmx/ledger/rollback-ledger",
        `${process.env.REACT_APP_BASE_URL}/${"bmx/rollback-ledger"}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.status) {
          notifyToast().succes(res.data?.message);
          createLedeger();
          handleCancel();
          setData({});
        }
      });
  };

  const createLedege = async () => {
    await axios
      .post(
        // "https://ledger.247idhub.com/bmx/ledger/create-my-ledger",
        `${process.env.REACT_APP_BASE_URL}/${"bmx/create-my-ledger"}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.status) {
          notifyToast().succes(res.data?.message);
          handleCancel();
          createLedeger();
          setData({});
        }
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const showModal = (value) => {
    setCheckModal(value);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (data.password) {
      setPasswordError(false);
      if (!checkModal) {
        createRollback();
      } else {
        createLedege();
      }
    } else {
      setPasswordError(true);
    }

    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPasswordError(false);
  };
  return (
    <>
      <Modal
        title="Enter Transaction Code"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <p>Are You Sure </p>
        <Input
          placeholder="Transaction Password.."
          type="password"
          style={{ border: passwordError && "1px solid red" }}
          onChange={(e) => {
            let value = e.target.value;
            if (value) {
              setPasswordError(false);
              setData((prev) => {
                return {
                  ...prev,
                  password: value,
                };
              });
            } else {
              setPasswordError(true);
            }
          }}
        />
      </Modal>
      <div className="hading-create-accounts">
        <h4>Casino</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Create_Ledeger2} style={{ color: "#74788d" }}>
            Leader
          </NavLink>
        </p>
      </div>

      <div className="leader-filter-container">
        <div className="leader-filter-left-col">
          <Select
            // defaultValue="lucy"
            value={isLedgerCreated || "Select Ledger"}
            style={{
              width: 160,
            }}
            onChange={handleChange2}
            options={option2}
          />
          {/* <DatePicker
            onChange={onChange}
            style={{
              width: 160,
            }}
          /> */}
        </div>
        <div className="leader-filter-right-col">
          {/* <Input
            placeholder="Transaction Password"
            style={{ width: "200px", border: passwordError && "1px solid red" }}
            value={password}
            onChange={passwordHandler}
            type="password"
          />
          <Button
            style={{ color: "white" }}
            onClick={() => {
              createLedegerSubmit();
            }}
          >
            Submit
          </Button> */}
        </div>
      </div>
      <div style={{ paddingLeft: "5px", marginTop: "10px" }}>
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
      <div className="filter-btn-container">
        <Table dataSource={dataSource} columns={columns} />
      </div>
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
    </>
  );
};

export default CasinoLeader;
