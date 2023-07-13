import play from "../../assets/img/play.svg";
import listPin from "../../assets/img/listpin.svg";
import listb from "../../assets/img/listb.svg";

///styles
import "./styles.scss";

const HighLightList = () => {
  return (
    <div className="high-light-list-container">
      <div className="high-light-left-col">
        <div className="high-light-top-col">
          <ul>
            <li>
              <img src={play} alt="" />
            </li>
            <li></li>
            <li>
              <img src={listb} alt="" />
            </li>
            <li className="in-play">In-Play</li>
          </ul>
        </div>
        <div className="high-light-bottom-col">
          <p>Nepal vs West Indies Nepal vs West IndiesNepal vs West IndiesNepal vs West IndiesNepal vs West IndiesNepal vs West Indies</p>
        </div>
      </div>
      <div className="high-light-right-col">
        <img src={listPin} alt="" />
      </div>
    </div>
  );
};

export default HighLightList;
