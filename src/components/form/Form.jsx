import React, { useContext, useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HelperActiveUser_Screen, Login_Api } from "../../routes/Routes";
import { LoaderContext } from "../../App";
import { notifyToast } from "../toast/Tost";
const Loginform = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);
  const host = window.location.hostname;

  const redirect = {
    DEPOSIT: "Deposit-Pending-Request",
    WITHDRAW: "Widrwal-Pending-Request",
    ALL: "Deposit-Pending-Request",
    USER_LOCK: HelperActiveUser_Screen,
    ACTIVE_USER: HelperActiveUser_Screen,
    USER_PASSWORD_CHANGE: HelperActiveUser_Screen,
    BET_LOCK: HelperActiveUser_Screen,
  };
  const onFinish = async (values) => {
    setLoading((prev) => ({ ...prev, LoginUser: true }));
    const value = {
      ...values,
      appUrl: host === "localhost" ? "admin.localhost" : host,
    };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Login_Api}`, value)
      .then((res) => {
        if (res.data.token && res.status === 200) {
          localStorage.setItem("username", res.data.username);
          setLoading((prev) => ({ ...prev, LoginUser: false }));
          localStorage.setItem("userid", res.data.userId);
          localStorage.setItem("userType", res.data.userType);
          localStorage.setItem("partnership", res.data.partnership);
          if (res?.data?.poweruser_permisions === undefined) {
            localStorage.setItem(
              "poweruser_permisions",
              JSON.stringify(["ADMIN"])
            );
          } else {
            localStorage.setItem(
              "poweruser_permisions",
              JSON.stringify(res.data.poweruser_permisions)
            );
          }
          if (res.data.passwordtype === "old") {
            localStorage.setItem("passwordtype", res?.data?.passwordtype);
            localStorage.setItem("refresh-token", res.data.token);
            setLoading((prev) => ({ ...prev, LoginUser: false }));

            // navigate("/change-password");
          } else {
            // notifyToast().succes("Login success!!");
            localStorage.setItem("token", res.data.token);
            setLoading((prev) => ({ ...prev, LoginUser: false }));
            if (res.data.userType === "7") {
              navigate(redirect[res.data.poweruser_permisions[0]]);
            } else {
              navigate("/marketAnalysis");
            }
            // message.success("Success");
          }
        } else {
          notifyToast().error(res.data.message || "Error");
        }
      })
      .catch((error) => {
        setLoading((prev) => ({ ...prev, LoginUser: false }));
      });
    setLoading((prev) => ({ ...prev, LoginUser: false }));
  };

  let x = localStorage.getItem("token");

  useEffect(() => {
    if (!x) {
      return;
    } else {
      navigate("/marketAnalysis");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        LoginUser: false,
      }));
    };
  }, [setLoading]);
  return (
    <div className="form-div">
      <h3>Welcome to Admin Panel</h3>
      <p>Enter your Username and Password</p>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input placeholder="Username" className="input-tag" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" className="input-tag" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <p>
        This site is protected by reCAPTCHA and the Google{" "}
        <span style={{ color: "#fdcf13" }}>Privacy Policy</span> and{" "}
        <span style={{ color: "#fdcf13" }}>Terms of Serviceapply</span> .
      </p>
      <p>© Copyright 2021. All Rights Reserved.</p>
      {/* <p>
        The website is operated by Ecofun Services NV registered in Curaçao
        under the registration number 152307, with address at Heelsumstraat 51,
        Curaçao, authorized by Antillephone under license number 8048/JAZ2020 -
        025. The transactions are processed by Ecofun Services NV which own and
        operates world777.com
      </p> */}
    </div>
  );
};

export default Loginform;
