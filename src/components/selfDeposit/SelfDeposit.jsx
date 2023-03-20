import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
// import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Admin_Self_Deposit } from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";

const SelfDepositForm = ({ handleCancel }) => {
  const { setLoading, userBalance } = useContext(LoaderContext);

  const [data, setData] = useState({
    amount: "",
    lupassword: "",
  });

  const [error, setError] = useState({
    lupassword: false,
    amount: false,
  });
  ////////image

  //////////////

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (!value) {
      setError(() => {
        return {
          ...error,
          [name]: true,
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setData(() => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    if (data.amount && data.lupassword) {
      setLoading((prev) => ({ ...prev, selfDeposit: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Admin_Self_Deposit}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          notifyToast().succes(res.data.message);
          setData({});
          handleCancel();
          userBalance();
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, selfDeposit: false }));
    } else {
      setError({
        ...error,
        amount: !Boolean(data.amount),
        lupassword: !Boolean(data.lupassword),
      });
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        selfDeposit: false,
      }));
    };
  }, [setLoading]);
  return (
    <>
      <div className="banner-container">
        <div className="form-domain-card1">
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              className="img-div"
              style={{
                display: "flex",
                gap: "20px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label style={{ width: "30%" }}>Amount</label>
              <Input
                type="number"
                placeholder="Amount"
                value={Math.abs(data.amount) || ""}
                name="amount"
                // min="0"
                style={{
                  width: "60%",
                  border: `${error.amount ? "1px solid red" : ""}`,
                }}
                onChange={handleChange}
              />
            </div>
            <div
              className="img-div"
              style={{
                display: "flex",
                gap: "20px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label style={{ width: "30%" }}>Transaction Code</label>
              <Input
                type="password"
                placeholder="Transaction Code"
                name="lupassword"
                value={data.lupassword}
                style={{
                  width: "60%",

                  border: `${error.lupassword ? "1px solid red" : ""}`,
                }}
                onChange={handleChange}
              />
            </div>
            <div className="btn" style={{ textAlign: "right" }}>
              <Button
                style={{
                  background: "black",
                  color: "white",
                  width: "auto",
                  border: "none",
                }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SelfDepositForm;
