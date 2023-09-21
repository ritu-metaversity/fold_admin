import { Button, Switch } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../App";

const CasinoLock = ({ userData }) => {
  const [casinoData, setCasinoData] = useState([]);
  const { setLoading } = useContext(LoaderContext);
  //   /user/get-casino-bet-lock
  // {"userId":"asdf"}
  const submitCasinoLock = async (e) => {
    let { value } = e;
    let { casinoId } = e;
    setLoading((prev) => ({ ...prev, submitCasinoLock: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"user/update-casino-lock"}`,
        { isCainoLock: value, userId: userData.userId, casinoId: casinoId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          submitUserLockData();
        }
      })
      .catch((error) => {
        // setUserLockData((prev) => {
        //   return {
        //     ...prev,
        //     betLock:,
        //     accountLock: ,
        //   };
        // });
      });
    setLoading((prev) => ({ ...prev, submitCasinoLock: false }));
  };
  const submitUserLockData = async () => {
    setLoading((prev) => ({ ...prev, submitUserLockData: true }));
    await axios
      .post(
        // "http://192.168.68.101/pw/update-bet-account-status",
        `${process.env.REACT_APP_BASE_URL}/${"user/get-casino-bet-lock"}`,
        { userId: userData.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCasinoData(res?.data?.data);
      })
      .catch((error) => {
        // setUserLockData((prev) => {
        //   return {
        //     ...prev,
        //     betLock:,
        //     accountLock: ,
        //   };
        // });
      });
    setLoading((prev) => ({ ...prev, submitUserLockData: false }));
  };
  useEffect(() => {
    submitUserLockData();
  }, []);
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        {casinoData?.map((res) => {
          return (
            <div className="row-1">
              <label>{res.casinoName}</label>
              <div
                className="input"
                style={{ justifyContent: "left !important" }}
              >
                <Switch
                  size="small"
                  name={res.casinoName}
                  checked={res.casinoLock}
                  onChange={(e) =>
                    submitCasinoLock({ value: e, casinoId: res.casinoId })
                  }
                />
              </div>
            </div>
          );
        })}
        {/* <div className="row-1">
          <label>VirtualCasino</label>
          <div className="input">
            <Switch
              size="small"
              name="virtualCasino"
              checked={data.virtualCasino}
              onChange={(e) =>
                handleChange({ value: e, name: "virtualCasino" })
              }
            />
          </div>
        </div>
        <div className="row-1">
          <label>SuperNova</label>
          <div className="input">
            <Switch
              size="small"
              name="superNova"
              checked={data.superNova}
              onChange={(e) => handleChange({ value: e, name: "superNova" })}
            />
          </div>
        </div>
        <div className="row-1">
          <label>Qtech</label>
          <div className="input">
            <Switch
              size="small"
              name="qtech"
              checked={data.qtech}
              onChange={(e) => handleChange({ value: e, name: "qtech" })}
            />
          </div>
        </div> */}
        {/* <div className="row-1">
          <label>Live Casino Lock</label>
          <div className="input">
            <Switch
              size="small"
              name="liveCasinoLock"
              checked={userLockData.liveCasinoLock}
              onChange={(e) => onChange({ value: e, name: "liveCasinoLock" })}
            />
          </div>
        </div> */}

        {/* <div className="row-button">
          <Button
            style={{ background: "black", borderColor: "black" }}
            onClick={onSumbit}
          >
            Submit
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default CasinoLock;
