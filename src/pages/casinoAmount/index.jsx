/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
///styles
import { NavLink } from "react-router-dom";

import axios from "axios";

import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Button, Input, Modal, Select, Table } from "antd";
import { Casion_amount, Multiple_login } from "../../routes/Routes";
import { columns } from "./colums";
import { notifyToast } from "../../components/toast/Tost";
// import { columns } from "./Colums";
// import AddurlList from "./AddurlList";
// import ViewUrlList from "./ViewUrlList";

const CasinoAmount = () => {
  // const [loading, setLoading] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const [inputValue, setInputValue] = useState({});
  const [DataList, setDataList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  //////// change password

  ////edit profile State
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 10,
    totalPages: 1,
  });

  ///show profile modal

  const casinoAmount = async () => {
    setLoading((prev) => ({ ...prev, casinoAmount: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"api/getallBetValue"}`,
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
          res.data.data.map((res) => {
            setInputValue((prev) => {
              return {
                ...prev,
                [res.subAdminId]: {
                  aura: res.aura,
                  id: res.id,
                  currency: res.currency,
                  fantasyGames: res.fantasyGames,
                  qtech: res.qtech,
                  sportBook: res.sportBook,
                  supernowa: res.supernowa,
                },
              };
            });
          });
          // setInputValue((res) => {
          //   console.log(res, "k");
          // });
          // setInputValue(res?.data?.data?.map((item) => item.value));
        } else {
          setDataList([]);
          setInputValue([]);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, casinoAmount: false }));

    // setLoading(false);
  };

  useEffect(() => {
    casinoAmount();
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

  const dataSource = useMemo(
    () =>
      DataList?.map((curElm, index) => {
        return {
          key: `${curElm.appid} + ${curElm.userid} + ${index}`,
          appid: curElm?.userId,
          // userid: (
          //   <Input
          //     value={inputValue[index]}
          //     type="number"
          //     onChange={(e) =>
          //       setInputValue((o) => {
          //         const newO = { ...o };
          //         newO[index] = e.target.value;
          //         return newO;
          //       })
          //     }
          //     style={{ width: "100px" }}
          //   />
          // ),

          supernowa: (
            <Input
              value={inputValue[curElm.subAdminId].supernowa}
              type="number"
              onKeyDown={(e) => {
                if (e.key == ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      supernowa: Number(e.target.value),
                    },
                  };
                })
              }
              style={{ width: "100px" }}
            />
          ),
          aura: (
            <Input
              value={inputValue[curElm.subAdminId].aura}
              type="number"
              onKeyDown={(e) => {
                if (e.key == ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      aura: Number(e.target.value),
                    },
                  };
                })
              }
              style={{ width: "100px" }}
            />
          ),
          qtech: (
            <Input
              value={inputValue[curElm.subAdminId].qtech}
              type="number"
              onKeyDown={(e) => {
                if (e.key == ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      qtech: Number(e.target.value),
                    },
                  };
                })
              }
              style={{ width: "100px" }}
            />
          ),
          sportBook: (
            <Input
              value={inputValue[curElm.subAdminId].sportBook}
              type="number"
              onKeyDown={(e) => {
                if (e.key == ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      sportBook: Number(e.target.value),
                    },
                  };
                })
              }
              style={{ width: "100px" }}
            />
          ),
          currency: (
            <Input
              value={inputValue[curElm.subAdminId].currency}
              type="text"
              disabled
              onChange={(e) =>
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      currency: e.target.value,
                    },
                  };
                })
              }
              style={{ width: "100px" }}
            />
          ),
          fantasyGames: (
            <Input
              value={inputValue[curElm.subAdminId].fantasyGames}
              type="number"
              onKeyDown={(e) => {
                if (e.key == ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                setInputValue((prev) => {
                  return {
                    ...prev,
                    [curElm.subAdminId]: {
                      ...prev[curElm.subAdminId],
                      fantasyGames: Number(e.target.value),
                    },
                  };
                });
              }}
              style={{ width: "100px" }}
            />
          ),
          action: (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button
                style={{ background: "orange", color: "white", border: "none" }}
                onClick={() =>
                  casinoAmountUpdate(inputValue[curElm.subAdminId])
                }
                // onClick={() => {
                //   casinoAmountUpdate({ value: inputValue[index], id: curElm.id });
                // }}
                // disabled={
                //   inputValue[index] != curElm.value && inputValue[index] > 0
                //     ? false
                //     : true
                // }
              >
                Update
              </Button>
            </div>
          ),
        };
      }),
    [DataList, inputValue]
  );

  const casinoAmountUpdate = async (value) => {
    setLoading((prev) => ({ ...prev, casinoAmountUpdate: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"api/update_admin_Bet_value"}`,
        value,
        //   index: paginationData.index,
        //   noOfRecords: paginationData.noOfRecords,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          notifyToast().succes(res.data.message);
          casinoAmount();
        } else {
          notifyToast().error(res.data.message);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, casinoAmountUpdate: false }));

    // setLoading(false);
  };

  return (
    <>
      <div className="hading-create-accounts">
        <h4>Casino Amount</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Casion_amount} style={{ color: "#74788d" }}>
            Multi Login
          </NavLink>
        </p>
      </div>
      <div className="search">
        <label htmlFor="" style={{ display: "block", marginBlock: "10px" }}>
          Search User
        </label>
        {/* <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          onChange={handleChange}
          options={options}
        /> */}
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          style={{ width: "300px" }}
        />
      </div>
      <div style={{ paddingLeft: "5px", marginBlock: "10px" }}>
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
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
          </select>
          &nbsp;entries
        </label>
      </div>
      <div className="table">
        {/* <div style={{ paddingLeft: "5px" }}>
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
        </div> */}
        <Table
          columns={columns}
          dataSource={dataSource}
          className="accountTable"
          pagination={false}
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

export default CasinoAmount;
