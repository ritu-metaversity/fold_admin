import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
///styles
import "./styles.scss";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../../../../_api/_api";
import { Tab_ChangePasword } from "../../../../routes/Routes";
const Changpassword = ({ data }) => {
  const [loader, setloader] = useState(false);
  const [formData, setformData] = useState({});
  const [error, setError] = useState({});

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
      lupassword: !formData.lupassword,
      newPassword: !formData.newPassword,
      password: !formData.password,
    };
    setError(newError);

    if (formData.password === formData.newPassword) {
      if (
        !Object.values(newError).reduce(
          (accu, current) => Boolean(accu || current),
          true
        )
      ) {
        return;
      }
      setformData({});
      setError({});
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_ChangePasword}`,
          { ...formData, userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success(res.data.message);
          // handleCancel();
          setloader(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          // handleCancel();
        });
      setloader(false);
    } else {
      console.log("ran");
      setError({ ...error, newPassword: true });
    }
  };
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <div className="row-1">
          <label>Password</label>
          <div
            className="input"
            style={{
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
          <label>Confim password</label>
          <div
            className="input"
            style={{
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
              value={formData.lupassword}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="Transaction Code"
              onChange={handleChange}
            />

            {error.lupassword ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row-button">
          <Button
            style={{ background: "black", borderColor: "black" }}
            onClick={changePassword}
          >
            Submit
            <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Changpassword;
