import pin from "../../../assets/img/pin3.svg";
import clock from "../../../assets/img/clock.svg";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

////styles
import "./styles.scss";
const FancySelectionHeading = () => {
  return (
    <div className="fancy-heading">
      <ul>
        <li>
          <img src={pin} alt="" />
        </li>
        <li>
          <span>
            <img src={clock} alt="" />
          </span>
          <p>fancy bet</p>
        </li>
        <li>
          <HiOutlineQuestionMarkCircle />
        </li>
      </ul>
    </div>
  );
};

export default FancySelectionHeading;
