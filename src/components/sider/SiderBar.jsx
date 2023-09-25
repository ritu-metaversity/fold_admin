/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Menu, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import { ImDice } from "react-icons/im";
import { CiLogout } from "react-icons/ci";
import "./styles.scss";
import {
  Casino_Screen,
  Casino_Type_Screen,
  Casino_leader,
  Casion_amount,
  Casiono,
  CreatAaccounts_Commission_Screen,
  Create_Ledeger,
  Create_Ledeger2,
  Create_RollBack,
  Create_RollBack2,
  Dashboard_Screen,
  HelperActiveUser_Screen,
  Left_Event_Menu,
  Log_Out,
  Multiple_login,
  Payment_List,
  Profite_Loss,
  Setting_Screen,
  Socila_Media_Manager_Screen,
  StatementPage,
  add_Deposit_Methods,
  add_Deposit_Screen,
  add_withdrawal_Screen,
  add_withdrawal_SubAdmin_Screen,
} from "../../routes/Routes";
import axios from "axios";
import { FaCalendarDay, FaCoins, FaImage } from "react-icons/fa";
import { LoaderContext } from "../../App";
import { notifyToast } from "../toast/Tost";
import { AiFillDashboard, AiFillFacebook } from "react-icons/ai";
import LogoutModal from "../logoutModal/LogoutModal";
import { HiUserGroup } from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md";

const filterPermission = (item, permissions) => {
  let newItem = [];
  newItem = item.filter((itemEle) => {
    const isThere = Array.isArray(itemEle.permissions)
      ? itemEle.permissions.some((element) => permissions.includes(element))
      : false;
    if (Array.isArray(itemEle.children)) {
      itemEle.children = filterPermission(itemEle.children, permissions);
    }
    return isThere;
  });

  return newItem;
};

const SiderBar = ({ IsSelfState, setSidebar }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const { setLoading, refershNow } = useContext(LoaderContext);
  const [paymentListData, setPaymentListData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [casionDataState, setCasionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuKey, setMenuKey] = useState("");
  const [nestedMenuKey, setNestedMenuKey] = useState("");
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
        notifyToast().succes(res.data.message);
      })
      .catch((error) => {});

    setLoading((prev) => ({ ...prev, logout: false }));
    //
  };
  const findPermission = JSON.parse(
    localStorage.getItem("poweruser_permisions") || "[]"
  );

  // const CreatePowerUser = async () => {
  //   setLoading((prev) => ({ ...prev, CreatePowerUser: true }));
  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/${Create_Power_user}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.status) {
  //         tableDataRef();
  //         notifyToast().succes(res.data.message);
  //       }
  //     })
  //     .catch((error) => {});
  //   setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  // };

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
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };
  useEffect(() => {
    if (userType === "5") {
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
  }, [setLoading]);

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
      .catch((error) => {});
    // setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };

  const CasionData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casiono}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setCasionData(res.data.data);
      })
      .catch((error) => {});
    // setLoading((prev) => ({ ...prev, CreatePowerUser: false }));
  };

  useEffect(() => {
    CasionData();
    leftEventMenu();
  }, []);

  const UrlArray = [
    "/Upi_Method_Screen",
    "/Bank_Method_Screen",
    "/Qr_Method_Screen",
  ];
  const payment_list = paymentListData?.map((res) => {
    return {
      key: res?.id + 2 + res?.methodName,
      label: (
        <Link onClick={refershNow} to={UrlArray[res?.id - 1]}>
          <span style={{ fontSize: "14px" }}>{res?.methodName}</span>
        </Link>
      ),
      permissions: ["ADMIN"],
    };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    logout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const accounts = useMemo(
    () => ({
      key: 3,
      icon: <RiAccountCircleFill />,
      label: "Account",
      permissions: [
        "ALL",
        "ADMIN",
        "USER_PASSWORD_CHANGE",
        "USER_LOCK",
        "BET_LOCK",
        "ACTIVE_USER",
      ],
      children: [
        {
          key: 4,
          label: (
            <Link
              onClick={() => {
                refershNow();
                setSidebar();
              }}
              to="/activeUser"
              // reloadDocument={pathname === "/activeUser"}
              // onChange={() => handleChangeLink(4)}
            >
              <p className="acount-list">Account List for Active Users</p>
            </Link>
          ),
          permissions: ["ADMIN"],
        },
        {
          key: 4,
          label: (
            <Link
              onClick={() => {
                refershNow();
                setSidebar();
              }}
              to={HelperActiveUser_Screen}
              // reloadDocument={pathname === "/activeUser"}
              // onChange={() => handleChangeLink(4)}
            >
              <p className="acount-list">Account List for Active Users</p>
            </Link>
          ),
          permissions: [
            "ALL",
            "USER_PASSWORD_CHANGE",
            "BET_LOCK",
            "USER_LOCK",
            "ACTIVE_USER",
          ],
        },

        userType === "5" && IsSelfState
          ? {
              key: 5,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to="/Power_List_Screen"
                  // reloadDocument={pathname === "/Power_List_Screen"}
                >
                  Helper List
                </Link>
              ),
              permissions: ["ADMIN"],
            }
          : "",
        {
          key: 67,
          label: (
            <Link
              onClick={() => {
                refershNow();
                setSidebar();
              }}
              to="/accountList"
              // reloadDocument={pathname === "/accountList"}
            >
              Account List
            </Link>
          ),
          permissions: ["ALL", "ADMIN", "USER_LOCK", "BET_LOCK"],
        },

        {
          key: 6,
          label: (
            <Link
              onClick={() => {
                refershNow();
                setSidebar();
              }}
              to="/createAccounts"
              // reloadDocument={pathname === "/createAccounts"}
            >
              Create Account
            </Link>
          ),
          permissions: ["ADMIN"],
        },
        userType == 4
          ? {
              key: 6343,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to={CreatAaccounts_Commission_Screen}
                  // reloadDocument={pathname === "/createAccounts"}
                >
                  Create Commission
                </Link>
              ),
              permissions: ["ADMIN"],
            }
          : {},

        userType === "5" && IsSelfState
          ? {
              key: 23,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to="/create-helper"
                  // reloadDocument={pathname === "/createdomain"}
                >
                  Create Helper
                </Link>
              ),
              permissions: ["ADMIN"],
            }
          : "",
        userType === "4"
          ? {
              key: 7,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to="/createdomain"
                  // reloadDocument={pathname === "/createdomain"}
                >
                  Create Domain
                </Link>
              ),
              permissions: ["ADMIN"],
            }
          : "",
      ],
    }),
    [eventData, CasionData]
  );
  const item = useMemo(
    () =>
      userType === "7"
        ? [
            {
              key: 76,
              icon: <RiAccountCircleFill />,
              label: "Payment",
              permissions: ["ALL", "DEPOSIT", "WITHDRAW", "ADMIN"],
              children: [
                {
                  key: 79,
                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/Deposit-Pending-Request"
                      // reloadDocument={pathname === "/Deposit-Pending-Request"}
                    >
                      <span style={{ fontSize: "14px" }}>
                        Pending deposit request
                      </span>
                    </Link>
                  ),
                  permissions: ["ALL", "DEPOSIT", "ADMIN"],
                },
                {
                  key: 90,
                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/Widrwal-Pending-Request"
                      // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                    >
                      <span style={{ fontSize: "14px" }}>
                        Pending Withdraw request
                      </span>
                    </Link>
                  ),
                  permissions: ["ALL", "WITHDRAW", "ADMIN"],
                },
                {
                  key: 95,
                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/deposit-Rejected"
                      // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                    >
                      <span style={{ fontSize: "13px" }}>
                        Deposite Rejected/ Success
                      </span>
                    </Link>
                  ),
                  permissions: ["ALL", "DEPOSIT", "ADMIN"],
                },
                {
                  key: 93,
                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/Widrwal-Rejected"
                      // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                    >
                      <span style={{ fontSize: "13px" }}>
                        Withdraw Rejected/ Success
                      </span>
                    </Link>
                  ),
                  permissions: ["ALL", "WITHDRAW", "ADMIN"],
                },
              ],
            },
            accounts,
          ]
        : [
            {
              key: "1",
              icon: <AiFillDashboard />,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to={Dashboard_Screen}
                  // reloadDocument={pathname === "/marketanalysis"}
                >
                  Dashboard
                </Link>
              ),
              permissions: ["ADMIN"],
            },
            {
              key: 2,
              icon: <TbBrandGoogleAnalytics />,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to="/marketAnalysis"
                  // reloadDocument={pathname === "/marketanalysis"}
                >
                  Market Analysis
                </Link>
              ),
              permissions: ["ADMIN"],
            },
            accounts,
            {
              key: 8,
              icon: <RiBankFill />,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to="/bank"
                  // reloadDocument={pathname === "/bank"}
                >
                  Bank
                </Link>
              ),
              permissions: ["ADMIN"],
            },

            ...(IsSelfState && userType === "7"
              ? [
                  {
                    key: 76,
                    icon: <RiAccountCircleFill />,
                    label: "Payment",
                    children: [
                      {
                        key: 79,
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to="/Deposit-Pending-Request"
                            // reloadDocument={pathname === "/Deposit-Pending-Request"}
                          >
                            <span style={{ fontSize: "14px" }}>
                              Pending deposit request
                            </span>
                          </Link>
                        ),
                        permissions: ["ALL", "DEPOSIT", "ADMIN"],
                      },
                      {
                        key: 90,
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to="/Widrwal-Pending-Request"
                            // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                          >
                            <span style={{ fontSize: "14px" }}>
                              Pending Withdraw request
                            </span>
                          </Link>
                        ),
                        permissions: ["ALL", "WITHDRAW", "ADMIN"],
                      },
                      {
                        key: 95,
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to="/deposit-Rejected"
                            // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                          >
                            <span style={{ fontSize: "13px" }}>
                              Deposite Rejected/ Success
                            </span>
                          </Link>
                        ),
                        permissions: ["ALL", "DEPOSIT", "ADMIN"],
                      },
                      {
                        key: 93,
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to="/Widrwal-Rejected"
                            // reloadDocument={pathname === "/Widrwal-Pending-Request"}
                          >
                            <span style={{ fontSize: "13px" }}>
                              Withdraw Rejected/ Success
                            </span>
                          </Link>
                        ),
                        permissions: ["ALL", "WITHDRAW", "ADMIN"],
                      },
                    ],
                  },
                ]
              : []),
            // userType === "5" && [
            //   // {
            //   //   key: 9,
            //   //   icon: <RiBankFill />,
            //   //   label: "Add Payment Method",
            //   //   children: payment_list,
            //   //   permissions: ["ADMIN"],
            //   // },
            //   {
            //     key: 10,
            //     icon: <FaImage />,
            //     label: (
            //       <Link
            //         onClick={() => {
            //           refershNow();
            //           setSidebar();
            //         }}
            //         to={StatementPage}
            //         // reloadDocument={pathname === "/Update-Banner"}
            //       >
            //         Power Statement
            //       </Link>
            //     ),
            //     permissions: ["ADMIN"],
            //   },
            // ],
            ...(userType === "5" && IsSelfState
              ? [
                  // {
                  //   key: 9,
                  //   icon: <RiBankFill />,
                  //   label: "Add Deposit Method",
                  //   children: payment_list,
                  //   permissions: ["ADMIN"],
                  // },
                  {
                    key: 9678,
                    icon: <RiBankFill />,
                    label: (
                      <Link
                        onClick={() => {
                          refershNow();
                          setSidebar();
                        }}
                        to={add_withdrawal_SubAdmin_Screen}
                        // reloadDocument={pathname === "/Update-Banner"}
                      >
                        Add Withdrawal Method
                      </Link>
                    ),
                    // children: payment_list,
                    permissions: ["ADMIN"],
                  },
                  {
                    key: 968,
                    icon: <RiBankFill />,
                    label: (
                      <Link
                        onClick={() => {
                          refershNow();
                          setSidebar();
                        }}
                        to={add_Deposit_Methods}
                        // reloadDocument={pathname === "/Update-Banner"}
                      >
                        Add Deposit Methods
                      </Link>
                    ),
                    // children: payment_list,
                    permissions: ["ADMIN"],
                  },
                ]
              : []),
            ...(userType === "4"
              ? [
                  {
                    key: 10,
                    icon: <FaImage />,
                    label: (
                      <Link
                        onClick={() => {
                          refershNow();
                          setSidebar();
                        }}
                        to="/Update-Banner"
                        // reloadDocument={pathname === "/Update-Banner"}
                      >
                        Banner
                      </Link>
                    ),
                    permissions: ["ADMIN"],
                  },
                  {
                    key: 92324,
                    icon: <RiBankFill />,
                    label: "Setting",
                    permissions: ["ADMIN"],
                    children: [
                      {
                        key: "565656",
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to={Setting_Screen}
                            // reloadDocument={pathname === "/Update-Banner"}
                          >
                            Social Media Icon Uplaod
                          </Link>
                        ),
                        permissions: ["ADMIN"],
                      },
                      {
                        key: "5656",
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to={Casino_Type_Screen}
                            // reloadDocument={pathname === "/Update-Banner"}
                          >
                            Casino Image type
                          </Link>
                        ),
                        permissions: ["ADMIN"],
                      },
                      {
                        key: "566",
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to={add_withdrawal_Screen}
                            // reloadDocument={pathname === "/Update-Banner"}
                          >
                            Add Withdrawal Method
                          </Link>
                        ),
                        permissions: ["ADMIN"],
                      },
                      {
                        key: "5676",
                        label: (
                          <Link
                            onClick={() => {
                              refershNow();
                              setSidebar();
                            }}
                            to={add_Deposit_Screen}
                            // reloadDocument={pathname === "/Update-Banner"}
                          >
                            Add Deposit Method
                          </Link>
                        ),
                        permissions: ["ADMIN"],
                      },
                    ],
                  },
                ]
              : []),

            {
              key: 11,
              icon: <TbFileReport />,
              label: "Report",
              permissions: ["ADMIN"],
              children: [
                userType === "5" && IsSelfState
                  ? {
                      key: 10,
                      // icon: <FaImage />,
                      label: (
                        <Link
                          onClick={() => {
                            refershNow();
                            setSidebar();
                          }}
                          to={StatementPage}
                          // reloadDocument={pathname === "/Update-Banner"}
                        >
                          Helper Statement
                        </Link>
                      ),
                      permissions: ["ADMIN"],
                    }
                  : "",

                {
                  key: 45,

                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/account-Statement"
                      // reloadDocument={pathname === "/account-Statement"}
                    >
                      Account Statement
                    </Link>
                  ),
                  permissions: ["ADMIN"],
                },
                {
                  key: 12,

                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/currentsBets"
                      // reloadDocument={pathname === "/currentsBets"}
                    >
                      Current Bets
                    </Link>
                  ),
                  permissions: ["ADMIN"],
                },
                {
                  key: 13,

                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/betHistory"
                      // eloadDocument={pathname === "/betHistory"}
                    >
                      Bets History
                    </Link>
                  ),
                  permissions: ["ADMIN"],
                },
                {
                  key: 35,

                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to="/User-History"
                      // eloadDocument={pathname === "/betHistory"}
                    >
                      User History
                    </Link>
                  ),
                  permissions: ["ADMIN"],
                },
                {
                  key: 52,

                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to={Profite_Loss}
                      // eloadDocument={pathname === "/betHistory"}
                    >
                      Profite & Loss
                    </Link>
                  ),
                  permissions: ["ADMIN"],
                },
                // {
                //   key: 523,

                //   label: (
                //     <Link
                //       onClick={refershNow}
                //       to={Party_Win_Lose}
                //       // eloadDocument={pathname === "/betHistory"}
                //     >
                //       Party Win Lose
                //     </Link>
                //   ),
                // },
              ],
              // permissions: ["ADMIN"],
            },
            {
              key: 174,
              icon: <FaCalendarDay />,
              label: <span>Event</span>,
              permissions: ["ADMIN"],
              children: eventData?.map((res) => {
                return {
                  key: res.sportName + res.sportId + res.totalMatch,

                  label: (
                    <span
                      // onClick={refershNow}
                      // to=""
                      // reloadDocument={pathname === "/account-Statement"}
                      style={{ color: "white" }}
                    >
                      {res?.sportName} ({res?.totalMatch})
                    </span>
                  ),
                  permissions: ["ADMIN"],

                  children: res.matchList?.map((list) => {
                    return {
                      key: list.date + list.matchId + list.matchName,
                      permissions: ["ADMIN"],

                      label: (
                        <Link
                          onClick={() => {
                            refershNow();
                            setSidebar();
                          }}
                          to={`/Detail/${res?.sportId}/${list?.matchId}`}
                        >
                          <p style={{ margin: "0px" }}>
                            {list.matchName}

                            <span style={{ fontSize: "12px" }}>
                              ({list.date})
                            </span>
                          </p>
                        </Link>
                      ),
                    };
                  }),
                };
              }),
            },

            {
              key: 687,
              icon: <ImDice />,
              label: "Casino",
              permissions: ["ADMIN"],

              children: casionDataState?.map((res, index) => {
                // console.log(casionData);

                return {
                  key: 458 + index,
                  permissions: ["ADMIN"],
                  label: (
                    <Link
                      onClick={() => {
                        refershNow();
                        setSidebar();
                      }}
                      to={`${Casino_Screen}/${res?.id}`}
                      // reloadDocument={pathname === "/account-Statement"}
                    >
                      {res.name}
                    </Link>
                  ),
                };
              }),
            },
            userType === "4" && {
              key: 132,
              icon: <HiUserGroup />,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to={Multiple_login}
                  // reloadDocument={pathname === "/account-Statement"}
                >
                  Multiple Login
                </Link>
              ),
              permissions: ["ADMIN"],
            },
            userType === "4" && {
              key: 132,
              icon: <FaCoins />,
              label: (
                <Link
                  onClick={() => {
                    refershNow();
                    setSidebar();
                  }}
                  to={Casion_amount}
                  // reloadDocument={pathname === "/account-Statement"}
                >
                  Casino Amount
                </Link>
              ),
              permissions: ["ADMIN"],
            },
            userType === "5" &&
              IsSelfState && {
                key: 172,
                icon: <AiFillFacebook />,
                label: (
                  <Link
                    onClick={() => {
                      refershNow();
                      setSidebar();
                    }}
                    to={Socila_Media_Manager_Screen}
                    // reloadDocument={pathname === "/account-Statement"}
                  >
                    Social Media Manager
                  </Link>
                ),
                permissions: ["ADMIN"],
              },

            userType == 4
              ? {
                  style: { aligItems: "flex-start" },
                  key: 1976,
                  icon: <MdLeaderboard />,
                  permissions: ["ADMIN"],
                  label: "Post Leadeger",

                  children: [
                    {
                      key: 19746,
                      icon: <MdLeaderboard />,
                      label: (
                        <Link to={Create_Ledeger}>
                          <span
                            style={{
                              display: "block",
                              textAlign: "left",
                            }}
                            // onClick={showRollBackModal}
                            // onClick={logout}
                          >
                            Cricket
                          </span>
                        </Link>
                      ),
                      permissions: ["ADMIN"],
                    },
                    {
                      key: 1946,
                      icon: <MdLeaderboard />,
                      label: (
                        <Link to={Create_Ledeger2}>
                          <span
                            style={{
                              display: "block",
                              textAlign: "left",
                            }}
                            // onClick={showRollBackModal}
                            // onClick={logout}
                          >
                            Tennis / Football
                          </span>
                        </Link>
                      ),
                      permissions: ["ADMIN"],
                    },
                    {
                      key: 1943346,
                      icon: <MdLeaderboard />,
                      label: (
                        <Link to={Casino_leader}>
                          <span
                            style={{
                              display: "block",
                              textAlign: "left",
                            }}
                            // onClick={showRollBackModal}
                            // onClick={logout}
                          >
                            Casino
                          </span>
                        </Link>
                      ),
                      permissions: ["ADMIN"],
                    },
                    {
                      key: 19376,
                      icon: <MdLeaderboard />,
                      label: (
                        <Link to={Create_RollBack}>
                          <span
                            style={{
                              display: "block",
                              textAlign: "left",
                            }}
                            // onClick={showRollBackModal}
                            // onClick={logout}
                          >
                            Create Rollback
                          </span>
                        </Link>
                      ),
                      permissions: ["ADMIN"],
                    },
                  ],
                }
              : {},
            {
              style: { aligItems: "flex-start" },
              key: 17,
              permissions: ["ADMIN"],
              icon: <CiLogout style={{ marginBottom: "200px" }} />,
              label: (
                <span
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginBottom: "200px",
                  }}
                  onClick={showModal}
                  // onClick={logout}
                >
                  Log Out
                </span>
              ),
            },
          ],
    [eventData, CasionData]
  );
  const handleClick = (key) => {
    if (key) {
      if (key[2]) {
        if (Number(key[2])) {
          setMenuKey(key[2]);
        } else {
          setNestedMenuKey(key[2]);
        }
      } else {
        setNestedMenuKey("");

        setMenuKey(key[0]);
      }
    }
  };
  // console.log(filterPermission(item, findPermission), findPermission);

  return (
    <>
      <LogoutModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      {/* <Modal
        title="Create Ledeger Rollback"
        open={rollBack}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      > */}
      {/* </Modal> */}
      <Menu
        theme="dark"
        style={{ width: 256 }}
        items={filterPermission(item, findPermission)}
        mode="inline"
        openKeys={[menuKey, nestedMenuKey]}
        // onChange={handleClick}
        onOpenChange={handleClick}
        className="sider-bar"
      ></Menu>
    </>
  );
};

export default SiderBar;
