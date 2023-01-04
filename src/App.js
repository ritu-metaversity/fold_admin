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
  ActiveUser_Screen,
  Bank_Screen,
  BetHistory_Screen,
  CreatAaccounts_Screen,
  CreateDomain_Screen,
  currentsBets_Screen,
  Home_Screen,
  MarketAnalysis_Screen,
  TestMatch_Screen,
} from "./routes/Routes";
import BetHistory from "./pages/betHistory/BetHistory";
import { useEffect } from "react";
import CreateDomain from "./pages/createDomain/CreateDomain";
import Testmatch from "./pages/testMatch/Testmatch";

function App() {
  // const { pathname } = useLocation();
  const [searchparam] = useSearchParams();
  const id = searchparam.get("event-id");
  console.log(id);
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    const x = localStorage.getItem("token");
    console.log(x);
    if (x) {
      if (loc.pathname === "/") {
        nav("/marketAnalysis");
      }
    } else {
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
      <Route path={currentsBets_Screen} element={<CurrentBets />}></Route>
      <Route path={BetHistory_Screen} element={<BetHistory />}></Route>
      <Route path={CreateDomain_Screen} element={<CreateDomain />}></Route>
      <Route path={TestMatch_Screen} element={<Testmatch />}></Route>
    </Routes>
  );
}

export default App;
