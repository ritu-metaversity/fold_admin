import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create_Casino } from "../../routes/Routes";
import { Button, DatePicker, Input, Select, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { notifyToast } from "../../components/toast/Tost";

const CreateCasino = () => {
  const [activeSportData, setActiveSportData] = useState([]);
  const [sportId, setSportId] = useState("");
  const [sportList, setSportList] = useState([]);
  const [setSportListId, setSetSportListId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [lederData, setLederData] = useState([]);
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

  // const getSportLsit = async (value) => {
  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/${"sport/event-detail-sport-wise"}`,
  //       { sportId: value },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setSportList(res?.data?.data);
  //     });
  // };

  const handleChange = (value) => {
    setSetSportListId(value);
    // getSportLsit(value);
  };
  const handleChange2 = (value) => {};

  const option = [
    {
      value: "323334",
      label: "Aura",
    },
    {
      value: "323338",
      label: "SuperNova",
    },
  ];
  // const optionSport = sportList?.map((res) => {
  //   return {
  //     value: res?.eventId,
  //     label: res?.eventName,
  //   };
  // });
  const [date, setDate] = useState(dayjs());
  const onChange = (date, dateString) => {
    setDate(dateString);
    // console.log(date, dateString);
  };

  const createLedeger = async () => {
    if (password) {
      await axios
        .post(
          // `${process.env.REACT_APP_BASE_URL}/${"bmx/create-my-ledger"}`,
          "https://ledger.247idhub.com/bmx/ledger/create-my-ledger",

          {
            matchId: setSportListId,
            dateStr: dayjs(date).format("YYYY-MM-DD"),
            userId: localStorage.getItem("userid"),
            password: password,
            isCasino: true,
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

  return (
    <>
      <div className="hading-create-accounts">
        <h4>Create Casino Ledger</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Create_Casino} style={{ color: "#74788d" }}>
            Create Casino Ledger
          </NavLink>
        </p>
      </div>
      <div className="rollback-div">
        <Select
          // defaultValue="lucy"
          value={setSportListId || "Select Casino"}
          style={{
            width: 160,
          }}
          onChange={handleChange}
          options={option}
        />
        {/* <Select
          // defaultValue="lucy"
          value={setSportListId || "Select Sport List"}
          style={{
            width: 160,
          }}
          onChange={handleChange2}
          options={optionSport}
        /> */}
        <form>
          <DatePicker onChange={onChange} defaultValue={date} />
        </form>
        <Input
          placeholder="Transaction Password"
          style={{
            width: "200px",
            border: passwordError && "1px solid red",
          }}
          type="password"
          value={password}
          onChange={passwordHandler}
        />
        <Button
          style={{ background: "orange", border: "none", color: "white" }}
          onClick={() => createLedeger()}
        >
          Create Ledger
        </Button>
      </div>
    </>
  );
};

export default CreateCasino;
