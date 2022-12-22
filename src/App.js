////styles

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ActiveUser from "./pages/activeUser/ActiveUser";
import CreateAccount from "./pages/createAccounts/CreateAccount";
import AccountsList from "./pages/acountList/AccountList";
import Bank from "./pages/bank/Bank";
import Loginform from "./components/form/Form";
import Login from "./pages/login/Login";
import {
  AccountList_Screen,
  ActiveUser_Screen,
  Bank_Screen,
  CreatAaccounts_Screen,
  Home_Screen,
  MarketAnalysis_Screen,
} from "./routes/Routes";
import { createContext, useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    const x = localStorage.getItem("token");
    if (!x && pathname !== "/") {
      // window.location.replace("/");
      nav("/");
    }
  }, []);

  return (
    <Routes>
      <Route path={CreatAaccounts_Screen} element={<CreateAccount />}></Route>
      <Route path={MarketAnalysis_Screen} element={<Dashboard />}></Route>
      <Route path={ActiveUser_Screen} element={<ActiveUser />}></Route>
      <Route path={AccountList_Screen} element={<AccountsList />}></Route>
      <Route path={Bank_Screen} element={<Bank />}></Route>
      <Route path={Home_Screen} element={<Login />}></Route>
    </Routes>
  );
}

export default App;
