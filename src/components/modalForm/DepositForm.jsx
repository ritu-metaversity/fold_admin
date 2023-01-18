import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import { Tab_Deposit, Tab_SubmitDepositForm } from "../../routes/Routes";
import "./styles.scss";
const DepositForm = ({ data }) => {
  const { handleCancel } = useContext(UserModalContext);

  const [deposit, setDeposit] = useState([]);
  const [loader, setloader] = useState(false);
  const [error, setError] = useState({});
  const [formData, setformData] = useState({});
  const navigate = useNavigate();
  const AmountRef = useRef(null);

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
  const Submit = async () => {
    if (formData.amount && formData.lupassword && formData.remark) {
      setformData({});
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_SubmitDepositForm}`,
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
            value={
              formData.amount
                ? Number(deposit.parentAmount) - Number(formData.amount)
                : 0
            }
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
            value={
              formData.amount
                ? Number(deposit.childAmount) + Number(formData.amount)
                : 0
            }
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
              formData.amount
                ? Number(deposit.childUplineAmount) + Number(formData.amount)
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
            type="number"
            name="amount"
            ref={AmountRef}
            value={formData.amount || 0}
            style={{
              width: "100%",
              textAlign: "right",
              border: "none",
              outline: "none",
            }}
            placeholder="Accounts"
            onChange={(event) => handleChange(event, "amount")}
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
            rows="4"
            cols="50"
            style={{ border: "none", outline: "none" }}
            placeholder="Remark"
            value={formData.remark}
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
            id="pwd"
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

export default DepositForm;
