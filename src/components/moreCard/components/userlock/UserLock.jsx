import React, { useState } from "react";
import { Button, Switch } from "antd";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { User_Lock_Api } from "../../../../routes/Routes";
import { notifyToast } from "../../../toast/Tost";
///styles
// import './styles.scss'

const UserLock = ({ Apifun, data, handleCancelfunction }) => {
  const [error, setError] = useState(false);
  const [userLockData, setUserLockData] = useState({
    userId: data?.userId,
    betLock: data?.betLock,
    accountLock: data?.accountLock,
    isactive: true,
    liveCasinoLock: false,
    virtualCasinoLock: false,
    lupassword: "",
  });
  const submitUserLockData = async () => {
    if (!userLockData.lupassword) {
      setError(!Boolean(userLockData.lupassword));
      return notifyToast().error("Please Enter Transaction Code");
    }
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${User_Lock_Api}`,
        userLockData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          console.log("this ran");
          handleCancelfunction();
          Apifun();
          return notifyToast().succes(res.data.message);
        }
      })
      .catch((error) => {
        setUserLockData((prev) => {
          return {
            ...prev,
            betLock: data.betLock,
            accountLock: data?.accountLock,
          };
        });
      });
  };
  const onChange = (checked) => {
    const name = checked.name;
    const value = checked.value;
    if (name === "betLock") {
      setUserLockData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (name === "accountLock")
      setUserLockData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
  };
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <div className="row-1">
          <label>Bet lock</label>
          <div className="input" style={{ justifyContent: "left !important" }}>
            <Switch
              size="small"
              name="betLock"
              checked={userLockData.betLock}
              onChange={(e) => onChange({ value: e, name: "betLock" })}
            />
          </div>
        </div>
        <div className="row-1">
          <label>User lock</label>
          <div className="input">
            <Switch
              size="small"
              name="accountLock"
              checked={userLockData.accountLock}
              onChange={(e) => onChange({ value: e, name: "accountLock" })}
            />
          </div>
        </div>
        <div className="row-1">
          <label>Transaction Code</label>
          <div className="input">
            <input
              type="password"
              id="pwd"
              style={{
                width: "100%",
                textAlign: "left",
                border: error ? "1px solid red" : "1px solid gray",
              }}
              placeholder="Transaction Code"
              onChange={(e) => {
                setError(!Boolean(e.target.value));
                setUserLockData((prev) => {
                  return {
                    ...prev,
                    lupassword: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
        <div className="row-button">
          <Button
            style={{ background: "black", borderColor: "black" }}
            onClick={submitUserLockData}
          >
            Submit
            <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserLock;
