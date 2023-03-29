/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Radio } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import { Bet_Search } from "../../routes/Routes";
import "./styles.scss";
import TableComponent from "./Table";
const ModalViewMore = ({ keyName }) => {
  const [activeClass, setActiveClass] = useState(false);
  const [viewMoreTable, setViewMoreTable] = useState([]);
  const [search, setSearch] = useState({});
  const [searchparam] = useSearchParams();
  const [totalAmount, setTotalAmount] = useState("");
  const [totalSoda, setTotalSoda] = useState("");
  const id = searchparam.get("event-id");
  const { setLoading } = useContext(LoaderContext);
  const [value, setValue] = useState(1);
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    // totalPages: 1,
  });
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const data = {
    matchId: id,
    amountFrom: search.amountFrom ? search.amountFrom : 0,
    amountTo: search.amountTo ? search.amountTo : 0,
    ipAddres: search.ip ? search.ip : "",
    marketName: keyName,
    username: search.userName ? search.userName : "",
    betType: value,
    index: paginationData.index,
    noOfRecords: paginationData.noOfRecords,
  };
  const viewMoreTabledata = async (data) => {
    setLoading((prev) => ({ ...prev, viewMoreTabledata: true }));
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Bet_Search}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // setSearch({});
        setTotalAmount(res?.data?.data?.totalAmount);
        setTotalSoda(res?.data?.data?.totalBet);

        if (res?.data?.data?.betList) {
          setPaginationData({
            ...paginationData,
            totalPages: res?.data?.data?.totalPages || 1,
          });
          setViewMoreTable(res?.data?.data?.betList);
        } else {
          setViewMoreTable();
        }
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, viewMoreTabledata: false }));
  };

  useEffect(() => {
    viewMoreTabledata(data);
  }, [value, paginationData.index, paginationData.noOfRecords]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "ip") {
      var regex = new RegExp(/^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g);
      // /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g
      if (regex.test(value)) {
        setSearch((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        return;
      }
    }
    setSearch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        viewMoreTabledata: false,
      }));
    };
  }, [setLoading]);
  const ResetCounter = () => {
    setPaginationData({ ...paginationData, index: 0 });
  };
  const LastCounter = () => {
    setPaginationData({
      ...paginationData,
      index: paginationData.totalPages - 1,
    });
  };
  const Decrement = () => {
    if (paginationData.index > 0) {
      setPaginationData({ ...paginationData, index: paginationData.index - 1 });
    }
    // setPageIndex(PageIndex - 1);
  };
  const Increment = () => {
    if (paginationData.index < paginationData.totalPages) {
      setPaginationData({ ...paginationData, index: paginationData.index + 1 });
    }

    // setPageIndex(PageIndex + 1);
  };
  return (
    <div>
      <div className="view-more-header">
        <Button
          className={activeClass ? "" : "active-btn"}
          onClick={() => setActiveClass(false)}
        >
          Matched Bets
        </Button>
        {/* <Button
          className={activeClass ? "active-btn" : ""}
          onClick={() => setActiveClass(true)}
        >
          Deleted Bets
        </Button> */}
      </div>
      <div className="Body">
        <div className="search-filter">
          <div className="user-name-input">
            <label>
              <p>Username</p>
            </label>
            <input
              type="text"
              placeholder=" Search Username"
              name="userName"
              onChange={handleChange}
              value={search?.userName || ""}
            />
          </div>
          <div className="form-to">
            <div className="amount-from-input">
              <label>
                <p>Amount From</p>
              </label>
              <input
                type="number"
                placeholder="Amount From"
                name="amountFrom"
                onChange={handleChange}
                value={search?.amountFrom || ""}
              />
            </div>
            <div className="amount-to-input">
              <label>
                <p>Amount To</p>
              </label>
              <input
                type="number"
                placeholder="Amount To"
                name="amountTo"
                onChange={handleChange}
                value={search?.amountTo || ""}
              />
            </div>
          </div>
          <div className="ip-addres-input">
            <label>
              <p>IP Address</p>
            </label>

            <input
              type="text"
              placeholder="IP Address"
              name="ip"
              onChange={handleChange}
              value={search?.ip || ""}
            />
          </div>
          <div className="btn">
            <Button className="search" onClick={() => viewMoreTabledata(data)}>
              Search
            </Button>
            <Button
              className="reset"
              onClick={() => {
                setSearch({});
                setValue(1);
                viewMoreTabledata({
                  amountFrom: 0,
                  amountTo: 0,
                  betType: 1,
                  ipAddres: "",
                  marketName: keyName,
                  matchId: id,
                  username: "",
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="radio-filter">
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>All</Radio>
            <Radio value={2}>Back</Radio>
            <Radio value={3}>Lay</Radio>
          </Radio.Group>
          <p>
            Total Soda: <span style={{ color: "green" }}>{totalSoda}</span>{" "}
            Total Amount:
            <span style={{ color: "green" }}>{totalAmount}</span>
          </p>
        </div>
        <div style={{ paddingLeft: "5px" }}>
          <label
            className="d-inline-flex align-items-center"
            style={{
              justifyContent: "end",
              display: "flex",
              marginRight: "20px",
            }}
          >
            Show&nbsp;
            <select
              className="custom-select-sm"
              style={{ width: "50px" }}
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
              <option value="20000">20000</option>
            </select>
            &nbsp;entries
          </label>
        </div>
        <div className="table-col">
          <TableComponent data={viewMoreTable} />
        </div>
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

export default ModalViewMore;
