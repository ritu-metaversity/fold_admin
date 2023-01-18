import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import {
  Tab_WidrawalActivity,
  Tab_WidrawalActivitySubmitForm,
} from "../../routes/Routes";
import { BASE_URL } from "../../_api/_api";
// import './styles.scss'
const WidrawalActivity = ({ data }) => {
  const [error, setError] = useState({});
  const [formData, setformData] = useState({});

  const [depositActivity, setDepositActivity] = useState([]);
  const [loader, setloader] = useState(false);

  const { handleCancel } = useContext(UserModalContext);

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
  useEffect(() => {
    const ActivityDeposit = async () => {
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_WidrawalActivity}`,
          { userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setDepositActivity(res.data.data);
          setloader(false);
        });
    };
    ActivityDeposit();
  }, []);
  const Submit = async () => {
    if (formData.amount && formData.lupassword && formData.remark) {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_WidrawalActivitySubmitForm}`,
          { ...formData, userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success(res.data.message);
          handleCancel();
          setloader(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          handleCancel();
          setloader(false);
        });
    } else {
      setError({
        ...error,
        amount: !formData.amount,
        remark: !formData.remark,
        lupassword: !formData.lupassword,
      });
    }
  };
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
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
                ? Number(depositActivity.parentAmount) + Number(formData.amount)
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
                ? Number(depositActivity.childAmount) - Number(formData.amount)
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
            value={formData.amount || 0}
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
            id="w3review"
            name="remark"
            rows="3"
            cols="100"
            placeholder="Remark"
            value={formData.remark}
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",

              outline: "none",
            }}
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

export default WidrawalActivity;
