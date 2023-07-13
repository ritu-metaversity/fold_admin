////styles
import "./styles.scss";

const HighLightTabs = ({ settabsActive, tabsActive }) => {
  return (
    <div>
      <div className="hight-light-heading">
        <h3>Highlights</h3>
      </div>
      <div className="high-light-tabs">
        <ul>
          <li
            className={!tabsActive && "select"}
            onClick={() => settabsActive(!tabsActive)}
          >
            by Time
          </li>
          <li
            className={tabsActive && "select"}
            onClick={() => settabsActive(!tabsActive)}
          >
            by Competition
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HighLightTabs;
