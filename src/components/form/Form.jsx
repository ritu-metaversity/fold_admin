import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
////
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login_Api } from "../../routes/Routes";
const Loginform = () => {
  // const [state, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setloader(true);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Login_Api}`, values)
      .then((res) => {
        setloader(false);
        console.log(res);
        if (res.data.token && res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/marketAnalysis");
          localStorage.setItem("userType", res.data.userType);
          // message.success("Success");
        } else {
          navigate("/");
          setloader(false);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
        localStorage.removeItem("token");
        setloader(false);
      });
  };
  // let x = localStorage.getItem("token");
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div>
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
      <p>
        The website is operated by Ecofun Services NV registered in Curaçao
        under the registration number 152307, with address at Heelsumstraat 51,
        Curaçao, authorized by Antillephone under license number 8048/JAZ2020 -
        025. The transactions are processed by Ecofun Services NV which own and
        operates world777.com.
      </p>
    </div>
  );
};

export default Loginform;
