import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import Datatable from "../../components/table/marketAnalysis/MarketAnalysis";

///styles
import "./styles.scss";
import { Active_Sport_List, MarketAnalysisApi } from "../../routes/Routes";
import { LoaderContext } from "../../App";
const MarketAnalysis = () => {
  const [tab1, settab1] = useState(4);
  const [cricket, setCricket] = useState([]);
  const [sports, setSports] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const tabledata = async () => {
      const data = {
        data: { id: tab1 },
      };
      setLoading((prev) => ({ ...prev, marketAnalysisTable: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${MarketAnalysisApi}`,
          data.data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setCricket(res?.data?.data);
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, marketAnalysisTable: false }));
    };
    tabledata();
  }, [tab1, setLoading]);

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
  }, [setLoading]);
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
  }, [setLoading]);

  return (
    <>
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
    </>
  );
};

export default MarketAnalysis;
