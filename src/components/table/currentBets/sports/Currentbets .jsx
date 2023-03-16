/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Table, Tooltip, Radio } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
///styles
import "./styles.scss";

// import DepositForm from "../../components/modalForm/DepositForm";
// import MoreCard from "../../components/moreCard/MoreCard";
// import Widrawal from "../../components/modalForm/Widrawal";
// import CreditModal from "../../components/creditActivityModal/CreditModal";
import axios from "axios";

import { Tab_CurrentBet } from "../../../../routes/Routes";

import { LoaderContext } from "../../../../App";

export const UserModalContext = createContext({
  handleCancel: () => {},
});

const CurrentBetsTable = () => {
  const [searchText, setSearchText] = useState("");

  const { setLoading } = useContext(LoaderContext);

  const [DataList, setDataList] = useState([]);

  const [radioValue, setRadioValue] = useState("matched");
  const [radioValuefilte, setRadioValuefilter] = useState("1");
  const [totalAmount, setTotalAmount] = useState("");
  const [sada, setsada] = useState("");
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  //////deposit Modal

  //////withdrawal Modal

  ///show profile modal

  const tabledata = async () => {
    setLoading((prev) => ({ ...prev, currentBettabledata: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Tab_CurrentBet}`,
        {
          betType: radioValuefilte,
          noOfRecords: paginationData.noOfRecords,
          sportType: 1,
          index: paginationData.index,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setsada(res.data.data.totalBets);
        setTotalAmount(res.data.data.totalStake);

        if (res?.data?.data?.dataList) {
          setPaginationData({
            ...paginationData,
            totalPages: res.data.data?.totalPages || 1,
          });
          setDataList(res.data.data.dataList);
        } else {
          setDataList();
        }
      })
      .catch((error) => {
        // message.error(error.response?.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        //   message.error(error.response?.data.message);
        // }
      });
    setLoading((prev) => ({ ...prev, currentBettabledata: false }));
  };

  useEffect(() => {
    tabledata();
  }, [radioValuefilte, paginationData.index, paginationData.noOfRecords]);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        currentBettabledata: false,
      }));
    };
  }, []);
  const columns = [
    {
      title: "Event Type",
      dataIndex: "EventType",
    },
    {
      title: "Event Name",
      dataIndex: "EventName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.EventType)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.EventName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.UserName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.MName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Nation)
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          String(record.URate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.PlaceDate).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: {
        compare: (a, b) => a.CR - b.CR,
        multiple: 3,
      },
    },
    {
      title: "User Name",
      dataIndex: "UserName",
      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //   return record.UserName.toLowerCase().includes(value.toLowerCase());
      // },
      sorter: {
        compare: (a, b) => a.PTS - b.PTS,
        multiple: 2,
      },
    },
    {
      title: "M Name",
      dataIndex: "MName",
      sorter: {
        compare: (a, b) => a.Client - b.Client,
        multiple: 1,
      },
    },
    {
      title: "Nation",
      dataIndex: "Nation",
      sorter: {
        compare: (a, b) => a.Clientp - b.Clientp,
        multiple: 1,
      },
    },
    {
      title: "U Rate",
      dataIndex: "URate",
      sorter: {
        compare: (a, b) => a.Exposer - b.Exposer,
        multiple: 1,
      },
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: {
        compare: (a, b) => a.Available - b.Available,
        multiple: 1,
      },
    },
    {
      title: "Place Date",
      dataIndex: "PlaceDate",
      sorter: {
        compare: (a, b) => a.bst - b.bst,
        multiple: 1,
      },
    },
    {
      title: "Detail",
      dataIndex: "Detail",
      sorter: {
        compare: (a, b) => a.ust - b.ust,
        multiple: 1,
      },
    },
  ];

  const data = DataList?.map((res, index) => {
    return {
      key: res?.rate + res.time + index,
      isBack: res?.isback,
      EventType: res?.eventType,
      EventName: res?.eventNamem,
      UserName: res?.username,
      MName: res?.marketname,
      Nation: res?.nation,
      URate: res?.rate,
      Amount: res?.amount,
      PlaceDate: res?.time,

      Detail: (
        <>
          <Tooltip title={res.deviceInfo}>
            <AiFillEye style={{ fontSize: "18px", cursor: "pointer" }} />
          </Tooltip>
        </>
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
    <>
      <div className="table" style={{ width: "100%" }}>
        <div className="current-bets-filter">
          <div className="filter-left-col">
            <Radio
              checked={radioValue === "matched"}
              onChange={() => setRadioValue("matched")}
            >
              Matched
            </Radio>
            <Radio
              checked={radioValue === "Deleted"}
              onChange={() => setRadioValue("Deleted")}
            >
              Deleted
            </Radio>
          </div>
          <div className="filter-Middle-col">
            <Radio
              checked={radioValuefilte === "1"}
              onClick={() => {
                setRadioValuefilter("1");
                // getTableData()
              }}
            >
              All
            </Radio>
            <Radio
              checked={radioValuefilte === "2"}
              onChange={() => setRadioValuefilter("2")}
            >
              Back
            </Radio>
            <Radio
              checked={radioValuefilte === "3"}
              onChange={() => setRadioValuefilter("3")}
            >
              Lay
            </Radio>
            {/* <div className="load-btn">
              <Button> load</Button>
            </div> */}
          </div>
          <div className="filter-Right-col">
            <h5>
              Total Soda: <span style={{ color: "green" }}>{sada}</span> Total
              Amount: <span style={{ color: "green" }}>{totalAmount}</span>
            </h5>
          </div>
        </div>
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
              <option value="750">750</option>
              <option value="1000">1000</option>
            </select>
            &nbsp;entries
          </label>
          <div className="input-search" style={{ paddingRight: "10px" }}>
            <Input
              placeholder="search here....."
              name="message"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="accountTable currentBetTable"
          rowClassName={(record) => {
            return record.isBack ? "blue" : "pink";
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
    </>
  );
};

export default CurrentBetsTable;
