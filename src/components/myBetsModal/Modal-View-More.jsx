import { Button, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bet_Search } from "../../routes/Routes";
import "./styles.scss";
import TableComponent from "./Table";
const ModalViewMore = ({ keyName }) => {
  console.log(keyName, "keename");
  const [activeClass, setActiveClass] = useState(false);
  const [viewMoreTable, setViewMoreTable] = useState([]);
  const [search, setSearch] = useState({});
  const [searchparam] = useSearchParams();

  const id = searchparam.get("event-id");

  const [value, setValue] = useState(1);
  const [loading, setloading] = useState(false);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
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
  };
  const viewMoreTabledata = async () => {
    setloading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Bet_Search}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setViewMoreTable(res.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  useEffect(() => {
    viewMoreTabledata();
  }, [value]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
              value={search.userName || ""}
            />
          </div>
          <div className="form-to">
            <div className="amount-from-input">
              <label>
                <p>Amount From</p>
              </label>
              <input
                type="text"
                placeholder="Amount From"
                name="amountFrom"
                onChange={handleChange}
                value={search.amountFrom || ""}
              />
            </div>
            <div className="amount-to-input">
              <label>
                <p>Amount To</p>
              </label>
              <input
                type="text"
                placeholder="Amount To"
                name="amountTo"
                onChange={handleChange}
                value={search.amountTo || ""}
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
              value={search.ip || ""}
            />
          </div>
          <div className="btn">
            <Button className="search" onClick={viewMoreTabledata}>
              Search
            </Button>
            <Button
              className="reset"
              onClick={() => {
                console.log("ran");
                setSearch({});
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
            Total Soda: <span>1</span> Total Amount: <span>100.00</span>
          </p>
        </div>
        <div className="table-col">
          <TableComponent data={viewMoreTable} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ModalViewMore;
