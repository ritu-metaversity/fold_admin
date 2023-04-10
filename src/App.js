/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ActiveUser from "./pages/activeUser/ActiveUser";
import CreateAccount from "./pages/createAccounts/CreateAccount";
import AccountsList from "./pages/acountList/AccountList";
import Bank from "./pages/bank/Bank";
import Login from "./pages/login/Login";
import CurrentBets from "./pages/currentBets/CurrentBets";
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
} from "./routes/Routes";
import BetHistory from "./pages/betHistory/BetHistory";
import { createContext, useEffect, useState } from "react";
import CreateDomain from "./pages/createDomain/CreateDomain";
import Testmatch from "./pages/testMatch/Testmatch";
import NoteFound from "./pages/noteFound/NoteFound";
import loader from "./assets/img/loder.svg";
import ChangePasswordLogin from "./pages/chnagePassworldLogin/ChangePasswordLogin";
import PaymentMethodPage from "./pages/paymentMethod/PaymentMethod";
import Banner from "./pages/banner/Banner";
import BankPage from "./pages/bankMethod/BankPage";
import Upi from "./pages/bankMethod/Upi";
import QR from "./pages/bankMethod/Qr";
import PoerList from "./pages/powerList/PowerList";
import AccountStatement from "./pages/accountStatement/AccountStatement";
import DepositPendingRequest from "./pages/depoitPending/DepositPendingRequest";
import WidrwalPendingRequest from "./pages/widrwalPendingRequest/WidrwalPendingRequest";
import { OfflineAlert } from "./axiosInstance";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import UserHistory from "./pages/userHistory/UserHistory";
import Casion from "./pages/Casino/Casion";
import Mainlayout from "./common/Mainlayout";
import ProfiteLoss from "./pages/Profite&Lose/ProfiteLoss";
// import PartyWinLose from "./pages/partyWinLose/PartyWinLose";
import { ToastContainer } from "react-toastify";
import Setting from "./pages/settingPage/Setting";
import SocialMediaManager from "./pages/socialMedia/SocialMediaManager";
import DownList from "./pages/downLine/DownLine";
import dayjs from "dayjs";

export const LoaderContext = createContext({
  loading: {},
  userBalance: () => {},
  userBalanceamount: 0,
  setLoading: null,
  handle: null,
  refershNow: () => {},
  keyNew: 0,
});
dayjs.locale("hi");
function App() {
  const [userBalanceamount, setUserBalance] = useState("");
  const [loading, setLoading] = useState({});
  const [keyNew, setKeyNew] = useState(0);
  const [tokenState, setTokenState] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  const refershNow = () => {
    setKeyNew((prev) => prev + 1);
  };

  const tokenChecker = async (state = false) => {
    if (state) setTokenState(false);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Token_Checker}`,
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
        `${process.env.REACT_APP_BASE_URL}/${User_Balance}`,
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

  useEffect(() => {
    const x = localStorage.getItem("token");
    if (x) {
      if (loc.pathname === "/") {
        nav("/marketAnalysis");
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
    }, 5000);
    return () => clearInterval(timer);
  }, [loc.pathname]);

  const handle = useFullScreenHandle();

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
          <Route path={Home_Screen} element={<Login />}></Route>

          <Route
            path={Change_Password}
            element={<ChangePasswordLogin />}
          ></Route>
          <Route path="/" element={<Mainlayout view={tokenState} />}>
            <Route
              exact
              path={CreatAaccounts_Screen}
              element={<CreateAccount />}
            />

            <Route path={MarketAnalysis_Screen} element={<Dashboard />}></Route>
            <Route path={Profite_Loss} element={<ProfiteLoss />}></Route>
            <Route path={Setting_Screen} element={<Setting />}></Route>

            <Route path={ActiveUser_Screen} element={<ActiveUser />}></Route>
            <Route path={AccountList_Screen} element={<AccountsList />}></Route>
            <Route path={Bank_Screen} element={<Bank />}></Route>
            <Route path={currentsBets_Screen} element={<CurrentBets />}></Route>
            <Route path={BetHistory_Screen} element={<BetHistory />}></Route>
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

            <Route
              path={Payment_Method}
              element={<PaymentMethodPage />}
            ></Route>
            <Route path={Banner_Update} element={<Banner />}></Route>
            <Route path={Bank_Method} element={<BankPage />}></Route>
            <Route path={Upi_Method} element={<Upi />}></Route>
            <Route path={Qr_Method} element={<QR />}></Route>
            <Route path={Power_List_Screen} element={<PoerList />}></Route>
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
              path={Widrwal_Pending_Request}
              element={<WidrwalPendingRequest />}
            ></Route>

            <Route
              path={Deposit_Pending_Request}
              element={<DepositPendingRequest />}
            ></Route>

            <Route path={Casino_Screen + "/:id"} element={<Casion />}></Route>
            {/* <Route path={Party_Win_Lose} element={<PartyWinLose />}></Route> */}
          </Route>

          <Route path="*" element={<NoteFound />} />
        </Routes>
      </FullScreen>
    </LoaderContext.Provider>
    // </ConfigProvider>
  );
}

export default App;
