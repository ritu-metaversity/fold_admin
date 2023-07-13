import LiveComponent from "../../liveComponent";

import searchIcon from "../../../assets/img/search.svg";

import { useRef, useState } from "react";
import SearchBar from "../../searchBar";

///styles
import "./styles.scss";
import { menu } from "./Menu";

const MobileNavigationHeader = () => {
  const [overlay, setOverlay] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    containerRef.current.scrollLeft = e.target.offsetLeft;
  };
  return (
    <>
      {overlay && <SearchBar setOverlay={setOverlay} overlay={overlay} />}
      <div className="div">
        <div ref={containerRef} className="mobile-navigation-header-container">
          <ul id="myDIV">
            {menu.map((item, index) => {
              return (
                <div
                  onClick={(e) => handleScroll(e)}
                  className={activeValue === index && "active"}
                  key={index.url + item}
                >
                  <li
                    className="li-list "
                    onClick={() => setActiveValue(index)}
                  >
                    <img
                      src={activeValue === index ? item.img2 : item.img}
                      alt=""
                    />
                    {item.name}
                    {item.notification && (
                      <LiveComponent item={item.notification} />
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="search-icon-div">
          <img src={searchIcon} alt="" onClick={() => setOverlay(!overlay)} />
        </div>
      </div>
    </>
  );
};

export default MobileNavigationHeader;
