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
import Loginform from "./components/form/Form";
import Login from "./pages/login/Login";
import CurrentBets from "./pages/currentBets/CurrentBets";

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
  Widrwal_Pending_Request,
} from "./routes/Routes";
import BetHistory from "./pages/betHistory/BetHistory";
import { createContext, useEffect, useState } from "react";
import CreateDomain from "./pages/createDomain/CreateDomain";
import Testmatch from "./pages/testMatch/Testmatch";
import NoteFound from "./pages/noteFound/NoteFound";
import { Card, Modal, Spin } from "antd";
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
import axios from "axios";

export const LoaderContext = createContext({
  loading: {},
  setLoading: null,
});
function App() {
  // const { pathname } = useLocation();

  const [loading, setLoading] = useState({});
  const nav = useNavigate();
  const loc = useLocation();
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

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {!Object.keys(loading).every((key) => loading[key] === false) && (
        <div className="loader-container">
          <img src={loader} alt="" height={60} width={60} />
        </div>
      )}
      <Routes>
        <Route path={CreatAaccounts_Screen} element={<CreateAccount />}></Route>
        <Route path={MarketAnalysis_Screen} element={<Dashboard />}></Route>
        <Route path={ActiveUser_Screen} element={<ActiveUser />}></Route>
        <Route path={AccountList_Screen} element={<AccountsList />}></Route>
        <Route path={Bank_Screen} element={<Bank />}></Route>
        <Route path={Home_Screen} element={<Login />}></Route>
        <Route path={currentsBets_Screen} element={<CurrentBets />}></Route>
        <Route path={BetHistory_Screen} element={<BetHistory />}></Route>
        <Route path={CreateDomain_Screen} element={<CreateDomain />}></Route>
        <Route path={TestMatch_Screen} element={<Testmatch />}></Route>
        <Route path={Change_Password} element={<ChangePasswordLogin />}></Route>
        <Route path={Payment_Method} element={<PaymentMethodPage />}></Route>
        <Route path={Banner_Update} element={<Banner />}></Route>
        <Route path={Bank_Method} element={<BankPage />}></Route>
        <Route path={Upi_Method} element={<Upi />}></Route>
        <Route path={Qr_Method} element={<QR />}></Route>
        <Route path={Power_List_Screen} element={<PoerList />}></Route>
        <Route path={Account_Statement} element={<AccountStatement />}></Route>
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
    </LoaderContext.Provider>
  );
}

export default App;
