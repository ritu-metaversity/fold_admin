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
  const [change, setChangeAmount] = useState("");
  const [remarkCancelbutton, setRemarkCancelbutton] = useState(false);
  const [ammountbutton, setAmmountbutton] = useState(false);
  const [depositActivity, setDepositActivity] = useState([]);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();
  const { amount, remark, handleCancel, setAmount, setRemark } =
    useContext(UserModalContext);

  const dataValue = {
    userId: data.userId,
    amount: amount,
    lupassword: localStorage.getItem("pass"),
    remark: remark,
  };

  function handleChange(event) {
    if (event.target.value) {
      setAmount(Math.abs(event.target.value));
      setChangeAmount(amount);
    } else {
      setAmount("");
      setChangeAmount("");
    }
  }
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
    setAmmountbutton(!amount);
    setRemarkCancelbutton(!remark);

    if (amount && remark) {
      setRemark("");
      setAmount("");
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_WidrawalActivitySubmitForm}`,
          dataValue,
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
              amount ? Number(depositActivity.parentAmount) + Number(amount) : 0
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
              amount ? Number(depositActivity.childAmount) - Number(amount) : 0
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
            border: `${ammountbutton ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: " 0.25rem",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",
              outline: "none",
            }}
            placeholder="Accounts"
            onChange={handleChange}
            value={amount}
          />
          {ammountbutton ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
        </div>
      </div>
      <div className="row-1">
        <label>Remark</label>
        <div
          className="input"
          style={{
            background: "white",
            border: `${
              remarkCancelbutton ? "1px solid red" : "1px solid #ced4da"
            }`,
            borderRadius: " 0.25rem",
          }}
        >
          <textarea
            id="w3review"
            name="w3review"
            rows="3"
            cols="100"
            placeholder="Remark"
            value={remark}
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",

              outline: "none",
            }}
            onChange={(e) => console.log("remark", setRemark(e.target.value))}
          ></textarea>
          {remarkCancelbutton ? (
            <RxCross2 style={{ paddingRight: "10px" }} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row-1">
        <label>Transaction Code</label>
        <div className="input">
          <input
            type="password"
            id="pwd"
            name="pwd"
            style={{ width: "100%", textAlign: "left" }}
          ></input>
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
