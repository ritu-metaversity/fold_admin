import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
///styles
import "./styles.scss";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const Accountform = () => {
  const [sportsList, setSportsList] = useState([]);
  const [userId, setuserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [downline, setDownLine] = useState(100);
  const [data, setData] = useState({
    username: "",
    appId: "",
    city: "",
    fancyLossCommission: "",
    lupassword: "",
    mobile: "",
    oddLossCommission: "",
    sportPartnership: "",
    userRole: "",
  });

  const [errorData, setErrorData] = useState({
    username: false,
    lupassword: false,
    appId: false,
    // city: false,
    fancyLossCommission: false,
    // mobile: false,
    oddLossCommission: false,
    sportPartnership: false,
    userRole: false,
  });

  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    console.log(name, ":", value);

    if (!value) {
      setErrorData((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else {
      setErrorData((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (e, Name) => {
    let value = e;
    console.log(Name, ":", value);

    if (!value) {
      setErrorData((prev) => {
        return {
          ...prev,
          [Name]: true,
        };
      });
    } else {
      setErrorData((prev) => {
        return {
          ...prev,
          [Name]: false,
        };
      });
    }

    setData((prev) => {
      return {
        ...prev,
        [Name]: value,
      };
    });
  };

  const onFinish = async () => {
    let isNoError = true;
    for (let key of Object.keys(errorData)) {
      if (!data[key]) {
        console.log(key, ":", data[key]);
        isNoError = false;

        setErrorData((prev) => {
          return {
            ...prev,
            [key]: true,
          };
        });
      } else {
        setErrorData((prev) => {
          return {
            ...prev,
            [key]: false,
          };
        });
      }
    }

    if (!isNoError) return false;

    Object.assign(data, { sportPartnership: Number(data.sportPartnership) });
    Object.assign(data, { oddLossCommission: Number(data.oddLossCommission) });
    Object.assign(data, {
      fancyLossCommission: Number(data.fancyLossCommission),
    });
    Object.assign(data, {
      appId: Number(data.appId),
    });
    await axios
      .post(
        "http://api.a2zscore.com/admin-new-apis/user/create-user-vg",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          message.success(res.data.message);
          setuserId(res.data.username);
          setUserPass(res.data.password);

          showModal();
        }
      })
      .catch((error) => {
        message.error(error?.response?.data?.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const userType = localStorage.getItem("userType");

  const usertypeArray = {
    0: [
      <Select.Option value={1}>Master</Select.Option>,
      <Select.Option value={2}>Client</Select.Option>,
    ],
    1: [
      <Select.Option value={1}>Agent</Select.Option>,
      <Select.Option value={2}>Client</Select.Option>,
    ],
    2: [<Select.Option value={2}>Client</Select.Option>],
    4: [<Select.Option value={1}>Sub Admin</Select.Option>],
    5: [
      <Select.Option value={1}>Super Master</Select.Option>,
      <Select.Option value={2}>Client</Select.Option>,
    ],
  };

  useEffect(() => {
    const getSpotsList = async () => {
      await axios
        .post(
          "http://api.a2zscore.com/admin-new-apis/admin/app-detail",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          setSportsList(res.data.data);
        });
    };
    getSpotsList();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setuserId("");
    setUserPass("");
  };
  return (
    <>
      <Modal
        title="User Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <table class="table coupon-table mb-0">
          <thead>
            <tr>
              <th class="text-end">User Id</th>
              <th class="text-end">Password</th>
            </tr>
          </thead>
          <tbody class="table-blue-bg">
            <tr class="back-border">
              <td class="text-end bt0" style={{ textAlign: "center" }}>
                {userId}
              </td>
              <td class="text-end bt0" style={{ textAlign: "center" }}>
                {userPass}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="create-form"
      >
        <div className="left-col-section">
          <p>General Information</p>

          <Form.Item
            name="username"
            label="User Name:"
            bordered={false}
            // style={{ border: "1px solid red" }}
          >
            <div className={errorData.username ? "col-input2" : "col-input"}>
              <Input
                placeholder="User Name"
                name="username"
                value={data.username}
                onChange={handleChange}
                // style={{ border: "1px solid blue" }}
              />
              {errorData.username ? (
                <RxCross2
                  style={{
                    paddingRight: "10px",
                    color: "red",
                    // border: "1px solid green",
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item name="city" label="City:">
            <div
              className={
                errorData.oddLossCommission ? "col-input3" : "col-input"
              }
            >
              <Input
                placeholder="City"
                name="city"
                value={data.city}
                onChange={handleChange}
              />
            </div>
          </Form.Item>

          <Form.Item label="Mobile Number:">
            <div
              className={
                errorData.oddLossCommission ? "col-input3" : "col-input"
              }
            >
              <Input
                placeholder="Mobile Number"
                type="number"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
              />
            </div>
          </Form.Item>

          <Form.Item label="Match Commission:">
            <div
              className={
                errorData.oddLossCommission ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Match Commission:"
                type="number"
                name="oddLossCommission"
                value={data.oddLossCommission}
                onChange={handleChange}
              />
              {errorData.oddLossCommission ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item label="Session Commission:">
            <div
              className={
                errorData.fancyLossCommission ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Session Commission:"
                type="number"
                name="fancyLossCommission"
                value={data.fancyLossCommission}
                onChange={handleChange}
              />
              {errorData.fancyLossCommission ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
        </div>
        <div className="right-col-section">
          <Form.Item label="App Url:">
            <div className={errorData.appId ? "col-input2" : "col-input"}>
              <Select
                defaultValue={"Select App Url"}
                name="appId"
                onChange={(e) => {
                  handleSelectChange(e, "appId");
                }}
              >
                {sportsList.map((item) => {
                  return (
                    <Select.Option value={item.appId}>
                      {item.appUrl}
                    </Select.Option>
                  );
                })}
              </Select>
              {errorData.appId ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item label="User Type" name="userRole">
            <div className={errorData.userRole ? "col-input2" : "col-input"}>
              <Select
                defaultValue={"Select User Type"}
                name="userRole"
                onChange={(e) => {
                  handleSelectChange(e, "userRole");
                }}
              >
                {usertypeArray[userType]}
              </Select>
              {errorData.userRole ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <p>Partnership Information</p>
          <Form.Item
            label="Partnership With No Return:"
            name="sportPartnership"
          >
            <div
              className={
                errorData.sportPartnership ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Partnership With No Return"
                type="number"
                name="sportPartnership"
                value={data.sportPartnership}
                onChange={handleChange}
              />
              {errorData.sportPartnership ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
          <p style={{ fontSize: "14px" }}>
            Our : {data.sportPartnership ? data.sportPartnership : downline}|
            Down Line:
            {data.sportPartnership ? downline - data.sportPartnership : 0}
          </p>

          {/* <Form.Item name="Remark" label="Remark:">
            <Input
              placeholder="Remark"
              name="sportPartnership"
              value={data.sportPartnership}
              onChange={handleChange}
            />
            <RxCross2 style={{ paddingRight: "10px" ,color:"red" }} />
          </Form.Item> */}

          <Form.Item name="TransactionPassword" label="Transaction Password">
            <div className={errorData.lupassword ? "col-input2" : "col-input"}>
              <Input
                placeholder="Transaction Password"
                name="lupassword"
                value={data.lupassword}
                onChange={handleChange}
              />
              {errorData.lupassword ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Accountform;
