import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import { Tab_Deposit, Tab_SubmitDepositForm } from "../../routes/Routes";
import { BASE_URL } from "../../_api/_api";
import "./styles.scss";
const DepositForm = ({
  handleCancel,
  setAmount,
  amount,
  setRemark,
  remark,
  data,
}) => {
  const [change, setChangeAmount] = useState("");
  const [remarkCancelbutton, setRemarkCancelbutton] = useState(false);
  const [ammountbutton, setAmmountbutton] = useState(false);
  const [deposit, setDeposit] = useState([]);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    if (event.target.value) {
      setAmount(Math.abs(event.target.value));
      setChangeAmount(amount);
    } else {
      setAmount("");
      setChangeAmount("");
    }
  }
  console.log(data, "id");
  const formdata = {
    userId: data.userId,
    amount: amount,
    lupassword: localStorage.getItem("pass"),
    remark: remark,
  };

  const Submit = async () => {
    setAmmountbutton(!amount);
    setRemarkCancelbutton(!remark);

    if (amount && remark) {
      setRemark("");
      setAmount("");
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_SubmitDepositForm}`,
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
  ///////deoposit Api
  useEffect(() => {
    const showDeposit = async () => {
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_Deposit}`,
          { userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setloader(false);
          if (res.data.data) {
            setDeposit(res.data.data);
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
    showDeposit();
  }, []);

  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div className="form">
      <p style={{ marginTop: "0px", color: "#495057", fontWeight: "600" }}>
        {data.username}
      </p>
      <div className="row-1">
        <label>{deposit.parentName}</label>
        <div className="input">
          <input type="text" disabled={true} value={deposit.parentAmount} />
          <input
            type="text"
            disabled={true}
            value={amount ? Number(deposit.parentAmount) - Number(amount) : 0}
          />
        </div>
      </div>
      <div className="row-1">
        <label>{deposit.childName}</label>
        <div className="input">
          <input type="text" disabled={true} value={deposit.childAmount} />
          <input
            type="text"
            disabled={true}
            value={amount ? Number(deposit.childAmount) + Number(amount) : 0}
          />
        </div>
      </div>
      <div className="row-1">
        <label>Profit/loss</label>
        <div className="input">
          <input
            type="text"
            disabled={true}
            value={deposit.childUplineAmount}
          />
          <input
            type="text"
            disabled={true}
            value={
              amount ? Number(deposit.childUplineAmount) + Number(amount) : 0
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

export default DepositForm;
