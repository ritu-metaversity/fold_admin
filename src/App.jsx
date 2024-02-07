/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ActiveUser from "./pages/activeUser/ActiveUser.jsx";
import CreateAccount from "./pages/createAccounts/CreateAccount.jsx";
import CreateAccountCommission from "./pages/createAccounts/CreateAccountCommision.jsx";

import AccountsList from "./pages/acountList/AccountList.jsx";
import Bank from "./pages/bank/Bank.jsx";
import Login from "./pages/login/Login.jsx";
import CurrentBets from "./pages/currentBets/CurrentBets.jsx";
import "./components/font.css";
import "react-toastify/dist/ReactToastify.css";
import {
  AccountList_Screen,
  Account_Statement,
  ActiveUser_Screen,
  Bank_Method,
  Bank_Screen,
  Banner_Update,
  BetHistory_Screen,
  Casino_Screen,
  Change_Password,
  CreatAaccounts_Screen,
  CreateDomain_Screen,
  currentsBets_Screen,
  Deposit_Pending_Request,
  Home_Screen,
  MarketAnalysis_Screen,
  // Party_Win_Lose,
  Payment_Method,
  Power_List_Screen,
  Profite_Loss,
  Qr_Method,
  Setting_Screen,
  Socila_Media_Manager_Screen,
  TestMatch_Screen,
  Token_Checker,
  Upi_Method,
  User_Balance,
  User_History,
  Widrwal_Pending_Request,
  Down_Line_ActiveUser,
  Down_Line_ActiveList,
  Dashboard_Screen,
  Casino_Type_Screen,
  isSelf,
  get_msg,
  withdraw_Rejected,
  deposite_Rejected,
  create_Helper,
  StatementPage,
  HelperActiveUser_Screen,
  add_withdrawal_Screen,
  add_withdrawal_SubAdmin_Screen,
  add_Deposit_Methods,
  add_Deposit_Screen,
  Multiple_login,
  Casion_amount,
  Create_Ledeger,
  Create_RollBack,
  CreatAaccounts_Commission_Screen,
  Create_Ledeger2,
  Create_RollBack2,
  Casino_leader,
  Create_Casino,
  setCommision,
} from "./routes/Routes.js";
import BetHistory from "./pages/betHistory/BetHistory.jsx";
import { createContext, useEffect, useState } from "react";
import CreateDomain from "./pages/createDomain/CreateDomain.jsx";
import Testmatch from "./pages/testMatch/Testmatch.jsx";
import NoteFound from "./pages/noteFound/NoteFound.jsx";
import loader from "./assets/img/loder.svg";
import ChangePasswordLogin from "./pages/chnagePassworldLogin/ChangePasswordLogin.jsx";
import PaymentMethodPage from "./pages/paymentMethod/PaymentMethod.jsx";
import Banner from "./pages/banner/Banner.jsx";
import BankPage from "./pages/bankMethod/BankPage.jsx";
import Upi from "./pages/bankMethod/Upi.jsx";
import QR from "./pages/bankMethod/Qr.jsx";
import PoerList from "./pages/powerList/PowerList.jsx";
import AccountStatement from "./pages/accountStatement/AccountStatement.jsx";
import DepositPendingRequest from "./pages/depoitPending/DepositPendingRequest.jsx";
import WidrwalPendingRequest from "./pages/widrwalPendingRequest/WidrwalPendingRequest.jsx";
import { OfflineAlert } from "./axiosInstance.jsx";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import UserHistory from "./pages/userHistory/UserHistory.jsx";
import Casion from "./pages/Casino/Casion.jsx";
import Mainlayout from "./common/Mainlayout.jsx";
import ProfiteLoss from "./pages/Profite&Lose/ProfiteLoss.jsx";
// import PartyWinLose from "./pages/partyWinLose/PartyWinLose";
import { ToastContainer } from "react-toastify";
import Setting from "./pages/settingPage/Setting.jsx";
import SocialMediaManager from "./pages/socialMedia/SocialMediaManager.jsx";
import DownList from "./pages/downLine/DownLine.jsx";
// import dayjs from "dayjs";
import MarketAnalysis from "./pages/marketAnalyisis/MarketAnalysis.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import CasinoType from "./pages/casionType/CasinoType.jsx";
import WithdrawalRejected from "./pages/withdrawalRejected/WithdrawalRejected.jsx";
import DepositeRejected from "./pages/depositeRejected/DepositeRejected.jsx";
import CreateHelper from "./pages/createHelper/CreateHelper.jsx";
import ApprovedByStatement from "./pages/statement/ApprovedByStatement.jsx";
import HelperActiveUser from "./pages/heplerActiveUser/HelperActiveUser.jsx";
import AddWithdrawal from "./pages/addWithdrawal/index.jsx";
import AddWithdrawalSub from "./pages/addWithdrawalSub/index.jsx";
import AddDepositMethods from "./pages/addDepositMethods/index.jsx";
import AddDepositMethodAdmin from "./pages/addDepositMethodAdmin/index.jsx";
import MultipleLogin from "./pages/multipleLogin/index.jsx";
import CasinoAmount from "./pages/casinoAmount/index.jsx";
import CreateLedeger from "./pages/CraeteLeader/index.jsx";
import CreateRollBack from "./pages/createRollBack/index.jsx";
import Leadeger from "./pages/leadeger/index.jsx";
import CasinoLeader from "./pages/leadeger/CasinoLeadeger.jsx";
import CreateCasino from "./pages/createCasino/CreateCasino.jsx";
import SetCommission from "./pages/setCommission/SetCommission.jsx";
export const LoaderContext = createContext({
  loading: {},
  userBalance: () => {},
  userBalanceamount: 0,
  setLoading: null,
  handle: null,
  refershNow: () => {},
  keyNew: 0,
});
// dayjs.locale("hi");

function App() {
  useEffect(() => {
    window.localStorage.removeItem("passwordtype");
  }, []);
  const [userBalanceamount, setUserBalance] = useState("");
  const [loading, setLoading] = useState({});
  const [keyNew, setKeyNew] = useState(0);
  const [tokenState, setTokenState] = useState(false);
  const [IsSelfState, setIsSelf] = useState("");
  const [logo, setlogo] = useState("");
  const [message, setmessage] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const host = window.location.hostname;
  const refershNow = () => {
    setKeyNew((prev) => prev + 1);
  };

  const tokenChecker = async (state = false) => {
    if (state) setTokenState(false);
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Token_Checker}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          // nav("/marketAnalysis")
        } else {
          nav("/");
        }
        // setUserBalance(res.data?.data?.balance);
      })
      .catch((error) => {});
    if (state) setTokenState(true);
  };

  const userBalance = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${User_Balance}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUserBalance(res.data?.data?.balance);
      })
      .catch((error) => {});
  };
  const redirect = {
    DEPOSIT: "Deposit-Pending-Request",
    WITHDRAW: "Widrwal-Pending-Request",
    ALL: "Deposit-Pending-Request",
    USER_LOCK: HelperActiveUser_Screen,
    ACTIVE_USER: HelperActiveUser_Screen,
    // BET_LOCK:""
  };
  useEffect(() => {
    const x = localStorage.getItem("token");
    const permission = JSON?.parse(
      localStorage.getItem("poweruser_permisions") || "[]"
    );

    if (x) {
      if (loc?.pathname === "/") {
        nav(redirect[permission[0]]);
      }
    } else {
      nav("/");
    }
  }, []);

  useEffect(() => {
    if (!["/", "/" + Change_Password].includes(loc.pathname)) {
      tokenChecker(true);
    }
    const timer = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        if (!["/", "/" + Change_Password].includes(loc.pathname))
          tokenChecker();
      } else {
        // setIsSignedIn(false);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [loc.pathname]);

  const handle = useFullScreenHandle();

  const isSelfData = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${isSelf}`,
        { appUrl: host === "localhost" ? "admin.localhost" : host },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setIsSelf(res.data?.data?.selfAllowed);
        setlogo(res.data?.data?.logo);
      })
      .catch((error) => {});
  };

  const getMsg = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${get_msg}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setmessage(res?.data?.message);
      });
  };

  useEffect(() => {
    getMsg();
    isSelfData();
  }, [tokenState]);

  const userType = localStorage.getItem("userType");
  return (
    // <ConfigProvider locale={locale}>
    <LoaderContext.Provider
      value={{
        userBalance,
        userBalanceamount,
        loading,
        setLoading,
        handle,
        refershNow,
        keyNew,
      }}
    >
      <ToastContainer />
      {!Object.keys(loading).every((key) => loading[key] === false) && (
        <div className="loader-container">
          <img src={loader} alt="" height={60} width={60} />
        </div>
      )}
      <FullScreen handle={handle}>
        <OfflineAlert />
        <Routes>
          <Route
            path={Home_Screen}
            element={<Login logo={logo} message={message} />}
          ></Route>

          <Route
            path={Change_Password}
            element={<ChangePasswordLogin />}
          ></Route>
          <Route
            path="/"
            element={
              <Mainlayout
                view={tokenState}
                IsSelfState={IsSelfState}
                logo={logo}
                message={message}
              />
            }
          >
            {userType === "5" && (
              <>
                <Route
                  path={StatementPage}
                  element={<ApprovedByStatement />}
                ></Route>
              </>
            )}
            <>
              <Route path={ActiveUser_Screen} element={<ActiveUser />}></Route>
              <Route
                path={AccountList_Screen}
                element={<AccountsList />}
              ></Route>
              {isSelf && (
                <Route path={setCommision} element={<SetCommission />}></Route>
              )}
            </>
            <Route
              path={HelperActiveUser_Screen}
              element={<HelperActiveUser />}
            ></Route>
            <Route path={Multiple_login} element={<MultipleLogin />}></Route>
            <Route path={Casion_amount} element={<CasinoAmount />}></Route>

            {userType !== "7" && (
              <>
                <Route exact path={Dashboard_Screen} element={<Dashboard />} />
                <Route
                  exact
                  path={CreatAaccounts_Screen}
                  element={<CreateAccount IsSelfState={IsSelfState} />}
                />
                <Route exact path={create_Helper} element={<CreateHelper />} />
                <Route
                  path={MarketAnalysis_Screen}
                  element={<MarketAnalysis />}
                ></Route>
                <Route path={Profite_Loss} element={<ProfiteLoss />}></Route>
                <Route path={Setting_Screen} element={<Setting />}></Route>
                <Route
                  path={add_withdrawal_Screen}
                  element={<AddWithdrawal />}
                ></Route>
                <Route
                  path={add_Deposit_Screen}
                  element={<AddDepositMethodAdmin />}
                ></Route>

                <Route
                  path={add_withdrawal_SubAdmin_Screen}
                  element={<AddWithdrawalSub />}
                ></Route>
                <Route
                  path={add_Deposit_Methods}
                  element={<AddDepositMethods />}
                ></Route>
                <Route
                  path={CreatAaccounts_Commission_Screen}
                  element={<CreateAccountCommission />}
                ></Route>

                <Route path={Bank_Screen} element={<Bank />}></Route>
                <Route
                  path={currentsBets_Screen}
                  element={<CurrentBets />}
                ></Route>
                <Route
                  path={BetHistory_Screen}
                  element={<BetHistory />}
                ></Route>
                <Route
                  path={Socila_Media_Manager_Screen}
                  element={<SocialMediaManager />}
                ></Route>
                <Route
                  path={CreateDomain_Screen}
                  element={<CreateDomain />}
                ></Route>
                <Route
                  path={TestMatch_Screen + "/:sportId/:id"}
                  element={<Testmatch />}
                ></Route>
                <Route path={User_History} element={<UserHistory />}></Route>
                <Route path={Banner_Update} element={<Banner />}></Route>
                <Route path={Bank_Method} element={<BankPage />}></Route>
                <Route path={Upi_Method} element={<Upi />}></Route>
                <Route path={Qr_Method} element={<QR />}></Route>
                <Route path={Power_List_Screen} element={<PoerList />}></Route>

                <Route
                  path={Create_Ledeger}
                  element={<CreateLedeger />}
                ></Route>
                <Route path={Casino_leader} element={<CasinoLeader />}></Route>
                <Route
                  path={Create_RollBack}
                  element={<CreateRollBack />}
                ></Route>
                <Route path={Create_Ledeger2} element={<Leadeger />}></Route>
                <Route
                  path={Create_RollBack2}
                  element={<CreateRollBack />}
                ></Route>
                <Route path={Create_Casino} element={<CreateCasino />}></Route>

                <Route
                  path={Down_Line_ActiveUser + ":id"}
                  element={<DownList apiState={true} />}
                ></Route>
                <Route
                  path={Down_Line_ActiveList + ":id"}
                  element={<DownList apiState={false} />}
                ></Route>
                <Route
                  path={Account_Statement}
                  element={<AccountStatement />}
                ></Route>
                <Route
                  path={Casino_Type_Screen}
                  element={<CasinoType />}
                ></Route>
                <Route
                  path={Casino_Screen + "/:id"}
                  element={<Casion />}
                ></Route>
                <Route
                  path={Payment_Method}
                  element={<PaymentMethodPage />}
                ></Route>
              </>
            )}
            {/* <Route path={Party_Win_Lose} element={<PartyWinLose />}></Route> */}
            <Route
              path={Widrwal_Pending_Request}
              element={<WidrwalPendingRequest />}
            ></Route>
            <Route
              path={withdraw_Rejected}
              element={<WithdrawalRejected />}
            ></Route>
            <Route
              path={deposite_Rejected}
              element={<DepositeRejected />}
            ></Route>
            <Route
              path={Deposit_Pending_Request}
              element={<DepositPendingRequest />}
            ></Route>
          </Route>
          <Route path="*" element={<NoteFound />} />
        </Routes>
      </FullScreen>
    </LoaderContext.Provider>
    // </ConfigProvider>
  );
}

export default App;
