import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import { LoaderContext } from "../../App";
import {
  Tab_DepositActivity,
  Tab_DepositActivityForm,
} from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
// import './styles.scss'
const DepositActivity = ({ data, gettableData, handleCancelfunction }) => {
  // console.log(data, "data");
  const [depositActivity, setDepositActivity] = useState([]);
  const { loading, setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setformData] = useState({});

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (!value) {
      setError(() => {
        return {
          ...error,
          [name]: true,
        };
      });
    } else {
      setError(() => {
        return {
          ...error,
          [name]: false,
        };
      });
    }
    if (name === "amount") {
      if (!Math.abs(value)) {
        return;
      }
      setformData(() => {
        return {
          ...formData,
          [name]: Math.abs(value),
        };
      });
    } else {
      setformData(() => {
        return {
          ...formData,
          [name]: value,
        };
      });
    }
  };

  const ActivityDeposit = async () => {
    setLoading((prev) => ({ ...prev, submitUserActivityDeposit: true }));

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Tab_DepositActivity}`,
        { userId: data.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDepositActivity(res.data.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        if (error.response.status === 401) {
          navigate("/");
          localStorage.removeItem("token");
          message.error(error.response.data.message);
        }
      });

    setLoading((prev) => ({ ...prev, submitUserActivityDeposit: false }));
  };

  useEffect(() => {
    ActivityDeposit();
  }, []);

  const Submit = async () => {
    if (formData.amount && formData.remark && formData.lupassword) {
      setformData({});
      setLoading((prev) => ({ ...prev, submitDATAActivityDeposit: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_DepositActivityForm}`,
          { ...formData, userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success(res.data.message);
          handleCancelfunction();

          gettableData();
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
      setLoading((prev) => ({ ...prev, submitDATAActivityDeposit: false }));
    } else {
      setError({
        ...error,
        amount: !formData.amount,
        remark: !formData.remark,
        lupassword: !formData.lupassword,
      });
    }
  };
  return (
    <div className="form" style={{ padding: "10px" }}>
      <div className="row-1">
        <label>{depositActivity.parentName}</label>
        <div className="input">
          <input
            type="text"
            disabled={true}
            value={depositActivity.parentAmount}
          />
          <input
            type="text"
            disabled={true}
            value={
              formData.amount
                ? Number(depositActivity.parentAmount) - Number(formData.amount)
                : 0
            }
          />
        </div>
      </div>
      <div className="row-1">
        <label>{depositActivity.childName}</label>
        <div className="input">
          <input
            type="text"
            disabled={true}
            value={depositActivity.childAmount}
          />
          <input
            type="text"
            disabled={true}
            value={
              formData.amount
                ? Number(depositActivity.childAmount) + Number(formData.amount)
                : 0
            }
          />
        </div>
      </div>

      <div className="row-1">
        <label>Amount</label>
        <div
          className="input"
          style={{
            background: "white",
            border: `${error.amount ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: " 0.25rem",
          }}
        >
          <input
            type="text"
            name="amount"
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",
              outline: "none",
            }}
            placeholder="Accounts"
            onChange={handleChange}
            value={formData.amount || ""}
          />
          {error.amount ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
        </div>
      </div>
      <div className="row-1">
        <label>Remark</label>
        <div
          className="input"
          style={{
            background: "white",
            border: `${error.remark ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: " 0.25rem",
          }}
        >
          <textarea
            name="remark"
            rows="3"
            cols="100"
            value={formData.remark}
            style={{
              width: "100%",
              textAlign: "left",
              border: "none",
              outline: "none",
            }}
            placeholder="Remark"
            onChange={handleChange}
          ></textarea>
          {error.remark ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
        </div>
      </div>
      <div className="row-1">
        <label>Transaction Code</label>
        <div
          className="input"
          style={{
            background: "white",
            border: `${
              error.lupassword ? "1px solid red" : "1px solid #ced4da"
            }`,
            borderRadius: " 0.25rem",
          }}
        >
          <input
            type="password"
            name="lupassword"
            style={{ width: "100%", textAlign: "left", border: "none" }}
            onChange={handleChange}
            value={formData.lupassword}
          ></input>
          {error.lupassword ? (
            <RxCross2 style={{ paddingRight: "10px" }} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row-button">
        <Button onClick={Submit}>
          Submit
          <MdOutlineLogin />
        </Button>
      </div>
    </div>
  );
};

export default DepositActivity;
