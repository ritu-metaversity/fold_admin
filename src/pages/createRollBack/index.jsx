import { Button, DatePicker, Input, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create_RollBack } from "../../routes/Routes";
import dayjs from "dayjs";
import "./styles.scss";
import { notifyToast } from "../../components/toast/Tost";
const CreateRollBack = () => {
  const [activeSportData, setActiveSportData] = useState([]);
  const [sportId, setSportId] = useState("");
  const [sportList, setSportList] = useState([]);

  const [setSportListId, setSetSportListId] = useState("");
  const [password, setPassword] = useState("");
  const [lederData, setLederData] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 10,
    totalPages: 1,
  });
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
  }, []);

  const getSportLsit = async (value) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"sport/event-detail-sport-wise"}`,
        { sportId: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSportList(res?.data?.data);
      });
  };

  const handleChange = (value) => {
    setSportId(value);
    getSportLsit(value);
  };
  const handleChange2 = (value) => {
    setSetSportListId(value);
  };

  const option = activeSportData?.map((res) => {
    return {
      value: res?.sportId,
      label: res?.sportName,
    };
  });
  const optionSport = sportList?.map((res) => {
    return {
      value: res?.eventId,
      label: res?.eventName,
    };
  });
  const [date, setDate] = useState(dayjs());
  const onChange = (date, dateString) => {
    setDate(dateString);
    // console.log(date, dateString);
  };

  const createLedeger = async () => {
    if (password) {
      await axios
        .post(
          // "https://ledger.247idhub.com/bmx/ledger/rollback-ledger",
          `${process.env.REACT_APP_BASE_URL}/${"bmx/rollback-ledger"}`,
          {
            matchId: setSportListId,
            dateStr: dayjs(date).format("YYYY-MM-DD"),
            userId: localStorage.getItem("userid"),
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          notifyToast().succes(res.data?.message);
        });
    } else {
      setPasswordError(true);
    }
  };

  const passwordHandler = (e) => {
    let value = e.target.value;
    if (value) {
      setPasswordError(false);
      setPassword(value);
    } else {
      setPasswordError(true);
      setPassword(value);
    }
  };

  const dataSource = lederData?.map((res) => {
    // setCheck(
    //   !res?.isLedgerCreateRequested || res.sportId == 4 || res?.isLedgerCreated
    //     ? true
    //     : false
    // );
    return {
      matchName: res?.matchName,
      matchid: res.matchid,
      isactive: res.isactive ? "Active" : "In Active",
      isLedgerCreateRequested: res?.isLedgerCreated ? "Yes" : "No",
      mongoBetCount: res?.mongoBetCount,
      mySqlBetCount: res?.mySqlBetCount,
      Date: res?.matchStartDate,
      // Action: !(
      //   res?.isLedgerCreateRequested ||
      //   res.sportId == 4 ||
      //   res?.isLedgerCreated
      // ) ? (
      //   <Checkbox
      //     checked={mathIdData.includes(res.matchid)}
      //     onChange={(e) =>
      //       setMatchId({ value: e.target.checked, matchId: res.matchid })
      //     }
      //   ></Checkbox>
      // ) : (
      //   ""
      // ),
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
      title: "Mongo Bet",
      dataIndex: "mongoBetCount",
      key: "mongoBetCount",
    },
    {
      title: "MySql Bet",
      dataIndex: "mySqlBetCount",
      key: "mySqlBetCount",
    },
  ];

  const Increment = () => {
    if (paginationData.index + 1 < paginationData.totalPages) {
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
  const createLedege = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bmx/report/event-for-ledger"}`,
        // `${"http://192.168.0.142/admin-new-apis"}/${"bmx/report/event-for-ledger"}`,

        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          // isLedgerCreated: isLedgerCreated || false,
          sportId: sportId,
          matchId: setSportListId,
          date: null,
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

  useEffect(() => {
    createLedege();
  }, [
    paginationData.index,
    paginationData.noOfRecords,
    sportId,
    date,
    setSportListId,
  ]);
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Create RollBack</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Create_RollBack} style={{ color: "#74788d" }}>
            Create RollBack
          </NavLink>
        </p>
      </div>
      <div style={{}} className="rollback-div">
        <Select
          // defaultValue="lucy"
          value={sportId || "Select Sport"}
          style={{
            width: 160,
          }}
          onChange={handleChange}
          options={option}
        />
        <Select
          // defaultValue="lucy"
          value={setSportListId || "Select Sport List"}
          style={{
            width: 160,
          }}
          onChange={handleChange2}
          options={optionSport}
        />
        <form>
          <DatePicker onChange={onChange} defaultValue={date} />
        </form>
        <Input
          placeholder="Transaction Password"
          style={{ width: "200px", border: passwordError && "1px solid red" }}
          value={password}
          onChange={passwordHandler}
          type="password"
        />
        <Button
          style={{ background: "orange", border: "none", color: "white" }}
          onClick={() => createLedeger()}
        >
          Roll Back
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
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

export default CreateRollBack;
