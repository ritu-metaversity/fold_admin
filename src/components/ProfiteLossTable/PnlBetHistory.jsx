import React, { useContext, useEffect, useMemo, useState } from "react";
import { TabBet_History } from "../../routes/Routes";
import { LoaderContext } from "../../App";
import axios from "axios";
import { Button, Radio, Table, Tooltip } from "antd";
import { AiFillEye } from "react-icons/ai";
import DownloadReport from "../downloadReport/DownloadReport";

const PnlBetHistory = ({ matchId, sportId }) => {
  const [sada, setsada] = useState("");
  const [radioValue, setRadioValue] = useState("matched");
  const { setLoading } = useContext(LoaderContext);
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });
  const [totalAmount, setTotalAmount] = useState("");
  const [sendSportId, setSendSportId] = useState("");
  const [sendEventId, setSendEventId] = useState("");
  const [DataList, setDataList] = useState([]);
  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, bethistorytabledata: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${TabBet_History}`,
        {
          index: paginationData?.index,
          noOfRecords: paginationData?.noOfRecords,
          sportId: sendSportId,
          matchId: matchId,
          userId: "",
          sportType: sportId,
          isDeleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setsada(res?.data?.data?.totalBets);
        setTotalAmount(res?.data?.data?.totalStake);

        if (res?.data?.data?.dataList) {
          setLoading(false);
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
        //   localStorage.removeItem("token");
        //   navigate("/");
        //   message.error(error.response.data.message);
        // }
      });
    setLoading((prev) => ({ ...prev, bethistorytabledata: false }));
  };
  useEffect(() => {
    tabledata();
  }, [
    sendSportId,
    sendEventId,
    matchId,
    paginationData?.index,
    paginationData?.noOfRecords,
  ]);
  const data = useMemo(
    () =>
      DataList?.map((res, index) => {
        return {
          key: res?.rate + res?.time + res?.amount + index,
          isBack: res?.isback,
          eventType: res?.eventType,
          eventName: res?.eventNamem,
          userName: res?.username,
          mname: res?.marketname,
          nation: res?.nation,
          urate: res?.rate,
          amount: res?.amount,
          placeDate: res?.time,

          detail: res?.deviceInfo,
        };
      }),
    [DataList]
  );
  const columns = [
    {
      title: "Event Type",
      dataIndex: "eventType",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      //   filteredValue: [searchText],
      //   onFilter: (value, record) => {
      //     return (
      //       String(record.EventName)
      //         .toLowerCase()
      //         .includes(value.toLowerCase()) ||
      //       String(record.UserName).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.MName).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.Nation).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.URate).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.Amount).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.PlaceDate).toLowerCase().includes(value.toLowerCase())
      //     );
      //   },
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "M Name",
      dataIndex: "mname",
    },
    {
      title: "Nation",
      dataIndex: "nation",
    },
    {
      title: "U Rate",
      dataIndex: "urate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Place Date",
      dataIndex: "placeDate",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      render: (text) => (
        <Tooltip title={text}>
          <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
        </Tooltip>
      ),
    },
  ];
  const Decrement = () => {
    if (paginationData?.index > 0) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index - 1,
      });
    }
    // setPageIndex(PageIndex - 1);
  };
  const ResetCounter = () => {
    setPaginationData({ ...paginationData, index: 0 });
  };
  const LastCounter = () => {
    setPaginationData({
      ...paginationData,
      index: paginationData?.totalPages - 1,
    });
  };
  const Increment = () => {
    if (paginationData?.index < paginationData?.totalPages) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index + 1,
      });
    }

    // setPageIndex(PageIndex + 1);
  };
  const reportDownloadHeader = [
    "Event Type",
    "Event Name",
    "User Name",
    "M Name",
    "Nation",
    "U Rate",
    "Amount",
    "PlaceDate",
    "Detail",
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={paginationData?.noOfRecords}
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
          {/* <div className="input-search" style={{ paddingRight: "10px" }}>
          <Input
            placeholder="search here....."
            name="message"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div> */}
        </div>
        {/* <h3>
          Total Soda: <span style={{ color: "green" }}>{sada}</span> Total
          Amount:<span style={{ color: "green" }}>{totalAmount}</span>
        </h3> */}
        <DownloadReport
          dataReport={data}
          header={reportDownloadHeader}
          reportType="SingleUserBetHistory"
          reportFile={"Single User Bet History"}
        />
      </div>
      <div style={{ height: "400px", overflowY: "scroll" }}>
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable currentBetTable"
          rowClassName={(record) => {
            return record?.isBack ? "blue" : "pink";
          }}
          pagination={{ pageSize: paginationData.noOfRecords }}
        />
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
    </div>
  );
};

export default PnlBetHistory;
