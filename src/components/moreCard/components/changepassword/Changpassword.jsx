import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
///styles
import "./styles.scss";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../../../../_api/_api";
import { Tab_ChangePasword } from "../../../../routes/Routes";
const Changpassword = () => {
  const [change, setChangeAmount] = useState("");

  const [remarkCancelbutton, setRemarkCancelbutton] = useState(false);
  const [ammountbutton, setAmmountbutton] = useState(false);

  const {
    handleCancel,
    userId,
    setPassword,
    setConfirmPass,
    password,
    confirmPass,
  } = useContext(UserModalContext);

  const changeData = {
    userId: userId,
    newPassword: confirmPass,
    lupassword: password,
  };

  const changePassword = async () => {
    setAmmountbutton(!password);
    setRemarkCancelbutton(!confirmPass);

    if (password && confirmPass) {
      handleCancel();
      setPassword("");
      setConfirmPass("");
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_ChangePasword}`,
          changeData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success(res.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }
  };
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
                ammountbutton ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="password"
              id="pwd"
              name="pwd"
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {ammountbutton ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
          </div>
        </div>
        <div className="row-1">
          <label>Confim password</label>
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
            <input
              type="password"
              id="pwd"
              name="pwd"
              value={confirmPass}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
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
              placeholder="Transaction Code"
            />
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
