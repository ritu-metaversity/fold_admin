/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Switch, Table, Modal } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
///styles
// import "./styles.scss";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import axios from "axios";
import {
  Account_List,
  Down_Line_ActiveUser,
  Table_ActiveUser,
} from "../../routes/Routes";

import { useContext } from "react";
import { LoaderContext } from "../../App";
import Profile from "../../components/moreCard/components/profile/Profile";
import ExposureModal from "../../components/exposureModal";
export const UserModalContext = createContext({
  handleCancel: () => {},
});

const DownList = ({ apiState }) => {
  // const id = searchparam.get("downLine-id");
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const { setLoading } = useContext(LoaderContext);

  const [open, setOpen] = useState(false);
  const [profileModal, setprofileModal] = useState(false);
  const [DataList, setDataList] = useState([]);

  const [userId, setUserId] = useState("");

  const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

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
    setMessage(event.target.value);
  };
  console.log(message, "message");
  const handleClick = () => {
    // 👇 "message" stores input field value
    setSearchText(message);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credit, setcredit] = useState(false);

  //////deposit Modal
  // const showModal = (obj) => {
  //   setIsModalOpen(true);
  //   const data = DataList?.find((item) => item?.id === obj);
  //   setUserId(data);
  // };
  //////withdrawal Modal
  // const showModals = (obj) => {
  //   setOpen(true);
  //   const data = DataList?.find((item) => item?.id === obj);
  //   setUserId(data);
  // };

  // ///show profile modal
  // const showModalProfile = (obj) => {
  //   setprofileModal(true);
  //   const data = DataList?.find((item) => item?.id === obj);
  //   setUserId(data);
  // };
  // /////show credit Activity Modal
  // const showCredit = (obj) => {
  //   setcredit(true);
  //   const data = DataList?.find((item) => item?.id === obj);
  //   setUserId(data);
  // };
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
    setExposureIsModal(false);
    // setInputBlank(!false);
  };
  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, activeUsertable: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${
          apiState ? Table_ActiveUser : Account_List
        }`,
        {
          id: id,
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          username: message,
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
  }, [paginationData.index, paginationData.noOfRecords, message]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        activeUsertable: false,
      }));
    };
  }, [setLoading]);
  const { pathname } = useLocation();
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      // filteredValue: [message],
      // onFilter: (value, record) => {
      //   console.log(record.username?.props?.children[0], "record");
      //   return String(record.username?.props?.children[0])
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      width: 100,
      onCell: () => {
        return {
          style: {
            whiteSpace: "break-spaces",
            maxWidth: 100,
          },
        };
      },
    },
    {
      title: "CR",
      dataIndex: "CR",
      sorter: (a, b) => a.CR?.props?.children - b.CR?.props?.children,
      sortOrder: sortedInfo.field === "CR" ? sortedInfo.order : null,
    },
    {
      title: "PTS",
      dataIndex: "PTS",
      sorter: (a, b) => a.PTS - b.PTS,
      sortOrder: sortedInfo.field === "PTS" ? sortedInfo.order : null,
    },
    {
      title: "Client (P/L)",
      dataIndex: "Client",
      sorter: (a, b) => a.Client - b.Client,
      sortOrder: sortedInfo.field === "Client" ? sortedInfo.order : null,
    },
    {
      title: "Client (P/L)%",
      dataIndex: "Clientp",
      sorter: (a, b) => a.Clientp - b.Clientp,
      sortOrder: sortedInfo.field === "Clientp" ? sortedInfo.order : null,
    },
    {
      title: "Exposure",
      dataIndex: "Exposer",
      sorter: (a, b) => a.Exposer - b.Exposer,
      sortOrder: sortedInfo.field === "Exposer" ? sortedInfo.order : null,
    },
    {
      title: "Available pts",
      dataIndex: "Available",
      sorter: (a, b) => a.Available - b.Available,
      sortOrder: sortedInfo.field === "Available" ? sortedInfo.order : null,
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
      dataIndex: "PPhone",
    },
    {
      title: "Account Type",
      dataIndex: "AccountType",
    },
    // {
    //   title: "Action",
    //   dataIndex: "Action",
    // },
  ];

  const data = DataList?.map((res) => {
    return {
      key: res?.id,

      username: (
        <Link
          to={
            res.accountType === "User"
              ? pathname
              : `${Down_Line_ActiveUser}${res?.id}`
          }
          style={{ color: "black" }}
        >
          {res?.username} <br />
          {res?.userId}
        </Link>
      ),
      CR: (
        <span style={{ color: "#f1b44c", cursor: "pointer" }}>
          {res?.chips}
        </span>
      ),
      PTS: res?.pts,
      Client: res?.clientPl,
      Clientp: res?.clientPlPercentage,
      Exposer: (
        <span
          onClick={() => exposureShowModal(res?.userId)}
          style={{ cursor: "pointer" }}
        >
          {res?.exposure}
        </span>
      ),
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
      //   Action: (
      //     <div style={{ paddingRight: "10px" }}>
      //       <Button
      //         style={{
      //           background: "#50a5f1",
      //           color: "white",
      //           borderColor: "#50a5f1",
      //           borderRadius: "5px",
      //         }}
      //         onClick={() => showModalProfile(res?.id)}
      //       >
      //         P
      //       </Button>
      //     </div>
      //   ),
    };
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
  const [exposerUserId, setExposerUserId] = useState("");
  const [exposureIsModal, setExposureIsModal] = useState(false);
  const exposureShowModal = (id) => {
    setExposerUserId(id);
    setExposureIsModal(true);
  };

  return (
    <UserModalContext.Provider
      value={{
        handleCancel: handleCancel,
      }}
    >
      <Modal
        title="Exposure"
        open={exposureIsModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        className="exposure-modal"
      >
        <ExposureModal userID={exposerUserId} />
      </Modal>
      <Modal
        // title={DataList.find((item) => item.id == userData)?.username}
        title={userId.username}
        open={profileModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="more card-header"
        destroyOnClose
      >
        <Profile data={userId} />
      </Modal>

      <div className="hading-create-accounts">
        <h4>ACCOUNT LIST </h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to="/activeUser" style={{ color: "#74788d" }}>
            Active List
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
          onChange={handleChangeTable}
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

export default DownList;
