import React, { useContext, useEffect, useMemo, useState } from "react";
import { Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import "./styles.scss";
import {
  Create_Power_user,
  Left_Event_Menu,
  Log_Out,
  Payment_List,
} from "../../routes/Routes";
import axios from "axios";
import { FaCalendarDay, FaImage } from "react-icons/fa";
import { LoaderContext } from "../../App";

const SiderBar = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const { setLoading, refershNow } = useContext(LoaderContext);
  const [paymentListData, setPaymentListData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const logout = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Log_Out}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading((prev) => ({ ...prev, logout: false }));
        navigate("/");
        localStorage.clear();
        message.success(res.data.message);
      })
      .catch((error) => {
        message.error(error.response?.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, logout: false }));
          navigate("/");
          localStorage.removeItem("token");
        }
      });
    setLoading((prev) => ({ ...prev, logout: false }));
    //
  };

  const CreatePowerUser = async () => {
    setLoading((prev) => ({ ...prev, CreatePowerUser: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Create_Power_user}`,
        {},
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
        message.error(error.response?.data.message);
        if (error.response.status === 401) {
          setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
          navigate("/");
          localStorage.removeItem("token");
        }
      });
    setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };

  const paymentMethod = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Payment_List}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setPaymentListData(res.data.data);
      })
      .catch((error) => {
        // message.error(error.response?.data.message);
        // if (error.response.status === 401) {
        //   setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };
  useEffect(() => {
    if (userType == 5) {
      paymentMethod();
    }
  }, []);
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        CreatePowerUser: false,
      }));
    };
  }, []);

  const leftEventMenu = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Left_Event_Menu}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setEventData(res.data.data);
      })
      .catch((error) => {
        // message.error(error.response?.data.message);
        // if (error.response.status === 401) {
        //   setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };
  useEffect(() => {
    leftEventMenu();
  }, []);

  const UrlArray = [
    "/Upi_Method_Screen",
    "/Bank_Method_Screen",
    "/Qr_Method_Screen",
  ];
  const payment_list = [];
  paymentListData?.map((res) => {
    payment_list.push({
      key: res?.id + 2 + res?.methodName,
      label: (
        <Link onClick={refershNow} to={UrlArray[res?.id - 1]}>
          <span style={{ fontSize: "14px" }}>{res?.methodName}</span>
        </Link>
      ),
    });
  });

  const item = useMemo(
    () => [
      // {
      //   key: "1",
      //   icon: <AiFillDashboard />,
      //   label: (
      //     <Link onClick={refershNow}
      // to="" style={{ color: "white" }}>
      //       Dashboard
      //     </Link>
      //   ),
      // },
      {
        key: 2,
        icon: <TbBrandGoogleAnalytics />,
        label: (
          <Link
            onClick={refershNow}
            to="/marketanalysis"
            // reloadDocument={pathname === "/marketanalysis"}
          >
            Market Analysis
          </Link>
        ),
      },
      {
        key: 3,
        icon: <RiAccountCircleFill />,
        label: "Account",
        children: [
          {
            key: 4,
            label: (
              <Link
                onClick={refershNow}
                to="/activeUser"
                // reloadDocument={pathname === "/activeUser"}
                // onChange={() => handleChangeLink(4)}
              >
                <p className="acount-list">Account List for Active Users</p>
              </Link>
            ),
          },
          userType == "5"
            ? {
                key: 5,
                label: (
                  <Link
                    onClick={refershNow}
                    to="/Power_List_Screen"
                    // reloadDocument={pathname === "/Power_List_Screen"}
                  >
                    Helper List
                  </Link>
                ),
              }
            : "",
          {
            key: 67,
            label: (
              <Link
                onClick={refershNow}
                to="/accountList"
                // reloadDocument={pathname === "/accountList"}
              >
                Account List
              </Link>
            ),
          },

          {
            key: 6,
            label: (
              <Link
                onClick={refershNow}
                to="/createAccounts"
                // reloadDocument={pathname === "/createAccounts"}
              >
                Create Account
              </Link>
            ),
          },
          userType == "5"
            ? {
                key: 23,
                label: <span onClick={CreatePowerUser}>Create Helper</span>,
              }
            : "",
          userType == "4"
            ? {
                key: 7,
                label: (
                  <Link
                    onClick={refershNow}
                    to="/createdomain"
                    // reloadDocument={pathname === "/createdomain"}
                  >
                    Create Domain
                  </Link>
                ),
              }
            : "",
        ],
      },
      {
        key: 8,
        icon: <RiBankFill />,
        label: (
          <Link
            onClick={refershNow}
            to="/bank"
            // reloadDocument={pathname === "/bank"}
          >
            Bank
          </Link>
        ),
      },
      userType == 5 || userType == 7
        ? {
            key: 76,
            icon: <RiAccountCircleFill />,
            label: "Payment",
            children: [
              {
                key: 79,
                label: (
                  <Link
                    onClick={refershNow}
                    to="/Deposit-Pending-Request"
                    // reloadDocument={pathname === "/Deposit-Pending-Request"}
                  >
                    <span style={{ fontSize: "14px" }}>
                      Pending deposit request
                    </span>
                  </Link>
                ),
              },
              {
                key: 90,
                label: (
                  <Link
                    onClick={refershNow}
                    to="/Widrwal-Pending-Request"
                    // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                  >
                    <span style={{ fontSize: "14px" }}>
                      Pending Withdraw request
                    </span>
                  </Link>
                ),
              },
            ],
          }
        : "",
      userType == "5"
        ? {
            key: 9,
            icon: <RiBankFill />,
            label: "Add Payment Method",
            children: payment_list,
          }
        : "",
      userType == "4"
        ? {
            key: 10,
            icon: <FaImage />,
            label: (
              <Link
                onClick={refershNow}
                to="/Update-Banner"
                // reloadDocument={pathname === "/Update-Banner"}
              >
                Banner
              </Link>
            ),
          }
        : "",
      {
        key: 11,
        icon: <TbFileReport />,
        label: "Report",
        children: [
          {
            key: 45,

            label: (
              <Link
                onClick={refershNow}
                to="/account-Statement"
                // reloadDocument={pathname === "/account-Statement"}
              >
                Account Statement
              </Link>
            ),
          },
          {
            key: 12,

            label: (
              <Link
                onClick={refershNow}
                to="/currentsBets"
                // reloadDocument={pathname === "/currentsBets"}
              >
                Current Bets
              </Link>
            ),
          },
          {
            key: 13,

            label: (
              <Link
                onClick={refershNow}
                to="/betHistory"
                // eloadDocument={pathname === "/betHistory"}
              >
                Bets History
              </Link>
            ),
          },
          {
            key: 35,

            label: (
              <Link
                onClick={refershNow}
                to="/User-History"
                // eloadDocument={pathname === "/betHistory"}
              >
                User History
              </Link>
            ),
          },
        ],
      },
      {
        key: 174,
        icon: <FaCalendarDay />,
        label: <span>Event </span>,
        children: eventData?.map((res) => {
          return {
            key: res.sportName + res.sportId + res.totalMatch,

            label: (
              <Link
                onClick={refershNow}
                to=""
                // reloadDocument={pathname === "/account-Statement"}
                style={{ color: "white" }}
              >
                {res.sportName}
              </Link>
            ),
            children: res.matchList?.map((list) => {
              return {
                key: list.date + list.matchId + list.matchName,
                label: (
                  <Link
                    onClick={refershNow}
                    to={`/test-match-screen/?event-id=${list?.matchId}`}
                  >
                    <p style={{ margin: "0px" }}>
                      {list.matchName}

                      <span style={{ fontSize: "12px" }}>({list.date})</span>
                    </p>
                  </Link>
                ),
              };
            }),
          };
        }),
      },
      {
        style: { aligItems: "flex-start" },
        key: 17,
        icon: <CiLogout style={{ marginBottom: "200px" }} />,
        label: (
          <span
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "200px",
            }}
            onClick={logout}
          >
            Log Out
          </span>
        ),
      },
    ],
    [eventData]
  );

  return (
    <>
      <Menu
        theme="dark"
        style={{ width: 256 }}
        items={item}
        mode="inline"
        className="sider-bar"
      ></Menu>
    </>
  );
};

export default SiderBar;
