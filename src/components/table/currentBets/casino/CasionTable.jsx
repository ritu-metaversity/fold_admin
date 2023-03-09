import { Button, Input, Table, Radio } from "antd";
import React, { createContext, useState } from "react";

///styles

export const UserModalContext = createContext({
  handleCancel: () => {},
});

const Casinotable = () => {
  const [searchText, setSearchText] = useState("");

  const [radioValue, setRadioValue] = useState("matched");
  const [radioValuefilte, setRadioValuefilter] = useState("All");
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

  // const tabledata = async () => {
  //   setLoading(true);
  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/${Table_ActiveUser}`,
  //       {
  //         id: "",
  //         index: paginationData.index,
  //         noOfRecords: paginationData.noOfRecords,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("api", res.data.data.dataList);
  //       if (res.data.data.dataList) {
  //         setLoading(false);
  //         setPaginationData({
  //           ...paginationData,
  //           totalPages: res.data.data?.totalPages || 1,
  //         });
  //         setDataList(res.data.data.dataList);
  //       } else {
  //         setDataList();
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.message == "Request failed with status code 401") {
  //         navigate("/");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   tabledata();
  // }, [paginationData.index, paginationData.noOfRecords]);

  const columns = [
    {
      title: "Event Type",
      dataIndex: "EventType",
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
          String(record.Nation).toLowerCase().includes(value.toLowerCase()) ||
          String(record.URate)
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          String(record.Amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.PlaceDate)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.IP).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Event Name",
      dataIndex: "EventName",
      sorter: {
        compare: (a, b) => a.CR - b.CR,
        multiple: 3,
      },
    },
    {
      title: "User Name",
      dataIndex: "UserName",
      sorter: {
        compare: (a, b) => a.PTS - b.PTS,
        multiple: 2,
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
      title: "IP",
      dataIndex: "IP",
      sorter: {
        compare: (a, b) => a.ust - b.ust,
        multiple: 1,
      },
    },
    {
      title: "Browser",
      dataIndex: "Browser",
      sorter: {
        compare: (a, b) => a.PPhone - b.PPhone,
        multiple: 1,
      },
    },

    {
      title: "Action",
      dataIndex: "Action",
    },
  ];

  const data = [];
  // DataList.map((res,index) => {
  //   if (res) {
  //     data.push({
  //       key: res.URate+res.IP+index,
  //       EventType: res.username,
  //       EventName: "Event Name",
  //       UserName: "User Name",

  //       Nation: "Nation",
  //       URate: "URate",
  //       Amount: "Amount",
  //       PlaceDate: "Place Date",
  //       IP: "IP",
  //       Browser: "Browser",
  //       Action: <Checkbox />,
  //     });
  //   } else {
  //     data.push({
  //       key: "",
  //       EventType: "",
  //       EventName: "",
  //       UserName: "",

  //       Nation: "",
  //       URate: "",
  //       Amount: "",
  //       PlaceDate: "",
  //       IP: "",
  //       Browser: "",
  //       Action: <Checkbox />,
  //     });
  //   }
  // });

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
          <div className="filter-left-col" style={{ opacity: "0" }}>
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
              checked={radioValuefilte === "All"}
              onChange={() => setRadioValuefilter("All")}
            >
              All
            </Radio>
            <Radio
              checked={radioValuefilte === "Back"}
              onChange={() => setRadioValuefilter("Back")}
            >
              Back
            </Radio>
            <Radio
              checked={radioValuefilte === "Lay"}
              onChange={() => setRadioValuefilter("Lay")}
            >
              Lay
            </Radio>
            <div className="load-btn">
              <Button> load</Button>
            </div>
          </div>
          <div className="filter-Right-col">
            <h5>Total Soda: 0 Total Amount: 0.00</h5>
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
              <option value="2">2</option>
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
        <Table columns={columns} dataSource={data} className="accountTable" />
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
