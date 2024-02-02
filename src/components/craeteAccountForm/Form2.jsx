import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Switch } from "antd";
///styles
import "./styles.scss";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import {
  Casino_Status,
  Create_Admin,
  User_Check,
  get_Sport_List,
} from "../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { notifyToast } from "../toast/Tost";

const arr = ["city", "mobile"];
const defaultData = {
  username: "",
  city: "",
  fancyLossCommission: "",
  lupassword: "",
  mobile: "",
  password: "",
  oddLossCommission: "",
  userRole: "",
  appId: "",
  userId: "",
  sportPartnership: "",
  liveCasinoLock: true,
  casinoCommission: "",
  isAuraAllowed: true,
  isSuperNovaAllowed: true,
  isQTechAllowed: true,
  isVirtualAllowed: true,
  isSportBookAllowed: true,
  casinoPartnership: "",
};
const Accountform = ({ IsSelfState }) => {
  const [sportsList, setSportsList] = useState([]);
  const [userId, setuserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [currentUserROle, setCurrentUserROle] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const userType = localStorage.getItem("userType");
  const partnership = localStorage.getItem("partnership");
  const [useraChecker, setUserChecker] = useState("");
  const [casinoStatus, setCasinoStatus] = useState(true);
  // const [casinoSwitchState, setCasinoSwitchState] = useState(true);
  // console.log(currentUserROle, "currentUserROle");
  const [data, setData] = useState(defaultData);

  const [errorData, setErrorData] = useState({
    username: false,
    lupassword: false,
    userId: false,
    password: false,
    appId: currentUserROle === 2 ? false : undefined,
    // city: false,
    fancyLossCommission: false,
    // // mobile: false,
    oddLossCommission: false,
    sportPartnership: currentUserROle === 2 ? false : undefined,
    userRole: false,
    casinoCommission: false,
    casinoPartnership: false,
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
    if (name === "username") {
      // userChecker({ userId: value });
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
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
    console.log(value, "value");
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
    if (Name === "userRole") {
      setCurrentUserROle(value);
      setErrorData((prev) => {
        return {
          ...prev,
          sportPartnership: false,
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
    let isError = false;
    if (data)
      if (userType !== 4) {
        delete errorData.appId;
      }

    Object.keys(data).forEach((key) => {
      if (["", 0, null, undefined, NaN].includes(data[key])) {
        if (arr.includes(key)) {
        } else {
          if (userType !== 4 && key === "appId") {
            setErrorData((prev) => {
              return {
                ...prev,
                [key]: false,
              };
            });
          } else if (data.userRole === 2 && key === "sportPartnership") {
            setErrorData((prev) => {
              return {
                ...prev,
                [key]: false,
              };
            });
          } else {
            isError = true;
            setErrorData((prev) => {
              return {
                ...prev,
                [key]: true,
              };
            });
          }
        }
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
      const dataInner = {
        ...data,
        liveCasinoLock: !data.liveCasinoLock,
      };
      Object.assign(dataInner, {
        sportPartnership: Number(dataInner.sportPartnership),
      });
      Object.assign(dataInner, {
        oddLossCommission: data.oddLossCommission,
      });
      Object.assign(dataInner, {
        fancyLossCommission: data.fancyLossCommission,
      });
      Object.assign(dataInner, {
        appId: Number(dataInner.appId),
      });
      Object.assign(dataInner, {
        casinoCommission: Number(dataInner.casinoCommission),
      });

      setLoading((prev) => ({ ...prev, CreateUserAccount: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Create_Admin}`,

          dataInner,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            notifyToast().succes(res.data.message);
            setuserId(res?.data?.username);
            setUserPass(res?.data?.password);
            setData({
              ...defaultData,
              ...(userType == 4
                ? casino.reduce((accu, res) => {
                    accu[`is${res.name.replace(" ", "")}Allowed`] = false;
                    return accu;
                  }, {})
                : casino.reduce((accu, res) => {
                    accu[`is${res.name.replace(" ", "")}Allowed`] = res.active;
                    return accu;
                  }, {})),
              liveCasinoLock: userType === "4" ? false : !casinoStatus,
            });

            showModal();
            setErrorData({
              username: false,
              lupassword: false,
              appId: currentUserROle === "2" ? false : false,
              sportPartnership: currentUserROle === "2" ? false : "",
              userRole: false,
            });
          } else {
            notifyToast().error(res.data.message);
          }
        })
        .catch((error) => {
          // delete data.oddLossCommission;
          // delete data.fancyLossCommission;
        });
      setLoading((prev) => ({ ...prev, CreateUserAccount: false }));
    }
  };
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const userChecker = async (user) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${User_Check}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    try {
      if (!res.data.status) {
        setUserChecker(res.data.message);
        // notifyToast().error(res.data.message);
      } else {
        setUserChecker("");
      }
    } catch (error) {}
  };
  const usertypeArray = {
    0: [
      <Select.Option value={""} key="empty">
        Select
      </Select.Option>,
      <Select.Option value={1} key="0">
        Master
      </Select.Option>,
      <Select.Option value={2} key="1">
        Client
      </Select.Option>,
    ],
    1: [
      <Select.Option value={""} key="empty">
        Select
      </Select.Option>,
      <Select.Option value={1} key="2">
        Agent
      </Select.Option>,
      <Select.Option value={2} key="3">
        Client
      </Select.Option>,
    ],
    2: [
      <Select.Option value={""} key="empty">
        Select
      </Select.Option>,
      <Select.Option value={2} key="4">
        Client
      </Select.Option>,
    ],
    4: [
      <Select.Option value={""} key="empty">
        Select
      </Select.Option>,
      <Select.Option value={1} key="5">
        Sub Admin
      </Select.Option>,
    ],
    5: [
      <Select.Option value={""} key="empty">
        Select
      </Select.Option>,
      !IsSelfState ? (
        <Select.Option value={1} key="6">
          Super Master
        </Select.Option>
      ) : (
        ""
      ),

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
      .catch((error) => {});
  };

  useEffect(() => {
    if (userType === "4") {
      getSpotsList();
    } else {
      return;
    }
  }, [userType]);

  const getCasinoStatus = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casino_Status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCasinoStatus(res?.data?.data?.liveCasinoLock);
        setData((o) => ({
          ...o,
          liveCasinoLock:
            userType === "4" ? true : !Boolean(res.data.data.liveCasinoLock),
        }));
        // setSportsList(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getCasinoStatus();
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

  useEffect(() => {
    return () => {
      setLoading((prev) => ({ ...prev, CreateUserAccount: false }));
    };
  }, [setLoading]);

  // const oddLossCommissionOption = [
  //   {
  //     value: "0",
  //     label: "0",
  //   },
  //   {
  //     value: "1",
  //     label: "1",
  //   },
  //   {
  //     value: "2",
  //     label: "2",
  //   },
  //   {
  //     value: "2.5",
  //     label: "2.5",
  //   },
  //   {
  //     value: "3",
  //     label: "3",
  //   },
  // ];

  const [casino, setCasino] = useState([]);
  const [casionCheck, setCasionCheck] = useState(false);
  const getCasino = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${"user/alloted-casino-list"}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    try {
      setCasino(res?.data?.data);
      userType == 4
        ? res?.data?.data.map((res) => {
            setData((prev) => {
              return {
                ...prev,
                [`is${res.name.replace(" ", "")}Allowed`]: false,
              };
            });
          })
        : res?.data?.data.map((res) => {
            setData((prev) => {
              return {
                ...prev,
                [`is${res.name.replace(" ", "")}Allowed`]: res.active,
              };
            });
          });
      // res?.data?.data.map((res) => {
      //   setData((prev) => {
      //     return {
      //       ...prev,
      //       [`is${res.name.replace(" ", "")}Allowed`]: res.active,
      //     };
      //   });
      // });
    } catch (error) {}
  };

  useEffect(() => {
    if (userType == 4) {
      setCasionCheck(false);
    } else {
      setCasionCheck(true);
    }
    getCasino();
  }, [userType]);
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

          <Form.Item name="username" label="User Name">
            <div className={errorData?.username ? "col-input2" : "col-input"}>
              <Input
                placeholder="User Name"
                name="username"
                value={data.username}
                // onChange={handleChange}
                onChange={(e) =>
                  !e.target.value.includes(" ") && handleChange(e)
                }
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
          <Form.Item
            label={
              <div style={{ display: "flex", gap: "20px" }}>
                <p style={{ margin: 0 }}>User ID</p>
                <span style={{ color: "red" }}>{useraChecker}</span>
              </div>
            }
          >
            <div className={errorData?.userId ? "col-input2" : "col-input"}>
              <Input
                placeholder="User ID"
                type="text"
                name="userId"
                value={data.userId}
                onChange={(e) => {
                  userChecker({ userId: e.target.value });
                  !e.target.value.includes(" ") && handleChange(e);
                }}
                // onKeyUp={(e) => userChecker({ userId: e.target.value })}
              />
              {errorData?.userId ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <div className={errorData?.userId ? "col-input2" : "col-input"}>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              {errorData?.password ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
          <Form.Item name="city" label="City:">
            <div
              className={
                Boolean(
                  Object.entries(errorData).filter(([_, v]) => v === true)
                    ?.length
                ) && !data.city
                  ? "col-input3"
                  : "col-input"
              }
            >
              <Input
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
          </Form.Item>

          <Form.Item label="Mobile Number:">
            <div
              className={
                Boolean(
                  Object.entries(errorData).filter(([_, v]) => v === true)
                    ?.length
                ) && !data.mobile
                  ? "col-input3"
                  : "col-input"
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
          {userType === "4" ? (
            <Form.Item label="App Url:">
              <div className={errorData?.appId ? "col-input2" : "col-input"}>
                <Select
                  // defaultValue={"Select App Url"}
                  value={data.appId || "Select App Url"}
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
                // defaultValue={"Select User Type"}
                value={data.userRole || ""}
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
        </div>
        <div className="right-col-section">
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
                    value={Math.abs(data.sportPartnership)}
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
                Our :
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
          <Form.Item
            label="Casino Partnership With No Return:"
            name="casinoPartnership"
          >
            <div
              className={
                errorData?.casinoPartnership ? "col-input2" : "col-input"
              }
            >
              <Input
                placeholder="Casino Partnership With No Return"
                type="number"
                name="casinoPartnership"
                value={Math.abs(data?.casinoPartnership)}
                onChange={handleChange}
              />
              {errorData?.casinoPartnership ? (
                <RxCross2 style={{ paddingRight: "10px", color: "red" }} />
              ) : (
                ""
              )}
            </div>
          </Form.Item>
          {/* <Form.Item
            name="liveCasinoLock"
            label="Live Casino"
            style={{ marginTop: "0px" }}
          >
            <Switch
              size="small"
              disabled={userType === "4" ? false : casinoStatus}
              checked={data.liveCasinoLock}
              onChange={swtchChangeHandle}
              style={{ marginTop: "-2px" }}
            />
            <span style={{ paddingLeft: "10px" }}>
              {data.liveCasinoLock ? "On" : "Off"}
            </span>
          </Form.Item> */}

          <Form.Item
            name="oddLossCommission"
            label="Match Commission"
            style={{ marginTop: "0px" }}
          >
            <div
              className={
                errorData.oddLossCommission ? "col-input2" : "col-input"
              }
            >
              <Select
                // defaultValue={"Select User Type"}
                value={data.oddLossCommission || "Match Commission"}
                name="oddLossCommission"
                onChange={(e) => {
                  handleSelectChange(e, "oddLossCommission");
                }}
              >
                <Select.Option value={"0.0"}>0.0</Select.Option>
                <Select.Option value={0.5}>0.5</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={1.5}>1.5</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={2.5}>2.5</Select.Option>
                <Select.Option value={3}>3</Select.Option>
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            name="fancyLossCommission"
            label="Session Commission"
            style={{ marginTop: "0px" }}
          >
            <div
              className={
                errorData.fancyLossCommission ? "col-input2" : "col-input"
              }
            >
              <Select
                // defaultValue={"Select User Type"}
                value={data.fancyLossCommission || "Session Commission"}
                name="fancyLossCommission"
                onChange={(e) => {
                  handleSelectChange(e, "fancyLossCommission");
                }}
              >
                <Select.Option value={"0.0"}>0.0</Select.Option>
                <Select.Option value={0.5}>0.5</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={1.5}>1.5</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={2.5}>2.5</Select.Option>
                <Select.Option value={3}>3</Select.Option>
              </Select>
              {/* <Select
                placeholder="Session Commission"
                name="fancyLossCommission"
                value={data?.fancyLossCommission}
                onChange={handleChange}
                type="number"
                
              /> */}
            </div>
          </Form.Item>
          <Form.Item
            name="casinoCommission"
            label="Casino Commission"
            style={{ marginTop: "0px" }}
          >
            <div
              className={
                errorData.casinoCommission ? "col-input2" : "col-input"
              }
            >
              <Select
                // defaultValue={"Select User Type"}
                value={data.casinoCommission || "Casino Commission"}
                name="casinoCommission"
                onChange={(e) => {
                  handleSelectChange(e, "casinoCommission");
                }}
              >
                <Select.Option value={"0.0"}>0.0</Select.Option>
                <Select.Option value={0.5}>0.5</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={1.5}>1.5</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={2.5}>2.5</Select.Option>
                <Select.Option value={3}>3</Select.Option>
              </Select>
              {/* <Select
                placeholder="Session Commission"
                name="fancyLossCommission"
                value={data?.fancyLossCommission}
                onChange={handleChange}
                type="number"
                
              /> */}
            </div>
          </Form.Item>
          <div className="check-box-div">
            {casino?.map((key) => {
              return (
                <Form.Item
                  name="liveCasinoLock"
                  label={key.name}
                  style={{ marginTop: "0px" }}
                >
                  <Switch
                    size="small"
                    disabled={casionCheck}
                    checked={data[`is${key.name.replace(" ", "")}Allowed`]}
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          [`is${key.name.replace(" ", "")}Allowed`]:
                            !prev[`is${key.name.replace(" ", "")}Allowed`],
                        };
                      })
                    }
                    style={{ marginTop: "-2px" }}
                  />

                  <span style={{ paddingLeft: "10px" }}>
                    {data[`is${key.name.replace(" ", "")}Allowed`]
                      ? "On"
                      : "Off"}
                  </span>
                </Form.Item>
              );
            })}
          </div>
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
            <Button type="primary" htmlType="submit" className="btnu">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Accountform;
