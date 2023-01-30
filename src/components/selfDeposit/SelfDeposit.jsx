import {
  Button,
  Image,
  Input,
  message,
  Select,
  Spin,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
// import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import {
  Add_banner,
  Admin_Self_Deposit,
  Banner_List,
} from "../../routes/Routes";
import { NavLink, useNavigate } from "react-router-dom";

const SelfDepositForm = ({ handleCancel }) => {
  const { loading, setLoading } = useContext(LoaderContext);

  const [data, setData] = useState({
    amount: "",
    lupassword: "",
  });

  const navigate = useNavigate();

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
          message.success(res.data.message);
          setData({});
          handleCancel();
        })
        .catch((error) => {
          message.error(error.response.data.message);
          if (error.response.data.status === 401) {
            setLoading((prev) => ({ ...prev, selfDeposit: false }));
            navigate("/");
            localStorage.removeItem("token");
            message.error(error.response.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, selfDeposit: false }));
    } else {
      console.log(data.amount);
      setError({
        ...error,
        amount: !Boolean(data.amount),
        lupassword: !Boolean(data.lupassword),
      });
    }
  };

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
                placeholder="amount"
                value={data.amount}
                name="amount"
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
                style={{ background: "black", color: "white", width: "auto" }}
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
