import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
///styles
import "./styles.scss";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Change_Password_User } from "../../../../routes/Routes";
import { LoaderContext } from "../../../../App";
import { notifyToast } from "../../../toast/Tost";

const Changpasswordheader = ({ logout, handleCancelfunction }) => {
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
      currentPassword: !formData.currentPassword,
      newPassword: !formData.newPassword,
      password: !formData.password,
      passwordNotMatch: false,
    };
    setError(newError);

    if (formData.password && formData.newPassword && formData.currentPassword) {
      if (formData.password && formData.newPassword) {
        if (formData.password === formData.newPassword) {
          setError({});
          setLoading((prev) => ({ ...prev, changePassword: true }));
          await axios
            .post(
              `${import.meta.env.VITE_BASE_URL}/${Change_Password_User}`,
              formData,
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

                setTimeout(() => {
                  logout();
                }, 4000);
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
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        changePasswordHeader: false,
      }));
    };
  }, [setLoading]);
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
