import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { message as antmessage } from "antd";
///styles
import "./styles.scss";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../../../../_api/_api";
import {
  Change_Password_User,
  Tab_ChangePasword,
} from "../../../../routes/Routes";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../../App";

const Changpasswordheader = ({ handleCancelfunction }) => {
  const { loading, setLoading } = useContext(LoaderContext);
  const [formData, setformData] = useState({});
  const [error, setError] = useState({});
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
    setformData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const changePassword = async () => {
    const newError = {
      ...error,
      currentPassword: !formData.currentPassword,
      newPassword: !formData.newPassword,
      password: !formData.password,
    };
    setError(newError);

    if (formData.password === formData.newPassword) {
      if (!Object.values(newError).every((item) => item === false)) {
        return;
      }
      setError({});
      setLoading((prev) => ({ ...prev, changePasswordHeader: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Change_Password_User}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data?.status) {
            antmessage.success(res.data?.message);
            handleCancelfunction();
            setformData({});
            setLoading((prev) => ({ ...prev, changePasswordHeader: false }));
          } else {
            antmessage.error(res.data?.message);
          }
          setLoading((prev) => ({ ...prev, changePasswordHeader: false }));
        })
        .catch((error) => {
          // antmessage.error(error.response?.data.message);
          if (error.response?.status === 401) {
            setLoading((prev) => ({ ...prev, changePasswordHeader: false }));
            navigate("/");
            localStorage.removeItem("token");
            antmessage.error(error.response?.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, changePasswordHeader: false }));
    } else {
      setError({ ...error, newPassword: true });
    }
  };

  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <span style={{ fontSize: "15px", fontWeight: "500" }}>
          CHANGE PASSWORD
        </span>
        <div className="row-1">
          <div
            className="input"
            style={{
              width: "100%",
              background: "white",
              border: `${
                error.currentPassword ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="Transaction Code"
              onChange={handleChange}
            />

            {error.currentPassword ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row-1">
          <div
            className="input"
            style={{
              width: "100%",
              background: "white",
              border: `${
                error.password ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="password"
              name="password"
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row-1">
          <div
            className="input"
            style={{
              width: "100%",
              background: "white",
              border: `${
                error.newPassword ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="confirm Password"
              onChange={handleChange}
            />
            {error.newPassword ? (
              <span style={{ color: "red", whiteSpace: "nowrap" }}>
                password does not match
              </span>
            ) : (
              ""
            )}

            {error.newPassword ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row-button">
          <Button className="changePasswordBtn" onClick={changePassword}>
            Submit
            <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Changpasswordheader;
