////styles

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ActiveUser from "./pages/activeUser/ActiveUser";
import CreateAccount from "./pages/createAccounts/CreateAccount";
import AccountsList from "./pages/acountList/AccountList";
import Bank from "./pages/bank/Bank";
import Login from "./pages/login/Login";
import CurrentBets from "./pages/currentBets/CurrentBets";
import "./components/font.css";
import {
  AccountList_Screen,
  Account_Statement,
  ActiveUser_Screen,
  Bank_Method,
  Bank_Screen,
  Banner_Update,
  BetHistory_Screen,
  Change_Password,
  CreatAaccounts_Screen,
  CreateDomain_Screen,
  currentsBets_Screen,
  Deposit_Pending_Request,
  Home_Screen,
  MarketAnalysis_Screen,
  Payment_Method,
  Power_List_Screen,
  Qr_Method,
  TestMatch_Screen,
  Upi_Method,
  User_Balance,
  User_History,
  Widrwal_Pending_Request,
} from "./routes/Routes";
import BetHistory from "./pages/betHistory/BetHistory";
import { createContext, useEffect, useState } from "react";
import CreateDomain from "./pages/createDomain/CreateDomain";
import Testmatch from "./pages/testMatch/Testmatch";
import NoteFound from "./pages/noteFound/NoteFound";
import loader from "./assets/img/loder.svg";
import ChangePasswordLogin from "./pages/chnagePassworldLogin/ChangePasswordLogin";
import PaymentMethod from "./pages/paymentMethod/PaymentMethod";
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
export const LoaderContext = createContext({
  loading: {},
  userBalance: () => {},
  userBalanceamount: 0,
  setLoading: null,
  handle: null,
});

function App() {
  // const { pathname } = useLocation();

  const [userBalanceamount, setUserBalance] = useState("");
  const [loading, setLoading] = useState({});

  const nav = useNavigate();
  const loc = useLocation();

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
        // console.log(res.data.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const [searchParams, setSearchParams] = useSearchParams();

  const refresh = searchParams.get("first");
  useEffect(() => {
    if (refresh) {
      searchParams.set("first", false);
      setSearchParams(searchParams);
    } else if (refresh === undefined) {
      searchParams.set("first", false);
      setSearchParams(searchParams);
    }
  }, [refresh]);

  const handle = useFullScreenHandle();

  return (
    <LoaderContext.Provider
      value={{
        userBalance,
        userBalanceamount,
        loading,
        setLoading,
        handle,
      }}
    >
      {!Object.keys(loading).every((key) => loading[key] === false) && (
        <div className="loader-container">
          <img src={loader} alt="" height={60} width={60} />
        </div>
      )}
      <FullScreen handle={handle}>
        <OfflineAlert />
        <Routes
        // key={refresh}
        >
          <Route
            path={CreatAaccounts_Screen}
            element={<CreateAccount />}
            render={(props) => <CreateAccount key={Date.now()} {...props} />}
          ></Route>
          <Route path={MarketAnalysis_Screen} element={<Dashboard />}></Route>
          <Route path={ActiveUser_Screen} element={<ActiveUser />}></Route>
          <Route path={AccountList_Screen} element={<AccountsList />}></Route>
          <Route path={Bank_Screen} element={<Bank />}></Route>
          <Route path={Home_Screen} element={<Login />}></Route>
          <Route path={currentsBets_Screen} element={<CurrentBets />}></Route>
          <Route path={BetHistory_Screen} element={<BetHistory />}></Route>
          <Route path={CreateDomain_Screen} element={<CreateDomain />}></Route>
          <Route path={TestMatch_Screen} element={<Testmatch />}></Route>
          <Route
            path={Change_Password}
            element={<ChangePasswordLogin />}
          ></Route>
          <Route path={User_History} element={<UserHistory />}></Route>

          <Route path={Payment_Method} element={<PaymentMethodPage />}></Route>
          <Route path={Banner_Update} element={<Banner />}></Route>
          <Route path={Bank_Method} element={<BankPage />}></Route>
          <Route path={Upi_Method} element={<Upi />}></Route>
          <Route path={Qr_Method} element={<QR />}></Route>
          <Route path={Power_List_Screen} element={<PoerList />}></Route>
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

          <Route path="*" element={<NoteFound />} />
        </Routes>
      </FullScreen>
    </LoaderContext.Provider>
  );
}

export default App;
