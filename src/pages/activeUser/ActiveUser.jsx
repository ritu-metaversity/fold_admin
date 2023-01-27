import { Button, Input, Switch, Table, Modal, Tooltip, Form } from "antd";
import React, { createContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { AiOutlinePlus } from "react-icons/ai";
///styles
import "./styles.scss";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import DepositForm from "../../components/modalForm/DepositForm";
import MoreCard from "../../components/moreCard/MoreCard";
import Widrawal from "../../components/modalForm/Widrawal";
import CreditModal from "../../components/creditActivityModal/CreditModal";
import axios from "axios";
import { Table_ActiveUser } from "../../routes/Routes";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import { useContext } from "react";
import { LoaderContext } from "../../App";
export const UserModalContext = createContext({
  handleCancel: () => {},
});

const ActiveUser = () => {
  const isMobile = useMediaQuery("(min-width: 768px)");

  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const { loading, setLoading } = useContext(LoaderContext);

  const [open, setOpen] = useState(false);
  const [profileModal, setprofileModal] = useState(false);
  const [DataList, setDataList] = useState([]);

  const [userId, setUserId] = useState("");
  const [searchparam, setSearchParam] = useSearchParams();

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credit, setcredit] = useState(false);
  const [inputBlank, setInputBlank] = useState(false);
  const navigate = useNavigate();

  //////deposit Modal
  const showModal = (obj) => {
    setIsModalOpen(true);
    const data = DataList?.find((item) => item?.id == obj);
    setUserId(data);
  };
  //////withdrawal Modal
  const showModals = (obj) => {
    setOpen(true);
    const data = DataList?.find((item) => item?.id == obj);
    setUserId(data);
  };

  ///show profile modal
  const showModalProfile = (obj) => {
    setprofileModal(true);
    const data = DataList?.find((item) => item?.id == obj);
    setUserId(data);
  };
  /////show credit Activity Modal
  const showCredit = (obj) => {
    setcredit(true);
    const data = DataList?.find((item) => item?.id == obj);
    setUserId(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setOpen(false);
    setprofileModal(false);
    setcredit(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    setprofileModal(false);
    setcredit(false);
    setInputBlank(!false);
  };

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, activeUsertable: true }));
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
        message.error(error.response.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, activeUsertable: false }));
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, activeUsertable: false }));
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords]);

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
    },
    {
      title: "CR",
      dataIndex: "CR",
      sorter: {
        compare: (a, b) => a.CR - b.CR,
        multiple: 3,
      },
    },
    {
      title: "PTS",
      dataIndex: "PTS",
      sorter: {
        compare: (a, b) => a.PTS - b.PTS,
        multiple: 2,
      },
    },
    {
      title: "Client (P/L)",
      dataIndex: "Client",
      sorter: {
        compare: (a, b) => a.Client - b.Client,
        multiple: 1,
      },
    },
    {
      title: "Client (P/L)%",
      dataIndex: "Clientp",
      sorter: {
        compare: (a, b) => a.Clientp - b.Clientp,
        multiple: 1,
      },
    },
    {
      title: "Exposer",
      dataIndex: "Exposer",
      sorter: {
        compare: (a, b) => a.Exposer - b.Exposer,
        multiple: 1,
      },
    },
    {
      title: "Available pts",
      dataIndex: "Available",
      sorter: {
        compare: (a, b) => a.Available - b.Available,
        multiple: 1,
      },
    },
    {
      title: "B st",
      dataIndex: "bst",
      sorter: {
        compare: (a, b) => a.bst - b.bst,
        multiple: 1,
      },
    },
    {
      title: "U st",
      dataIndex: "ust",
      sorter: {
        compare: (a, b) => a.ust - b.ust,
        multiple: 1,
      },
    },
    {
      title: "PPhone",
      dataIndex: "PPhone",
      sorter: {
        compare: (a, b) => a.PPhone - b.PPhone,
        multiple: 1,
      },
    },
    {
      title: "Account Type",
      dataIndex: "AccountType",
      sorter: {
        compare: (a, b) => a.AccountType - b.AccountType,
        multiple: 1,
      },
    },
    {
      title: "Action",
      dataIndex: "Action",
      sorter: {
        compare: (a, b) => a.Action - b.Action,
        multiple: 1,
      },
    },
  ];

  const data = [];

  DataList?.map((res) => {
    data?.push({
      key: res?.id,

      username: `${res?.username} (${res?.userId})`,
      CR: (
        <span
          style={{ color: "#f1b44c", cursor: "pointer" }}
          onClick={() => showCredit(res.id)}
        >
          {res?.chips}
        </span>
      ),
      PTS: res?.pts,
      Client: res?.clientPl,
      Clientp: res?.clientPlPercentage,
      Exposer: res?.exposure,
      Available: res?.availabePts,
      bst: res?.betLock ? (
        <Switch size="small" disabled={true} defaultChecked="true" />
      ) : (
        <Switch size="small" disabled={true} defaultunchecked="true" />
      ),

      ust: res.accountLock ? (
        <Switch size="small" disabled={true} defaultChecked="true" />
      ) : (
        <Switch size="small" disabled={true} defaultunchecked="true" />
      ),
      PPhone: res?.pname,
      AccountType: res?.accountType,
      Action: (
        <>
          <Tooltip placement="top" title={isMobile ? "Deposit" : ""}>
            <Button
              style={{
                background: "#34c38f",
                color: "white",
                borderColor: "#34c38f",
                borderRadius: "5px 0px 0px 5px",
              }}
              onClick={() => showModal(res?.id)}
            >
              D
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={isMobile ? "withdrawal" : ""}>
            <Button
              style={{
                background: "#f46a6a",
                color: "white",
                borderColor: "#f46a6a",
                borderRadius: "0px 0px 0px 0px",
              }}
              onClick={() => showModals(res?.id)}
            >
              w
            </Button>
          </Tooltip>
          <Button
            style={{
              background: "#50a5f1",
              color: "white",
              borderColor: "#50a5f1",
              borderRadius: "0px 5px 5px 0px",
            }}
            onClick={() => showModalProfile(res?.id)}
          >
            more
          </Button>
        </>
      ),
    });
  });

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

  return (
    <UserModalContext.Provider
      value={{
        handleCancel: handleCancel,
      }}
    >
      <Mainlayout>
        <Modal
          title="Deposit"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
          className="deposite"
          destroyOnClose="true"
        >
          <DepositForm
            handleCancel={handleCancel}
            data={userId}
            gettableData={tabledata}
          />
        </Modal>
        <Modal
          title="WITHDRAW"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          className="widrwal"
          destroyOnClose="true"
        >
          <Widrawal
            handleCancel={handleCancel}
            data={userId}
            gettableData={tabledata}
          />
        </Modal>
        <Modal
          // title={DataList.find((item) => item.id == userData)?.username}
          open={profileModal}
          onOk={handleOk}
          onCancel={handleCancel}
          className="more"
          destroyOnClose="true"
        >
          <MoreCard data={userId} handleCancelfunction={handleCancel} />
        </Modal>
        {/* /////credit Activity modal */}
        <Modal
          title="CREDIT ACTIVITY"
          open={credit}
          onOk={handleOk}
          onCancel={handleCancel}
          className="CREDI-ACTIVITY"
          destroyOnClose="true"
        >
          <CreditModal
            data={userId}
            gettableData={tabledata}
            handleCancelfunction={handleCancel}
          />
        </Modal>
        <div className="hading-create-accounts">
          <h4>ACCOUNT LIST FOR ACTIVE USERS</h4>
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
            // onChange={onChange}
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

export default ActiveUser;
