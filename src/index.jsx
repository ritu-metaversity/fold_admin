import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingBallSvg } from "./components/loadingBall/loadingBall";
const App = React.lazy(() => import("./App"));
// import { FullScreen } from "react-full-screen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <Suspense fallback={<LoadingBallSvg />}> */}
      <App />
    {/* </Suspense> */}
  </BrowserRouter>
);
