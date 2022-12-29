import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import { Tab_Widrawal, Tab_WidrawalSubmitForm } from "../../routes/Routes";
import { BASE_URL } from "../../_api/_api";
import "./styles.scss";
const Widrawal = ({ data }) => {
  const {
    amount,
    remark,
    handleCancel,
    setAmount,
    setRemark,

    setDepositPass,
    depositePass,
  } = useContext(UserModalContext);

  const [change, setChangeAmount] = useState("");
  const [remarkCancelbutton, setRemarkCancelbutton] = useState(false);
  const [ammountbutton, setAmmountbutton] = useState(false);
  const [widrawal, setWidrawal] = useState([]);
  const [loader, setloader] = useState(false);
  const [depositbutton, setDepositbutton] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    if (event.target.value) {
      setAmount(Math.abs(event.target.value));
      setChangeAmount(amount);
      setAmmountbutton(false);
    } else {
      setAmount("");
      setAmmountbutton(true);
      setChangeAmount("");
    }
  }

  const formdata = {
    userId: data.userId,
    amount: amount,
    lupassword: depositePass,
    remark: remark,
  };

  const Submit = async () => {
    setAmmountbutton(amount ? false : true);
    setRemarkCancelbutton(remark ? false : true);
    setDepositbutton(depositePass ? false : true);
    if (amount && remark && depositePass) {
      setRemark("");
      setAmount("");
      setloader(true);
      setDepositPass("");
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_WidrawalSubmitForm}`,
          formdata,
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
  //////widrawal
  useEffect(() => {
    const withdrawal = async () => {
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_Widrawal}`,
          { userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data) {
            setWidrawal(res.data.data);
            setloader(false);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            navigate("/");
            setloader(false);
          }
        });
    };
    withdrawal();
  }, []);

  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div className="form">
      <p style={{ marginTop: "0px", color: "#495057", fontWeight: "600" }}>
        shiv 2
      </p>
      <div className="row-1">
        <label>{widrawal.parentName}</label>
        <div className="input">
          <input type="text" disabled={true} value={widrawal.parentAmount} />
          <input
            type="text"
            disabled={true}
            value={amount ? Number(widrawal.parentAmount) + Number(amount) : 0}
          />
        </div>
      </div>
      <div className="row-1">
        <label>{widrawal.childName}</label>
        <div className="input">
          <input type="text" disabled={true} value={widrawal.childAmount} />
          <input
            type="text"
            disabled={true}
            value={amount ? Number(widrawal.childAmount) - Number(amount) : 0}
          />
        </div>
      </div>
      <div className="row-1">
        <label>Profit/loss</label>
        <div className="input">
          <input
            type="text"
            disabled={true}
            value={widrawal.childUplineAmount}
          />
          <input
            type="text"
            disabled={true}
            value={
              amount ? Number(widrawal.childUplineAmount) - Number(amount) : 0
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
            type="number"
            value={amount}
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",
              outline: "none",
            }}
            placeholder="Accounts"
            onChange={handleChange}
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
            rows="4"
            cols="50"
            style={{ border: "none", outline: "none" }}
            placeholder="Remark"
            value={remark}
            onChange={(e) => {
              setRemark(e.target.value);
              e.target.value
                ? setRemarkCancelbutton(false)
                : setRemarkCancelbutton(true);
            }}
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
        <div
          className="input"
          style={{
            background: "white",
            border: `${depositbutton ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: " 0.25rem",
          }}
        >
          <input
            type="password"
            id="pwd"
            name="pwd"
            style={{ width: "100%", textAlign: "left", border: "none" }}
            onChange={(e) => {
              setDepositPass(e.target.value);
              e.target.value ? setDepositbutton(false) : setDepositbutton(true);
            }}
            value={depositePass}
          ></input>
          {depositbutton ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
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

export default Widrawal;
