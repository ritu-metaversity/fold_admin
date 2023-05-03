import React from "react";
import userIcon from "../../assets/img/user-icon.png";
const TopWinnerCard = () => {
  return (
    <>
      <div className="_card">
        <div className="_playerImg">
          <img src={userIcon} alt="" width="100%" />
        </div>
        <div className="playerholder">
          <div className="playername">
            <b>Player</b>
            <p>JO****</p>
          </div>
          <div className="time">
            <b>Time</b>
            <p>00:20</p>
          </div>
          <div className="playername">
            <b>Win Amount</b>
            <p>2,30,75000.00</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopWinnerCard;
