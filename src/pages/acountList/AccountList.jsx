/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Switch, Table, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
///styles
import "./styles.scss";
import { Link, NavLink } from "react-router-dom";
import DepositForm from "../../components/modalForm/DepositForm";
import MoreCard from "../../components/moreCard/MoreCard";
import Widrawal from "../../components/modalForm/Widrawal";
import CreditModal from "../../components/creditActivityModal/CreditModal";
import axios from "axios";
import { Account_List, Down_Line_ActiveList } from "../../routes/Routes";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import { UserModalContext } from "../activeUser/ActiveUser";
import { useContext } from "react";
import { LoaderContext } from "../../App";

const Activelist = () => {
  const isMobile = useMediaQuery("(min-width: 768px)");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const [open, setOpen] = useState(false);
  const [profileModal, setprofileModal] = useState(false);
  const [DataList, setDataList] = useState([]);
  const [userData] = useState([]);

  const [userId, setUserId] = useState("");
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const reset = () => {
    setSearchText("");
    setMessage("");
  };
  const handleChange = (event) => {
    setSearchText(event.target.value);
    // console.log(event);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credit, setcredit] = useState(false);
  const [setInputBlank] = useState(false);

  //////deposit Modal
  const showModal = (obj) => {
    setIsModalOpen(true);
    const data = DataList?.find((item) => item?.id === obj);
    setUserId(data);
  };
  //////withdrawal Modal
  const showModals = (obj) => {
    setOpen(true);
    const data = DataList?.find((item) => item?.id === obj);
    setUserId(data);
  };

  ///show profile modal
  const showModalProfile = (obj) => {
    setprofileModal(true);
    const data = DataList?.find((item) => item?.id === obj);
    setUserId(data);
  };
  /////show credit Activity Modal
  const showCredit = (obj) => {
    setcredit(true);
    const data = DataList?.find((item) => item?.id === obj);
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
    setLoading((prev) => ({ ...prev, accountTableData: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Account_List}`,
        {
          id: "",
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          username: searchText,
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
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, accountTableData: false }));

    // setLoading(false);
  };

  useEffect(() => {
    tabledata();
  }, [paginationData.index, paginationData.noOfRecords, searchText]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        accountTableData: false,
      }));
    };
  }, [setLoading]);
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return String(record.username.props.children)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      width: 200,
      onCell: () => {
        return {
          style: {
            whiteSpace: "break-spaces",
            maxWidth: 200,
          },
        };
      },
    },
    {
      title: "Login ID",
      dataIndex: "userId",
      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return String(record.username.props.children)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      width: 200,
      onCell: () => {
        return {
          style: {
            whiteSpace: "break-spaces",
            maxWidth: 200,
          },
        };
      },
    },
    {
      title: "CR",
      dataIndex: "CR",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        Number(a.CR?.props?.children) - Number(b.CR?.props?.children),
    },
    {
      title: "Domain",
      dataIndex: "Domain",
    },
    {
      title: "lcLock",
      dataIndex: "lcLock",
    },

    {
      title: "B st",
      dataIndex: "bst",
    },
    {
      title: "U st",
      dataIndex: "ust",
    },
    {
      title: "PName",
      dataIndex: "PName",
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
  const data = DataList?.filter(
    (item) => item.password !== "ZdTqj#Qbj@Y7Des3^E8hT14nnOY4Y"
  ).map((res) => {
    return {
      key: res?.username + res.id,
      username: (
        <Link
          to={`${Down_Line_ActiveList}${res?.id}`}
          style={{ color: "#fff" }}
          className="user_id_name"
        >
          {res?.username} 
        </Link>
      ),
      userId: (
        <Link
          to={`${Down_Line_ActiveList}${res?.id}`}
          style={{ color: "#fff" }}
          className="user_id_name"
        >
          ({res.userId})
        </Link>
      ),
      CR: (
        <span
          style={{ color: "#f1b44c", cursor: "pointer" }}
          onClick={() => showCredit(res?.id)}
        >
          {res?.chips}
        </span>
      ),

      bst: <Switch size="small" disabled={true} checked={res.betLock} />,
      ust: <Switch size="small" disabled={true} checked={res.active} />,

      PName: res?.pname,
      Domain: res?.appUrl,
      lcLock: <Switch size="small" disabled={true} checked={res?.lcLock} />,

      AccountType: res?.accountType,
      Action: (
        <div style={{ paddingRight: "10px" }}>
          <Button
            style={{
              background: "#f1b44c",
              color: "white",
              borderColor: "#f1b44c",
              borderRadius: "5px 0px 0px 5px",
            }}
            onClick={() => showCredit(res?.id)}
          >
            CR
          </Button>
          <Tooltip placement="top" title={isMobile ? "Deposit" : ""}>
            <Button
              style={{
                background: "#34c38f",
                color: "white",
                borderColor: "#34c38f",
                borderRadius: "0px 0px 0px 0px",
              }}
              onClick={() => showModal(res?.id)}
            >
              D
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={isMobile ? "Widrawal" : ""}>
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

  return (
    <UserModalContext.Provider
      value={{
        handleCancel: handleCancel,
      }}
    >
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
          userId={userId}
          handleCancel={handleCancel}
          data={userId}
          destroyOnClose="true"
          gettableData={tabledata}
        />
      </Modal>
      <Modal
        title="WITHDRAW"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="widrwal"
        data={userId}
        destroyOnClose="true"
      >
        <Widrawal
          data={userId}
          gettableData={tabledata}
          handleCancelfunction={handleCancel}
        />
      </Modal>
      <Modal
        title={DataList?.find((item) => item?.id === userData)?.username}
        open={profileModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="more"
        destroyOnClose="true"
      >
        <MoreCard
          data={userId}
          handleCancelfunction={handleCancel}
          Apifun={tabledata}
          helper="noUpdate"
        />
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
        <h4>ACCOUNT LIST</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/accountList" style={{ color: "#74788d" }}>
            Account List
          </NavLink>
        </p>
      </div>
      <div className="table">
        <div className="search">
          <div className="left-col">
            <form>
              <Input
                placeholder="search here....."
                name="message"
                onChange={handleChange}
                value={searchText}
              />
            </form>
            <div className="serch-btn">
              <Button
                onChange={handleClick}
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
            <Link to="/createAccounts">
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
    </UserModalContext.Provider>
  );
};

export default Activelist;
