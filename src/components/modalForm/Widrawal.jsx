import { Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { UserModalContext } from "../../pages/activeUser/ActiveUser";
import { Tab_Widrawal, Tab_WidrawalSubmitForm } from "../../routes/Routes";
import { LoaderContext } from "../../App";

import "./styles.scss";
import { notifyToast } from "../toast/Tost";
const Widrawal = ({ data, gettableData }) => {
  const { handleCancel } = useContext(UserModalContext);

  const [widrawal, setWidrawal] = useState([]);
  const [error, setError] = useState({});
  const [formData, setformData] = useState({});
  const { setLoading, userBalance } = useContext(LoaderContext);
  const navigate = useNavigate();

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
      if (!value.toString().match(/^[0-9]*$/)) {
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

  const Submit = async () => {
    if (formData?.amount && formData?.lupassword && formData?.remark) {
      setLoading((prev) => ({ ...prev, submitWidrawal: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Tab_WidrawalSubmitForm}`,
          { ...formData, userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          notifyToast().succes(res.data.message);
          gettableData();
          userBalance();
          handleCancel();
          setformData({});
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.status === 401) {
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, submitWidrawal: false }));
    } else {
      setError({
        ...error,
        amount: !formData.amount,
        lupassword: !formData.lupassword,
        remark: !formData.remark,
      });
    }
  };

  useEffect(() => {
    const withdrawal = async () => {
      setLoading((prev) => ({ ...prev, showwithdrawal: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${Tab_Widrawal}`,
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
          } else {
            // navigate("/");
          }
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.status === 401) {
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, showwithdrawal: false }));
    };
    withdrawal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        showwithdrawal: false,
        submitWidrawal: false,
      }));
    };
  }, [setLoading]);
  return (
    <div className="form-container">
      <p style={{ marginTop: "0px", color: "#495057", fontWeight: "600" }}>
        Withdraw
      </p>
      <div className="form">
        <div className="row-1">
          <label>{widrawal.parentName}</label>
          <div className="input">
            <input
              type="text"
              disabled={true}
              value={widrawal.parentAmount || ""}
            />
            <input
              type="text"
              disabled={true}
              value={
                formData.amount
                  ? Number(widrawal.parentAmount) + Number(formData.amount)
                  : 0
              }
            />
          </div>
        </div>
        <div className="row-1">
          <label>{widrawal.childName}</label>
          <div className="input">
            <input
              type="text"
              disabled={true}
              value={widrawal.childAmount || ""}
            />
            <input
              type="text"
              disabled={true}
              value={
                formData.amount
                  ? Number(widrawal.childAmount) - Number(formData.amount)
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
              value={widrawal.childUplineAmount || ""}
            />
            <input
              type="text"
              disabled={true}
              value={
                formData.amount
                  ? Number(widrawal.childUplineAmount) - Number(formData.amount)
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
              value={formData.amount || ""}
              style={{
                width: "100%",
                textAlign: "right",
                border: "none",
                outline: "none",
              }}
              placeholder="Amount"
              onChange={handleChange}
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
              rows="4"
              cols="50"
              textalign="left"
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
              name="lupassword"
              style={{ width: "100%", textAlign: "left", border: "none" }}
              onChange={handleChange}
              value={formData.lupassword || ""}
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
    </div>
  );
};

export default Widrawal;
