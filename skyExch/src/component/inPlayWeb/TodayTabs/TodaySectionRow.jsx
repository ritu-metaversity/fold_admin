import rightArrow from "../../../assets/img/right.png";
////style
import "./styles.scss";
const TodaySectionRow = () => {
  return (
    <div className="today-section-row-container">
      <ul>
        <li>12:04</li>
        <li>E-Soccer</li>
        <li>
          <img src={rightArrow} alt="" />
          <span>jsdfojoiadfj</span>
          <img src={rightArrow} alt="" />
        </li>
        <li>Liverpool FC (Michelangelo) v Manchester City FC (Avatar)</li>
      </ul>
     
    </div>
  );
};

export default TodaySectionRow;
