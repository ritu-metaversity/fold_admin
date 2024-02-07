import { Button, Select } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { setCommision } from "../../routes/Routes";
import axios from "axios";
import { notifyToast } from "../../components/toast/Tost";
const commissionList = [
  {
    label: "0.00",
    value: "0.00",
  },
  {
    label: "0.25",
    value: "0.25",
  },
  { label: "0.50", value: "0.50" },
  { label: "0.75", value: "0.75" },
  { label: "1.00", value: "1.00" },
  { label: "1.25", value: "1.25" },
  { label: "1.50", value: "1.50" },
  { label: "1.75", value: "1.75" },
  { label: "2.00", value: "2.00" },
];
const SetCommission = () => {
  const [commsion, setCommsion] = useState({
    fancyCommission: 0,
    oddsCommission: 0,
    casinoCommission: 0,
  });
  const [error, setError] = useState({
    fancyCommission: 0,
    oddsCommission: 0,
    casinoCommission: 0,
  });
  const setCommission = () => {
    axios
      .post(
        `${
          import.meta.env.VITE_BASE_URL
        }/${"commission-set-subadmin/set-commission"}`,
        commsion,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          notifyToast().succes(res.data.message);
        } else {
          notifyToast().error(res.data.message);
        }
       
      })
      .catch((error) => {
        
        console.log(error);
      });
  };

  const onSumbit = () => {
    let isSuccess = false;
    for (const key of Object.keys(commsion)) {
      setError((prev) => {
        return { ...prev, [key]: Boolean(!commsion[key]) };
      });
    }
    for (const key of Object.keys(commsion)) {
      const value = Boolean(commsion[key]);
      if (!value) {
        isSuccess = false;
        break;
      } else {
        isSuccess = true;
      }
    }
    if (isSuccess) {
      setCommission();
    }
  };

  const selecthandler = (name, value) => {
    if (!value) {
      setError((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else if (value) {
      setCommsion((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setCommsion((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Set Commission</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={setCommision} style={{ color: "#74788d" }}>
            Set Commission
          </NavLink>
        </p>
      </div>
      <div style={{}} className="rollback-div">
        <Select
          // defaultValue="lucy"
          value={commsion.fancyCommission || "Select FancyCommission"}
          style={{
            width: 160,
            border: error.fancyCommission && "1px solid red",
          }}
          onChange={(e) => selecthandler("fancyCommission", e)}
          options={commissionList}
        />
        <Select
          // defaultValue="lucy"
          value={commsion.oddsCommission || "Select OddsCommission"}
          style={{
            width: 160,
            border: error.oddsCommission && "1px solid red",
          }}
          onChange={(e) => selecthandler("oddsCommission", e)}
          options={commissionList}
        />
        <Select
          // defaultValue="lucy"
          value={commsion.casinoCommission || "Select CasinoCommission"}
          style={{
            width: 160,
            border: error.casinoCommission && "1px solid red",
          }}
          onChange={(e) => selecthandler("casinoCommission", e)}
          options={commissionList}
        />

        <Button
          style={{ background: "orange", border: "none", color: "white" }}
          onClick={() => onSumbit()}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default SetCommission;
