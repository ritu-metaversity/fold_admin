import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { Tabs } from "antd";
import Datatable from "../../components/table/marketAnalysis/MarketAnalysis";

///styles
import "./styles.scss";
import { Active_Sport_List, DASHBOARD } from "../../routes/Routes";
import { LoaderContext } from "../../App";
const Dashboard = () => {
  const [tab1, settab1] = useState(4);
  const [cricket, setCricket] = useState([]);
  const [sports, setSports] = useState([]);
  const { setLoading } = useContext(LoaderContext);

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
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, marketAnalysisTable: false }));
    };
    tabledata(data);
  }, [tab1]);

  const onChange = (activeKey) => {
    // this.setState({ activeKey });
    if (activeKey) {
      settab1(activeKey);
    }
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

      children: <Datatable name={res.sportName} rowLength={4} data={cricket} />,
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
