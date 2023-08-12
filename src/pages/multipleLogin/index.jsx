/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
///styles
import { NavLink } from "react-router-dom";

import axios from "axios";

import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Button, Input, Modal, Select, Table } from "antd";
import { Multiple_login } from "../../routes/Routes";
import { columns } from "./Colums";
import AddurlList from "./AddurlList";
import ViewUrlList from "./ViewUrlList";

const MultipleLogin = () => {
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const [DataList, setDataList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });

  ///show profile modal

  const multiLogin = async () => {
    setLoading((prev) => ({ ...prev, multiLogin: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"appid-login/getforlist"}`,
        {
          userId: searchValue,
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
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, multiLogin: false }));

    // setLoading(false);
  };

  useEffect(() => {
    multiLogin();
  }, [paginationData.index, paginationData.noOfRecords, searchValue]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        accountTableData: false,
      }));
    };
  }, [setLoading]);

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
  const [useData, setuseData] = useState({});
  const dataSource = DataList?.map((curElm, index) => {
    return {
      key: curElm.appid + curElm.userid + index,
      appid: curElm?.appid,
      userid: curElm?.userid,
      action: (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Button
            style={{ background: "orange", color: "white", border: "none" }}
            onClick={() => {
              setuseData({ userName: curElm?.userid, userid: curElm.id });
              setmodalOpenValue(1);
              showModal();
            }}
          >
            View
          </Button>
          <Button
            style={{ background: "orange", color: "white", border: "none" }}
            onClick={() => {
              setuseData({ userName: curElm?.userid, userid: curElm.id });
              showModal();
              setmodalOpenValue(0);
            }}
          >
            Add
          </Button>
        </div>
      ),
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const modalObj = {
    0: <AddurlList useData={useData} handleCance={handleCancel} />,
    1: <ViewUrlList useData={useData} handleCance={handleCancel} />,
  };
  const [modalOpenValue, setmodalOpenValue] = useState(0);

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {modalObj[modalOpenValue]}
      </Modal>
      <div className="hading-create-accounts">
        <h4>Multi Login</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Multiple_login} style={{ color: "#74788d" }}>
            Multi Login
          </NavLink>
        </p>
      </div>
      <div className="search">
        <label htmlFor="" style={{ display: "block", marginBlock: "10px" }}>
          Search User
        </label>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          style={{ width: "300px" }}
        />
      </div>
      <div className="table">
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
          dataSource={dataSource}
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

export default MultipleLogin;
