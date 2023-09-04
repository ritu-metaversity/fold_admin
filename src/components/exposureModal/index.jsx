import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import axios from "axios";
import { Table } from "antd";

const ExposureModal = ({ userID }) => {
  const [dataList, setDataList] = useState([]);
  const { setLoading } = useContext(LoaderContext);
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const exposureData = async () => {
    setLoading((prev) => ({ ...prev, activeUsertable: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bets/open-betlist-by-uplineid"}`,
        {
          userId: userID,
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
        if (res?.data?.data?.betList) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setDataList(res?.data?.data?.betList);
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
    exposureData();
  }, [paginationData.index, paginationData.noOfRecords]);

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
  // /

  const dataSource = dataList?.map((curELm) => {
    return {
      key: curELm?.userid + curELm?.selectionname + curELm?.stack + userID,
      name: curELm?.userid,
      odds: curELm?.odds,
      selectionname: curELm?.selectionname,
      stack: curELm?.stack,
      liability: curELm?.liability,
      matchedtime: curELm?.matchedtime,
      isback: curELm?.isback,
    };
  });

  const columns = [
    {
      title: "User Id",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "odds",
      dataIndex: "odds",
      key: "odds",
    },

    {
      title: "Selection Name",
      dataIndex: "selectionname",
      key: "selectionname",
    },
    {
      title: "Stack",
      dataIndex: "stack",
      key: "stack",
    },
    {
      title: "liability",
      dataIndex: "liability",
      key: "liability",
    },

    {
      title: "Date",
      dataIndex: "matchedtime",
      key: "matchedtime",
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) => {
          return record.isback ? "blue" : "pink";
        }}
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
  );
};

export default ExposureModal;
