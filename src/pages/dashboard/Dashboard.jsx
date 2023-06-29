import React, { useContext, useEffect } from "react";
import DashBoardCard from "../../components/card/DashBoardCard";
import "./styles.scss";
import { LoaderContext } from "../../App";
import axios from "axios";
import { Dashboard_Api } from "../../routes/Routes";
import { useState } from "react";
const DashBoardPage = () => {
  const [dashBoardDataState, setDashBoardDataState] = useState({});
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const dashBoardData = async () => {
      setLoading((prev) => ({ ...prev, DasboardLoading: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Dashboard_Api}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setDashBoardDataState(res.data.data);
          //   setCricket(res?.data?.data);
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, DasboardLoading: false }));
    };
    dashBoardData();
  }, []);

  return (
    <>
      <h3 className="dashboard-heading">Dashboard</h3>
      <div className="dashboard-card-container">
        {Object.keys(dashBoardDataState).map((curElem, index) => {
          return (
            <React.Fragment
              key={curElem + index + dashBoardDataState[curElem] + "ere"}
            >
              <DashBoardCard
                keys={curElem}
                value={dashBoardDataState[curElem]}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default DashBoardPage;
