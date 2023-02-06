import React, { useContext, useEffect, useState } from "react";
import { Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { TbBrandGoogleAnalytics, TbFileReport } from "react-icons/tb";
import { RiAccountCircleFill, RiBankFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import "./styles.scss";
import { Create_Power_user, Log_Out, Payment_List } from "../../routes/Routes";
import axios from "axios";
import { MdOutlinePayment } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { LoaderContext } from "../../App";
const { SubMenu } = Menu;
const SiderBar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const { loading, setLoading } = useContext(LoaderContext);
  const [paymentListData, setPaymentListData] = useState([]);

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
        <Link to={UrlArray[res?.id - 1]}>
          <span style={{ fontSize: "14px" }}>{res?.methodName}</span>
        </Link>
      ),
    });
  });

  const item = [
    // {
    //   key: "1",
    //   icon: <AiFillDashboard />,
    //   label: (
    //     <Link to="" style={{ color: "white" }}>
    //       Dashboard
    //     </Link>
    //   ),
    // },
    {
      key: 2,
      icon: <TbBrandGoogleAnalytics />,
      label: <Link to="/marketanalysis">Market Analysis</Link>,
    },
    {
      key: 3,
      icon: <RiAccountCircleFill />,
      label: "Accounts",
      children: [
        {
          key: 4,
          label: (
            <Link to="/activeUser">
              <p className="acount-list">Accounts List for Active Users</p>
            </Link>
          ),
        },
        userType == "5"
          ? {
              key: 5,
              label: <Link to="/Power_List_Screen">Helper List</Link>,
            }
          : "",
        {
          key: 67,
          label: <Link to="/accountList">Accounts List</Link>,
        },

        {
          key: 6,
          label: <Link to="/createAccounts">Create Accounts</Link>,
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
              label: <Link to="/createdomain">Create Domain</Link>,
            }
          : "",
      ],
    },
    {
      key: 8,
      icon: <RiBankFill />,
      label: <Link to="/bank">Bank</Link>,
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
                <Link to="/Deposit-Pending-Request">
                  <span style={{ fontSize: "14px" }}>
                    Pending deposit request
                  </span>
                </Link>
              ),
            },
            {
              key: 90,
              label: (
                <Link to="/Widrwal-Pending-Request">
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
          label: <Link to="/Update-Banner">Banner</Link>,
        }
      : "",
    {
      key: 11,
      icon: <TbFileReport />,
      label: "Report",
      children: [
        {
          key: 45,

          label: <Link to="/account-Statement">Account Statement</Link>,
        },
        {
          key: 12,

          label: <Link to="/currentsBets">Current Bets</Link>,
        },
        {
          key: 13,

          label: <Link to="/betHistory">Bets History</Link>,
        },
      ],
    },
    {
      key: 17,
      icon: <CiLogout />,
      label: <span onClick={logout}>Log Out</span>,
    },
  ];

  return (
    <div>
      <Menu
        theme="dark"
        style={{ width: 256 }}
        items={item}
        mode="inline"
        className="sider-bar"
      ></Menu>
    </div>
  );
};

export default SiderBar;
