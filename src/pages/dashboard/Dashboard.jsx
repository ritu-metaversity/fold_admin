import axios from "axios";
import React, { useEffect, useState } from "react";
import Mainlayout from "../../common/Mainlayout";
import { Tabs } from "antd";
import Datatable from "../../components/table/Datatable";
import { useNavigate } from "react-router-dom";

///styles
import "./styles.scss";
import { BASE_URL } from "../../_api/_api";
import { DASHBOARD } from "../../routes/Routes";
const Dashboard = () => {
  const [tab1, settab1] = useState(4);
  const [cricket, setCricket] = useState([]);
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();

  const data = {
    data: { id: tab1 },
  };

  useEffect(() => {
    const tabledata = async (data) => {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${DASHBOARD}`, data.data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data) {
            setCricket(res.data);
          } else {
            setCricket();
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 401") {
            navigate("/");
            console.log(error);
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
      await axios
        .post(
          "http://api.a2zscore.com/admin-new-apis/sport/active-sport-list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data) {
            setSports(res.data.data);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  return (
    <>
      <Mainlayout>
        <div className="markettable">
          <Tabs
            defaultActiveKey="4"
            type="card"
            // size={size}
            onChange={onChange}
          >
            {sports.map((res) => {
              return (
                <Tabs.TabPane tab={res.sportName} key={res.sportId}>
                  <Datatable rowLength={4} data={cricket} />
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
