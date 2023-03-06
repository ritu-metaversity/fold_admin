import React from "react";
import { IoIosMedical } from "react-icons/io";
import { useMediaQuery } from "../modalForm/UseMedia";
import "./styles.scss";
const CasionCard = ({ data }) => {
  console.log(data);
  const isMatch = useMediaQuery("(max-width: 768px)");

  return data?.map((res) => {
    return (
      <div
        className={"casino-card"}

        // style={{
        //   backgroundImage:
        //     "url(https://d2.fawk.app/assets/images/Games/Live%20Teenpatti.png)",
        // }}
      >
        <img src={res.imageUrl} alt="" />
      </div>
    );
  });
};

export default CasionCard;
