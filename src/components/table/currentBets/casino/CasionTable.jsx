import { Button, Input, message, Radio, Select } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import CasionBetTable from "../../../casionCard/CasionBetTable";
import { LoaderContext } from "../../../../App";
import {
  Casino_Card_Data,
  Casiono,
  Get_View_Bets,
} from "../../../../routes/Routes";
export const UserModalContext = createContext({
  handleCancel: () => {},
});
const Casinotable = () => {
  const [searchText, setSearchText] = useState("");
  const { setLoading } = useContext(LoaderContext);

  const [radioValue, setRadioValue] = useState("matched");
  const [totalAmount, setTotalAmount] = useState("");
  const [sada, setsada] = useState("");
  const [sportsId, setSportsId] = useState([]);
  const [viewMoreData, setViewMoreData] = useState([]);
  const [sportChangeId, setSportChangeId] = useState("");
  const [sportsList, setSportsList] = useState([]);
  //////// change password

  ////edit profile State

  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  const CasionData = async () => {
    setLoading((prev) => ({ ...prev, bethistorytabledata: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casiono}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setsada(res?.data?.data?.totalBets);
        setTotalAmount(res?.data?.data?.totalStake);
        setSportsList(res?.data?.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, bethistorytabledata: false }));
  };

  useEffect(() => {
    CasionData();
  }, []);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        bethistorytabledata: false,
      }));
    };
  }, [setLoading]);
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

  //////first drop down value
  const handleChange = (value) => {
    //  console.log(value.key); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    gatSportsId(value.value);
  };

  // second dropdown value
  const sportChange = (value) => {
    setSportChangeId(value.value);
  };

  const gatSportsId = async (id) => {
    setLoading((prev) => ({ ...prev, bethistorygatSportsId: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casino_Card_Data}`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSportsId(res?.data?.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, bethistorygatSportsId: false }));
  };

  /////call api on load button

  const option1 = sportsList?.map((item, index) => ({
    key: item.id + item?.logo + index.name + index,
    value: item?.id,
    label: item?.name,
  }));

  const option2 = sportsId?.map((item, index) => ({
    key: item.gameId + item?.gameCode + item.gameName + index.imageUrl,
    value: item?.gameId,
    label: item?.gameName,
  }));
  const getSportsid = async (id) => {
    setLoading((prev) => ({ ...prev, viewmorebets: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Get_View_Bets}`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        message.success(res.data.message);
        setViewMoreData(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, viewmorebets: false }));
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
            <Select
              labelInValue
              defaultValue={{
                value: "",
                label: "Select match",
              }}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={option1}
            ></Select>

            <Select
              labelInValue
              defaultValue={{
                value: "",
                label: "Matchlist",
              }}
              style={{
                width: 120,
              }}
              onChange={sportChange}
              options={option2}
            ></Select>

            <div className="load-btn">
              <Button onClick={() => getSportsid(sportChangeId)}> load</Button>
            </div>
          </div>
          <div className="filter-Right-col">
            <h5>
              Total Soda: <span style={{ color: "green" }}>{sada}</span> Total
              Amount:<span style={{ color: "green" }}>{totalAmount}</span>
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
              value={paginationData?.noOfRecords}
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
        <CasionBetTable data={viewMoreData} />
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

export default Casinotable;
