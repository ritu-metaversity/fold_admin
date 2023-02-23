import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Fancy_Pnl } from "../../routes/Routes";
import FancyRow from "./FancyRow";
////
import "./styles.scss";

const FancyTable = ({ data, prev }) => {
  const [searchparam] = useSearchParams();
  const [fancyPnldata, setFancyPnldata] = useState([]);
  const id = searchparam.get("event-id");
  const getfancyPnl = async () => {
    const data = { matchId: id };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/${Fancy_Pnl}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFancyPnldata(res?.data?.data);
        console.log(res?.data?.data, "pnl");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("getfancy pnl");
      getfancyPnl();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div className="collapse-table-container">
        <div
          className="row"
          style={{
            display: "flex",
            height: "32px",
            alignItems: "center",
          }}
        >
          <div className="left-col-fancy" style={{ opacity: "0" }}></div>
          <div className="colwrapper">
            <div
              className="middle-col-fancy"
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "5px",
              }}
            >
              <Button
                className="header-btn"
                style={{
                  height: "32px",

                  background: "#E16F9A",
                }}
              >
                No
              </Button>
              <Button
                className="header-btn"
                style={{
                  height: "32px",
                  background: "#4FA1DC",
                }}
              >
                Yes
              </Button>
            </div>
            <div
              className="right-col-fancy"
              style={{ opacity: "0", display: "flex", flexWrap: "wrap" }}
            >
              min:100 max:1l
            </div>
          </div>
        </div>

        {data?.map((item, rowIndex, index) => {
          // console.log(item, "tem");
          let bet = 0;
          if (Object.keys(fancyPnldata).includes(item.sid)) {
            bet = fancyPnldata[item.sid];
          }
          return (
            <React.Fragment key={item?.sid + rowIndex.sid + index}>
              <FancyRow data={item} prev={prev[rowIndex]} bet={bet} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FancyTable;
