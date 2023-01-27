import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { Button, message, Result, Spin, Tabs } from "antd";
import Datatable from "../../components/table/marketAnalysis/MarketAnalysis";
import { useNavigate } from "react-router-dom";

///styles
import "./styles.scss";
import { Active_Sport_List, DASHBOARD } from "../../routes/Routes";
import { LoaderContext } from "../../App";
const Dashboard = () => {
  const [tab1, settab1] = useState(4);
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
          if (res.data) {
            setCricket(res.data.data);
          } else {
            setCricket([]);
            navigate("/");
            setloader(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setLoading((prev) => ({ ...prev, marketAnalysisTable: false }));
            navigate("/");
            localStorage.removeItem("token");
            navigate("/");
            message.error(error.response.data.message);
          }
          if (error.message === "Request failed with status code 401") {
          }
        });
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
      setLoading((prev) => ({ ...prev, marketAnalysisgetData: false }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Active_Sport_List}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.data) {
            setSports(res.data.data);
          } else {
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        });
      setLoading((prev) => ({ ...prev, marketAnalysisgetData: false }));
    };
    getData();
  }, []);
  const items = sports?.map((res) => {
    return {
      label: res?.sportName,
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
        <Datatable rowLength={4} data={cricket} />
      ),
    };
  });

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
