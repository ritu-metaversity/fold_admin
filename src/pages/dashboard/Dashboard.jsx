import axios from "axios";
import React, { useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { Button, message, Result, Spin, Tabs } from "antd";
import Datatable from "../../components/table/marketAnalysis/MarketAnalysis";
import { useNavigate } from "react-router-dom";

///styles
import "./styles.scss";
import { Active_Sport_List, DASHBOARD } from "../../routes/Routes";
const Dashboard = () => {
  const [tab1, settab1] = useState(4);
  const [cricket, setCricket] = useState([]);
  const [sports, setSports] = useState([]);
  const [loader, setloader] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggle = (checked) => {
    setLoading(checked);
  };
  const navigate = useNavigate();

  const data = {
    data: { id: tab1 },
  };
  console.log(tab1);
  useEffect(() => {
    const tabledata = async (data) => {
      setloader(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${DASHBOARD}`, data.data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setloader(false);

          if (res.data) {
            setCricket(res.data.data);
          } else {
            setCricket([]);
            navigate("/");
            setloader(false);
          }
        })
        .catch((error) => {
          setloader(false);
          if (error.message === "Request failed with status code 401") {
            localStorage.removeItem("token");
            navigate("/");
            message.error(error.response.data.message);
          }
        });
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
      setloader(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Active_Sport_List}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setloader(false);
          if (res.data.data) {
            setSports(res.data.data);
          } else {
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
          setloader(false);
        });
    };
    getData();
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
          >
            {sports.map((res) => {
              return (
                <Tabs.TabPane
                  style={{ position: "relative" }}
                  tab={res.sportName}
                  key={res.sportId}
                >
                  {loader ? (
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
                  )}
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </Mainlayout>
    </>
  );
};

export default Dashboard;
