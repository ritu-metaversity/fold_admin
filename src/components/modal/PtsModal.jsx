/* eslint-disable react-hooks/exhaustive-deps */
import { Radio } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import { Get_Pts_Data } from "../../routes/Routes";
import PtsModaltable from "./PtsModalTable";

const PtsModal = ({ id, remark, setPtsdata, ptsdata, search }) => {
  const [value, setValue] = useState(1);
  const { setLoading } = useContext(LoaderContext);

  const [soda, setSoda] = useState("");
  const [bets, setBets] = useState("");

  useEffect(() => {
    const getPtsData = async (id) => {
      setLoading((prev) => ({ ...prev, getPtsData: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Get_Pts_Data}`,
          { marketId: id, userId: search, betType: value },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setPtsdata(res?.data?.data?.betList);
          setSoda(res?.data?.data?.totalStake);
          setBets(res?.data?.data?.totalBets);
        })
        .catch((erro) => {});
      setLoading((prev) => ({ ...prev, getPtsData: false }));
    };
    getPtsData(id);
  }, [value]);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <p className="radio-filter-remark">{remark}</p>
      <div className="radio-filter-col">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>All</Radio>
          <Radio value={2}>Back</Radio>
          <Radio value={3}>Lay</Radio>
        </Radio.Group>
        <p>
          Total Soda: <span style={{ color: "green" }}>{bets}</span> Total
          Amount:
          <span style={{ color: "green" }}>{soda}</span>
        </p>
      </div>
      <div className="table-col">
        <PtsModaltable data={ptsdata} />
      </div>
    </div>
  );
};

export default PtsModal;
