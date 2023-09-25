import { Button, Input, Switch } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../App";

const CasinoLock = ({ userData }) => {
  const [casinoData, setCasinoData] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [dataw, setData] = useState({
    isAuraAllowed: true,
    isSuperNovaAllowed: true,
    isQTechAllowed: true,
    isVirtualAllowed: true,
    isSportBookAllowed: true,
    lupassword: "",
    liveCasinoLock: false,
    userId: userData.userId,
  });

  const submitCasinoLock = async (e) => {
    if (dataw.lupassword) {
      setPasswordError(false);
      setLoading((prev) => ({ ...prev, submitCasinoLock: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${"user/update-casino-lock"}`,

          dataw,
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
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, submitCasinoLock: false }));
    } else {
      setPasswordError(true);
    }
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
        res?.data?.data.map((res) => {
          setData((prev) => {
            return {
              ...prev,
              [`is${res.casinoName}Allowed`]: res.casinoLock,
            };
          });
        });
      })
      .catch((error) => {});
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
                  checked={!dataw[`is${res.casinoName}Allowed`]}
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        [`is${res.casinoName}Allowed`]: !e,
                      };
                    })
                  }
                />
              </div>
            </div>
          );
        })}

        <div className="row-1">
          <label>
            <Input
              placeholder="Transaction Password"
              type="password"
              style={{ border: passwordError && "1px solid red" }}
              onChange={(e) => {
                if (e.target.value) {
                  setPasswordError(false);
                } else {
                  setPasswordError(true);
                }
                setData((prev) => {
                  return {
                    ...prev,
                    lupassword: e.target.value,
                  };
                });
              }}
            />
          </label>
          <div className="input" style={{ justifyContent: "left !important" }}>
            <Button
              style={{ backgroundColor: "#23292e", color: "white" }}
              onClick={() => submitCasinoLock()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoLock;
