import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import {
  binary_Screen,
  cricket_Screen,
  game_Detail,
  home_Screen,
  in_Play_Mobile,
  in_Play_Web,
  login_Screen,
  multi_Market,
  sports_Screen,
} from "./pagesRoutes";
import Binary from "../pages/binary";
import Sports from "../pages/sports";
import GameDetail from "../pages/gameDetail";

import InPlayMobile from "../pages/inPlayMobile";
import InPlayWeb from "../pages/inPlayWeb";
import NoteFound from "../pages/notFound";
import ChildLayout from "../common/ChildLayout";
import MultiMarket from "../pages/multiMarket";
import SubChildLayout from "../common/SubChildLayout";
import Cricket from "../pages/cricket";

const common = [
  {
    path: home_Screen,
    element: <Home />,
  },
];

const mobilePath = [
  {
    path: game_Detail,
    element: <GameDetail />,
  },
  {
    path: in_Play_Mobile,
    element: <InPlayMobile />,
  },
  {
    path: sports_Screen,
    element: <Sports />,
  },
  ...common,
];

const webPath = [
  ...common,

  {
    path: "/",
    element: <ChildLayout />,
    children: [
      {
        path: in_Play_Web,
        element: <InPlayWeb />,
      },
      {
        path: "/",
        element: <SubChildLayout />,
        children: [
          {
            path: multi_Market,
            element: <MultiMarket />,
          },
          {
            path: cricket_Screen,
            element: <Cricket />,
          },
        ],
      },
      {
        path: binary_Screen,
        element: <Binary />,
      },
    ],
  },
];

const getRouter = (useBreakPointRef) => {
  return createBrowserRouter([
    { path: login_Screen, element: <LoginPage /> },
    {
      path: home_Screen,
      element: <MainLayout />,
      children: useBreakPointRef ? mobilePath : webPath,
    },
    { path: "*", element: <NoteFound /> },
  ]);
};

export default getRouter;
