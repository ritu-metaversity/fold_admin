import { ImSearch } from "react-icons/im";
////styles
import "./styles.scss";
import { useState } from "react";
import SearchBar from "../searchBar";
const InPlayTabs = () => {
  const [activeTabs, setActiveTabs] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const tabsData = ["In-Play", "Today", "Tomorrow", "Result"];
  return (
    <>
      {overlay && <SearchBar setOverlay={setOverlay} overlay={overlay} />}
      <div className="inplay-tabs-container">
        <ul>
          {tabsData.map((curElm, index) => {
            return (
              <>
                <li
                  onClick={() => setActiveTabs(index)}
                  className={activeTabs === index && "active"}
                >
                  {curElm}
                </li>
              </>
            );
          })}
        </ul>
        <div className="search-bar-in-play">
          <ImSearch onClick={() => setOverlay(!overlay)} />
        </div>
      </div>
    </>
  );
};

export default InPlayTabs;
