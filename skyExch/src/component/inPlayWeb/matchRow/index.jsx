import React from "react";
////styles
import "./styles.scss";
import InPlayOddsBtn from "../inPlayOddsBtn";
import pin from "../../../assets/img/pin3.svg";
const InPlayMatchRow = () => {
  return (
    <div className="in-play-match-row">
      <div className="in-play-match-row-left-col">
        <div className="match-name">
          <p>Central Zone vs Central Zone</p>
          <p>In-Play</p>
        </div>
        <span>PTEO</span>
      </div>
      <div className="in-play-match-row-right-col">
        <ul>
          <li>
            <InPlayOddsBtn bg="#72bbef" />
            <InPlayOddsBtn bg="#faa9ba" />
          </li>
          <li>
            <InPlayOddsBtn bg="#72bbef" />
            <InPlayOddsBtn bg="#faa9ba" />
          </li>
          <li>
            <InPlayOddsBtn bg="#72bbef" />
            <InPlayOddsBtn bg="#faa9ba" />
          </li>
        </ul>
      </div>
      <div className="pin-icon">
        <img src={pin} alt="" />
      </div>
    </div>
  );
};

export default InPlayMatchRow;
