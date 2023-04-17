import React from "react";
import "./styles.scss";
import { FaUsers } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { FcCollaboration, FcMoneyTransfer } from "react-icons/fc";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiCoins1 } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";

const icon = {
  balance: <MdOutlineAccountBalanceWallet />,
  creditPts: <VscGraphLine />,
  points: <CiCoins1 />,
  clientPnl: <IoIosPeople />,
  availablePoints: <FcMoneyTransfer />,
  ourPartnership: <FaUsers />,
  uplinePartnership: <FcCollaboration />,
};
const DashBoardCard = ({ keys, value }) => {
  return (
    <>
      <div class="counter_section ">
        <div className="counter-section-col">
          <div class="couter_icon">{icon[keys]}</div>
          <div class="counter_no">
            <p class="total_no">{value}</p>
            <p class="head_couter">{keys}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardCard;
