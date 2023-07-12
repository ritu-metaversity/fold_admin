import BackBtn from "../oddsBtn/BackBtn";
// import LayBtn from "../oddsBtn/LayBtn";


////styles
import "./styles.scss";

const SelectionRow = ({ name }) => {
  return (
    <div>
      <div className="selection-row">
        <div className="selection-left-col">{name}</div>
        <div className="selection-right-col">
          <BackBtn bg="#72bbef" />
          <BackBtn bg="#faa9ba" />
        </div>
      </div>
    </div>
  );
};

export default SelectionRow;
