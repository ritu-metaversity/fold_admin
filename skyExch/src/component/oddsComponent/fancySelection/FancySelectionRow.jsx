import BackBtn from "../oddsBtn/BackBtn";
import ques from "../../../assets/img/ques2.svg";

////style
import "./styles.scss";
const FancySelectionRow = () => {
  return (
    <div>
      <div className="game-name">
        <p>name</p>
        <p>
          <img src={ques} alt="" />
        </p>
      </div>
      <div className="fancy-selection-row">
        <div className="fancy-selection-left-col">{name}</div>
        <div className="fancy-selection-right-col">
          <BackBtn bg="#72bbef" />
          <BackBtn bg="#faa9ba" />
        </div>
      </div>
    </div>
  );
};

export default FancySelectionRow;
