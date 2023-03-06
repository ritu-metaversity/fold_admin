import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import Mainlayout from "../../common/Mainlayout";
import CasionCard from "../../components/casionCard/CasionCard";
import { Casino_Card_Data } from "../../routes/Routes";

const Casion = () => {
  const [CasionCardData, setCasionCardData] = useState([]);
  const [searchparam] = useSearchParams();
  const casinoId = searchparam.get("casino-id");
  // console.log(casinoId, "casinoid");
  const { setLoading } = useContext(LoaderContext);

  const CasinoData = async () => {
    setLoading((prev) => ({ ...prev, CasinoData: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Casino_Card_Data}`,
        {
          id: casinoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCasionCardData(res.data.data);
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, CasinoData: false }));

    // setLoading(false);
  };
  useEffect(() => {
    CasinoData();
  }, [casinoId]);
  return (
    <Mainlayout>
      <div className="casino-container">
        {["1", "2", "3", "4", "5", "6", "7"].map((res) => {
          return (
            <>
              <CasionCard data={CasionCardData} />
            </>
          );
        })}
      </div>
    </Mainlayout>
  );
};

export default Casion;
