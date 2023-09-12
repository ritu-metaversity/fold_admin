import { Button, DatePicker, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Create_Ledeger } from "../../routes/Routes";
import { notifyToast } from "../../components/toast/Tost";

const CreateLedeger = () => {
  const [activeSportData, setActiveSportData] = useState([]);
  const [sportId, setSportId] = useState("");
  const [sportList, setSportList] = useState([]);
  const [setSportListId, setSetSportListId] = useState("");
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
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"bmx/create-my-ledger"}`,
        {
          matchId: setSportListId,
          dateStr: dayjs(date).format("YYYY-MM-DD"),
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
  };
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Create Ledeger</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Create_Ledeger} style={{ color: "#74788d" }}>
            Create Ledeger
          </NavLink>
        </p>
      </div>
      <div className="rollback-div">
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
        <DatePicker onChange={onChange} defaultValue={date} />
        <Button
          style={{ background: "orange", border: "none", color: "white" }}
          onClick={() => createLedeger()}
        >
          Create Ledeger
        </Button>
      </div>
    </>
  );
};

export default CreateLedeger;
