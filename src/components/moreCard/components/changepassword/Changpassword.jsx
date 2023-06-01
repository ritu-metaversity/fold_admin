import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
///styles
import "./styles.scss";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Tab_ChangePasword } from "../../../../routes/Routes";
import { LoaderContext } from "../../../../App";
import { notifyToast } from "../../../toast/Tost";

const Changpassword = ({ data, handleCancelfunction, helper }) => {
  const { setLoading } = useContext(LoaderContext);
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
      passwordNotMatch: false,
    };
    setError(newError);
    console.log(helper);
    if (formData.lupassword && formData.newPassword && formData.password) {
      if (formData.password && formData.newPassword) {
        if (formData.password === formData.newPassword) {
          setError({});
          setLoading((prev) => ({ ...prev, changePassword: true }));
          await axios
            .post(
              // "http://192.168.68.101/pw/change-password-child-pw",
              `${process.env.REACT_APP_BASE_URL}/${
                helper === "update"
                  ? "pw/change-password-child-pw"
                  : Tab_ChangePasword
              }`,
              { ...formData, userId: data.userId },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (res.data.status) {
                notifyToast().succes(res.data.message);
                handleCancelfunction();
                setformData({});
              } else {
                notifyToast().error(res.data.message);
              }
            })
            .catch((error) => {});
        } else {
          setError({ ...error, passwordNotMatch: true });
        }
        setLoading((prev) => ({ ...prev, changePassword: false }));
      }
    }

    // if (formData.password !== formData.newPassword) {
    //   setError({ ...error, passwordNotMatch: true });
    // }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        changePassword: false,
      }));
    };
  }, [setLoading]);
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
              placeholder="Password"
              value={formData.password || ""}
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
              value={formData.newPassword || ""}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {error.passwordNotMatch ? (
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
              value={formData.lupassword || ""}
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
