import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { Button, message, Result, Spin, Tabs } from "antd";
import Datatable from "../../components/table/marketAnalysis/MarketAnalysis";
import { useNavigate } from "react-router-dom";
import interceptor from "../../axiosInstance";

///styles
import "./styles.scss";
import { Active_Sport_List, DASHBOARD } from "../../routes/Routes";
import { LoaderContext } from "../../App";
const Dashboard = () => {
  const [tab1, settab1] = useState(4);
  const [tabValue, settabValue] = useState("cricket");
  const [cricket, setCricket] = useState([]);
  const [sports, setSports] = useState([]);
  const [loader, setloader] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  const data = {
    data: { id: tab1 },
  };

  useEffect(() => {
    const tabledata = async (data) => {
      setLoading((prev) => ({ ...prev, marketAnalysisTable: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${DASHBOARD}`, data.data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setCricket(res?.data?.data);
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.status === 401) {
          //   setLoading((prev) => ({ ...prev, marketAnalysisTable: false }));
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, marketAnalysisTable: false }));
    };
    tabledata(data);
  }, [tab1]);

  const onChange = (activeKey) => {
    console.log(activeKey);
    // this.setState({ activeKey });
    if (activeKey) {
      settab1(activeKey);
    }
    settabValue();
  };

  useEffect(() => {
    const getData = async () => {
      setLoading((prev) => ({ ...prev, marketAnalysisgetData: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Active_Sport_List}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setSports(res?.data?.data);
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.status === 401) {
          //   setLoading((prev) => ({ ...prev, marketAnalysisgetData: false }));
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, marketAnalysisgetData: false }));
    };
    getData();
  }, []);
  const obj = {
    4: 4,
    1: 62,
    2: 2,
    3: 5,
    1477: 54,
    6: 3,
    7: 10,
    8: 16,
    27454571: 11,
  };
  const items = sports?.map((res) => {
    return {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <i className={`d-icon icon-${obj[res.sportId]}`}></i>
          {res?.sportName}
        </div>
      ),

      key: res?.sportId,

      children: loader ? (
        <Spin
          style={{
            position: "absolute",
            left: "50%",
            top: "35%",
            height: "31px",
            width: "31px",
          }}
        />
      ) : (
        <Datatable name={res.sportName} rowLength={4} data={cricket} />
      ),
    };
  });

  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        marketAnalysisgetData: false,
        marketAnalysisTable: false,
      }));
    };
  }, []);

  return (
    <>
      <Mainlayout>
        <div className="markettable">
          <Tabs
            defaultActiveKey={tab1}
            type="card"
            tabIndex={tab1}
            // size={size}
            onChange={onChange}
            items={items}
          ></Tabs>
        </div>
      </Mainlayout>
    </>
  );
};

export default Dashboard;
