import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

import "./styles.scss";
import CheckBoxComp from "./CheckBoxComp";
import axios from "axios";
import { createhelperApi } from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";
const CreateHelperForm = () => {
  const [checkValue, setcheckValue] = useState([]);
  const [form] = Form.useForm();
  const clearForm = () => {
    form.resetFields();
  };
  const onChange = (name, e) => {
    const value = e.target.checked;
    if (name && value) {
      setcheckValue((prev) => {
        return [...prev, name];
      });
    } else {
      let valueRaay = checkValue.indexOf(name);
      let newCheckvalue = [...checkValue];
      newCheckvalue.splice(valueRaay, 1);
      setcheckValue(newCheckvalue);
    }
  };

  const style = {
    background: "rgb(231 231 231)",
  };

  const createHepler = async (createHelperData) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${createhelperApi}`,
        createHelperData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          clearForm();
          notifyToast().succes(res.data.message);
        } else {
          notifyToast().error(res.data.message);
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const onFinish = (values) => {
    const newdata = { ...values, userPermissions: checkValue };
    console.log(checkValue.length);
    if (!checkValue.length > 0) {
      return notifyToast().error("Please Selcect any One Previleges");
    } else if (newdata.password == newdata.ConfirmPassword) {
      delete newdata.ConfirmPassword;
      createHepler(newdata);
    } else {
      notifyToast().error("password and ConfirmPassword Does't same");
    }
  };
  return (
    <div className="create-helper-form">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "500",
              margin: "0px",
              color: "rgb(80 79 79 / 88%)",
            }}
          >
            Personal Information
          </h3>
        </Row>
        <Row gutter={20}>
          <Col sm={12} md={6} xs={24} xl={6}>
            <Form.Item
              label="Client ID"
              name="userId"
              rules={[
                {
                  required: true,
                  message: "Please input your Client ID!",
                },
              ]}
            >
              <Input placeholder=" Client ID" />
            </Form.Item>
          </Col>
          <Col sm={12} md={6} xs={24} xl={6}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input placeholder=" Full Name" />
            </Form.Item>
          </Col>
          <Col sm={12} md={6} xs={24} xl={6}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input placeholder="password" type="password" />
            </Form.Item>
          </Col>
          <Col sm={12} md={6} xs={24} xl={6}>
            <Form.Item
              label="Confirm Password"
              name="ConfirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password!",
                },
              ]}
            >
              <Input placeholder="Confirm Password" type="password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "500",
              margin: "0px",
              color: "rgb(80 79 79 / 88%)",
            }}
          >
            Privileges
          </h3>
        </Row>
        <div className="priviliges-div">
          <Row gutter={30} style={style}>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="ALL" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="DEPOSIT" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="WITHDRAW" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="userList" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="Bet lock" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="User password change" fun={onChange} />
            </Col>
            <Col sm={12} xs={24} md={8} lg={6} xl={6}>
              <CheckBoxComp name="Account statement" fun={onChange} />
            </Col>
          </Row>
        </div>
        <Row>
          <Col sm={10} md={12} xs={16} xl={16}></Col>
          <Col sm={14} md={12} xs={24} xl={8}>
            <div className="create-helper-footer-div">
              <Form.Item
                label="Confirm Password"
                name="luPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input placeholder="Transaction Code" type="password" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={clearForm}>Reset</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateHelperForm;
