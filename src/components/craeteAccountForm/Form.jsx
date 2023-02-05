import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select, Spin } from "antd";
///styles
import "./styles.scss";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Create_Admin, get_Sport_List } from "../../routes/Routes";
import Item from "antd/es/list/Item";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Accountform = () => {
  const [sportsList, setSportsList] = useState([]);
  const [userId, setuserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [downline, setDownLine] = useState(100);
  const [currentUserROle, setCurrentUserROle] = useState("");
  const { loading, setLoading } = useContext(LoaderContext);
  const userType = localStorage.getItem("userType");
  const partnership = localStorage.getItem("partnership");

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    city: "",
    fancyLossCommission: "",
    lupassword: "",
    mobile: "",
    oddLossCommission: "",
    userRole: "",
  });
  // console.log(currentUserROle, "appId");
  const [errorData, setErrorData] = useState({
    username: false,
    lupassword: false,
    appId: currentUserROle == 2 ? false : undefined,
    // city: false,
    fancyLossCommission: false,
    // mobile: false,
    oddLossCommission: false,
    sportPartnership: currentUserROle == 2 ? false : undefined,
    userRole: false,
  });

  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;

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
    if (name === "city") {
      const result = value.replace(/[^a-z]/gi, "");
      setData((prev) => {
        return {
          ...prev,
          [name]: result,
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSelectChange = (e, Name) => {
    let value = e;

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
    if (Name == "userRole") {
      setCurrentUserROle(value);
    }
    setData((prev) => {
      return {
        ...prev,
        [Name]: value,
      };
    });
  };

  const onFinish = async () => {
    let isError = false;
    if (data)
      if (userType === 4) {
        delete data.appId;
      }
    if (data.currentUserROle == 2) {
      delete data.sportPartnership;
    }
    if (data.currentUserROle == 2) {
      delete data.sportPartnership;
    }
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        isError = true;

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
    });

    if (isError) return false;
    else {
      Object.assign(data, { sportPartnership: Number(data.sportPartnership) });
      Object.assign(data, {
        oddLossCommission: Number(data.oddLossCommission),
      });
      Object.assign(data, {
        fancyLossCommission: Number(data.fancyLossCommission),
      });
      Object.assign(data, {
        appId: Number(data.appId),
      });
      setLoading((prev) => ({ ...prev, CreateUserAccount: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Create_Admin}`,

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
            setuserId(res?.data?.username);
            setUserPass(res?.data?.password);
            setData({});
            showModal();
          }
        })
        .catch((error) => {
          message.error(error.response.data.message);
          if (error.response.data.status === 401) {
            setLoading((prev) => ({ ...prev, CreateUserAccount: false }));
            navigate("/");
            localStorage.removeItem("token");
          }
        });
      setLoading((prev) => ({ ...prev, CreateUserAccount: false }));
    }
  };
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const usertypeArray = {
    0: [
      <Select.Option value={1} key="0">
        Master
      </Select.Option>,
      <Select.Option value={2} key="1">
        Client
      </Select.Option>,
    ],
    1: [
      <Select.Option value={1} key="2">
        Agent
      </Select.Option>,
      <Select.Option value={2} key="3">
        Client
      </Select.Option>,
    ],
    2: [
      <Select.Option value={2} key="4">
        Client
      </Select.Option>,
    ],
    4: [
      <Select.Option value={1} key="5">
        Sub Admin
      </Select.Option>,
    ],
    5: [
      <Select.Option value={1} key="6">
        Super Master
      </Select.Option>,
      <Select.Option value={2} key="7">
        Client
      </Select.Option>,
    ],
  };

  const getSpotsList = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${get_Sport_List}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSportsList(res.data.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        if (error.response.data.status === 401) {
          navigate("/");
          localStorage.removeItem("token");
          message.error(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    if (userType === "4") {
      getSpotsList();
    } else {
      return;
    }
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

  const options = sportsList?.map((item, index) => ({
    value: item?.appId,
    label: item?.appUrl,
    key: item?.appId + item?.appUrl + index,
  }));

  return (
    <>
      <Modal
        title="User Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <table className="table coupon-table mb-0">
          <thead>
            <tr>
              <th className="text-end">User Id</th>
              <th className="text-end">Password</th>
            </tr>
          </thead>
          <tbody className="table-blue-bg">
            <tr className="back-border">
              <td className="text-end bt0" style={{ textAlign: "center" }}>
                {userId}
              </td>
              <td className="text-end bt0" style={{ textAlign: "center" }}>
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
        // onFinishFailed={onFinishFailed}
        className="create-form"
      >
        <div className="left-col-section">
          <p>General Information</p>

          <Form.Item
            name="username"
            label="User Name:"
            // bordered={false}
            // style={{ border: "1px solid red" }}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <div className={errorData?.username ? "col-input2" : "col-input"}>
              <Input
                placeholder="User Name"
                name="username"
                value={data.username}
                onChange={handleChange}
                // style={{ border: "1px solid blue" }}
              />
              {errorData?.username ? (
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
                errorData?.oddLossCommission ? "col-input3" : "col-input"
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
                errorData?.oddLossCommission ? "col-input3" : "col-input"
              }
            >
              <Input
                placeholder="Mobile Number"
                type="number"
                name="mobile"
                value={data?.mobile}
                onChange={handleChange}
              />
            </div>
          </Form.Item>

          <Form.Item label="Match Commission:">
            <div
              className={
                errorData?.oddLossCommission ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Match Commission:"
                type="number"
                name="oddLossCommission"
                value={data?.oddLossCommission}
                onChange={handleChange}
              />
              {errorData?.oddLossCommission ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>

          <Form.Item label="Session Commission:">
            <div
              className={
                errorData?.fancyLossCommission ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Session Commission:"
                type="number"
                name="fancyLossCommission"
                value={data?.fancyLossCommission}
                onChange={handleChange}
              />
              {errorData?.fancyLossCommission ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
        </div>
        <div className="right-col-section">
          {userType === "4" ? (
            <Form.Item label="App Url:">
              <div className={errorData?.appId ? "col-input2" : "col-input"}>
                <Select
                  defaultValue={"Select App Url"}
                  name="appId"
                  onChange={(e) => {
                    handleSelectChange(e, "appId");
                  }}
                  options={options}
                ></Select>
                {errorData.appId ? (
                  <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
                ) : (
                  ""
                )}
              </div>
            </Form.Item>
          ) : (
            ""
          )}
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
              {errorData?.userRole ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
          {data.userRole !== 2 ? (
            <>
              <p>Partnership Information</p>
              <Form.Item
                label="Partnership With No Return:"
                name="sportPartnership"
              >
                <div
                  className={
                    errorData?.sportPartnership ? "col-input2" : "col-input"
                  }
                >
                  <Input
                    placeholder="Partnership With No Return"
                    type="number"
                    name="sportPartnership"
                    value={data.sportPartnership}
                    onChange={handleChange}
                  />
                  {errorData?.sportPartnership ? (
                    <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
                  ) : (
                    ""
                  )}
                </div>
              </Form.Item>

              <p style={{ fontSize: "14px" }}>
                Our :{" "}
                {data?.sportPartnership ? data.sportPartnership : partnership}|
                Down Line:
                {data.sportPartnership
                  ? partnership - data.sportPartnership
                  : 0}
              </p>
            </>
          ) : (
            ""
          )}
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
                value={data?.lupassword}
                onChange={handleChange}
                type="password"
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
