import { Button } from "antd";
import dataIcon from "../../../assets/img/dataicon.svg";
import graph from "../../../assets/img/graph.svg";

/////styles
import "./styles.scss";
const SelectionHeading = () => {
  return (
    <div className="selection-heading-container">
      <ul>
        <li>
          <img src={dataIcon} alt="" />
        </li>
        <li>
          <p>
            <img src={graph} alt="" />
          </p>
          <p>
            <span>Matched</span>
            <strong id="totalMatched">PTE 1,332,510</strong>
          </p>
        </li>
      </ul>
      <div className="back-lay-btn-div">
        <button>back</button>
        <button>lay</button>
      </div>
    </div>
  );
};

export default SelectionHeading;
