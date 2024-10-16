/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import CasionCard from "../../components/casionCard/CasionCard";
import { Bet_Casino, CasinoImage } from "../../routes/Routes";

const Casion = () => {
  const [CasionCardData, setCasionCardData] = useState([]);
  const [countData, setCountData] = useState([]);
  const { id } = useParams();
  const { setLoading } = useContext(LoaderContext);
  // const host = window.location.hostname;
  const CasinoData = async () => {
    setLoading((prev) => ({ ...prev, CasinoData: true }));
    await axios
      .get(
        `${CasinoImage}`
        // {
        //   id: id,
        //   appUrl: host,
        // }
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
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

  const CasinoBet = async () => {
    setLoading((prev) => ({ ...prev, CasinoBet: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${Bet_Casino}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCountData(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, CasinoBet: false }));
  };

  useEffect(() => {
    CasinoBet();
    CasinoData();
  }, [id]);
  return (
    <>
      <div className="casino-container">
        <CasionCard data={CasionCardData} count={countData} />
      </div>
    </>
  );
};

export default Casion;
