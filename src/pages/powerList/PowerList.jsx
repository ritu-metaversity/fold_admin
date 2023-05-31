/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Input, Modal, Row, Switch, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
///styles
// import "./styles.scss";
import { NavLink } from "react-router-dom";

import axios from "axios";
import {
  Delete_Power_List,
  Power_list,
  updatePermissionApi,
} from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { GoTrashcan } from "react-icons/go";
import { notifyToast } from "../../components/toast/Tost";
import { AiFillEye } from "react-icons/ai";
import Privileges, {
  permissionArray,
} from "../../components/priveleges/Privileges";
import { BiEdit } from "react-icons/bi";

export let tableDataRef = () => {};

const PoerList = () => {
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [DataList, setDataList] = useState([]);
  const [apiCall, setApiCall] = useState(0);
  const [checkValue, setcheckValue] = useState([]);
  const [updatePermission, setUpdatePermissionModal] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
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
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, accountTableData: false }));

    // setLoading(false);
  };

  tableDataRef = tabledata;
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
      title: "Permission",
      dataIndex: "view",
    },
    {
      title: "Action",
      dataIndex: "Action",
    },
  ];

  const data = DataList?.map((res) => {
    return {
      UserID: res.userId,
      Password: res.password,
      Active: <Switch checked={res.active} disabled size="small" />,
      view: (
        <Tooltip placement="top" title={res?.permission.toString()}>
          <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
        </Tooltip>
      ),

      Action: (
        <div style={{ display: "flex", gap: "10px" }}>
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
          <Button
            style={{
              border: "none",
            }}
            onClick={() =>
              updatePermissionModal({
                id: res.userId,
                permission: res.permission,
              })
            }
          >
            <BiEdit />
          </Button>
        </div>
      ),
    };
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
        notifyToast().succes(res.data.message);
        setDataList(DataList?.filter((row) => row.userId !== userId));
        handleCancel();
      })
      .catch((error) => {});
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
    setIsModalOpen(false);
    setUpdatePermissionModal(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdatePermissionModal(false);
  };
  const [userId, setUserId] = useState("");
  const updatePermissionModal = (permissionData) => {
    setUserId(permissionData.id);
    setcheckValue(permissionData.permission);
    setUpdatePermissionModal(true);
  };
  const onChangeCheckBox = (name, e) => {
    if (name == "ALL") {
      if (checkValue.find((i) => i == "ALL")) {
        setcheckValue([]);
      } else {
        setcheckValue(["ALL"]);
      }
    } else {
      const value = e.target.checked;
      if (name && value) {
        setcheckValue((prev) => {
          return [...prev, name];
        });
      } else {
        let valueRaay = checkValue.indexOf(name);
        let newCheckvalue = [...checkValue];
        newCheckvalue.splice(valueRaay, 1);
        let AllvalueRaay = checkValue.indexOf("ALL");
        if (AllvalueRaay >= 0) {
          setcheckValue(
            permissionArray.filter((i) => ![name, "ALL"].includes(i))
          );
        } else {
          setcheckValue(newCheckvalue);
        }
      }
    }
  };
  const upadtePermissionApi = async () => {
    if (!checkValue.length > 0) {
      return notifyToast().error("please Select any one Privilege");
    } else if (!passwordValue) {
      return notifyToast().error("please enter luPassword");
    }
    setLoading((prev) => ({ ...prev, upadtePermissionApi: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${updatePermissionApi}`,
        {
          userId: userId,
          luPassword: passwordValue,
          userPermissions: checkValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          handleCancel();
          tabledata();
          return notifyToast().succes(res?.data?.message);
        }
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, upadtePermissionApi: false }));
  };
  return (
    <>
      <Modal
        title="Update Permission"
        open={updatePermission}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Privileges checkValue={checkValue} onChange={onChangeCheckBox} />
        <div className="update-permission-footer">
          <Row>
            <Col xl={16}></Col>
            <Col xl={8} style={{ display: "flex", gap: "10px" }}>
              <Input
                style={{ width: "200px" }}
                placeholder="Transaction Password..."
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <Button onClick={upadtePermissionApi}>Submit</Button>
            </Col>
          </Row>
        </div>
      </Modal>
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
    </>
  );
};

export default PoerList;
