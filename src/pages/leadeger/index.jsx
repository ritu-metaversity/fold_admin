import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create_Ledeger2 } from "../../routes/Routes";
import axios from "axios";
import dayjs from "dayjs";
import { Button, Checkbox, DatePicker, Input, Select, Table, Tabs } from "antd";
import "./styles.scss";
import { notifyToast } from "../../components/toast/Tost";

const Leadeger = () => {
  const [activeSportData, setActiveSportData] = useState([]);
  const [sportId, setSportId] = useState(4);
  const [lederData, setLederData] = useState([]);
  const [isLedgerCreated, setIsLedgerCreated] = useState("");
  const [mathIdData, setMathIdData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 10,
    totalPages: 1,
  });
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  const handleChange = (key) => {
    setSportId(key);
  };
  const createLedeger = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bmx/report/event-for-ledger"}`,
        // `${"http://192.168.0.142/admin-new-apis"}/${"bmx/report/event-for-ledger"}`,

        {
          index: paginationData.index,
          noOfRecords: paginationData.noOfRecords,
          isLedgerCreated: isLedgerCreated || false,
          sportId: sportId,
          date: date,
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
    date,
    paginationData.index,
    paginationData.noOfRecords,
  ]);
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
      Action: !(
        res?.isLedgerCreateRequested ||
        res.sportId == 4 ||
        res?.isLedgerCreated
      ) ? (
        <Checkbox
          checked={mathIdData.includes(res.matchid)}
          onChange={(e) =>
            setMatchId({ value: e.target.checked, matchId: res.matchid })
          }
        ></Checkbox>
      ) : (
        ""
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
      title: "Mongo Bet",
      dataIndex: "mongoBetCount",
      key: "mongoBetCount",
    },
    {
      title: "MySql Bet",
      dataIndex: "mySqlBetCount",
      key: "mySqlBetCount",
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

  const setMatchId = (id) => {
    const { matchId } = id;
    const { value } = id;

    if (value) {
      setMathIdData((prev) => {
        return [...prev, matchId];
      });
    } else {
      const matchIdData1 = [...mathIdData];
      let value2 = matchIdData1?.find((curElm) => curElm == matchId);
      let indexval = matchIdData1.indexOf(value2);
      matchIdData1.splice(indexval, 1);
      setMathIdData(matchIdData1);
    }
  };

  const createLedegerSubmit = async () => {
    if (!password) {
      return setPasswordError(true);
    } else if (!mathIdData.length) {
      return notifyToast().error("Please Select Atleast Once");
    } else {
      await axios
        .post(
          `${
            process.env.REACT_APP_BASE_URL
          }/${"bmx/report/request-event-ledger"}`,
          {
            matchIds: mathIdData,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data?.status) {
            setMathIdData([]);
            createLedeger();
            notifyToast().succes(res.data?.message);
          }
        })
        .catch((error) => {
          console.log("outer");
        });
    }
  };

  const items = activeSportData?.map((item) => {
    return {
      label: item?.sportName,
      key: item?.sportId,
      children: <Table dataSource={dataSource} columns={columns} />,
    };
  });
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
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Leadeger</h4>
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
          <form>
            <DatePicker
              onChange={onChange}
              style={{
                width: 160,
              }}
            />
          </form>
        </div>
        <div className="leader-filter-right-col">
          <Input
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
          </Button>
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
        <Tabs onChange={handleChange} type="card" items={items} />
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

export default Leadeger;
