import React, { useContext, useEffect } from "react";
import { Button, Form, Input } from "antd";
////
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cahnge_pass } from "../../routes/Routes";
import { LoaderContext } from "../../App";
import { notifyToast } from "../toast/Tost";
const ChangePasswordLoginForm = () => {
  // const [state, setstate] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);

  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("refresh-token");

  const onFinish = async (values) => {
    setLoading((prev) => ({ ...prev, LoginUserChange: true }));

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Cahnge_pass}`,
        {
          ...values,
          userid: userId,
          token: token,
          currentPassword: values.oldPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.status === true) {
          notifyToast().succes(res.data?.message);
          setLoading((prev) => ({ ...prev, LoginUserChange: false }));
          navigate("/");
        } else if (res.data?.message) {
          notifyToast().error(res.data?.message);
        }
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, LoginUserChange: false }));
  };
  // let x = localStorage.getItem("token");
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        LoginUserChange: false,
      }));
    };
  }, [setLoading]);
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
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your oldPassword!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="OldPassword"
            className="input-tag"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your New assword!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="New Password"
            className="input-tag"
          />
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

export default ChangePasswordLoginForm;
