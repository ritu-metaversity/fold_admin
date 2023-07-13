import { MdRefresh } from "react-icons/md";
import pin from "../../../assets/img/pin2.svg";
///styles
import "./styles.scss";
const GameDetailTabs = () => {
  return (
    <div className="game-detail-tabs">
      <ul>
        <li>
          <img src={pin} alt="" />
          Pin
        </li>
        <li>
          <MdRefresh /> Refresh
        </li>
      </ul>
    </div>
  );
};

export default GameDetailTabs;
