import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Input } from "antd";
import { useState } from "react";

/////style
import "./styles.scss";

const SearchBar = ({ setOverlay, overlay }) => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownHeight, setDropdownHeight] = useState(false);
  const dropDownData = [
    "ksndfkjl",
    "ksdfkj",
    "lksdflkj",
    "hsadfkj",
    "lksdhfjkhf",
    "ksndfkjl",
    "ksdfkj",
    "lksdflkj",
    "hsadfkj",
    "lksdhfjkhf",
    "ksndfkjl",
    "ksdfkj",
    "lksdflkj",
    "hsadfkj",
    "lksdhfjkhf",
    "ksndfkjl",
    "ksdfkj",
    "lksdflkj",
    "hsadfkj",
    "lksdhfjkhf",
  ];
  return (
    <div className="search-bar-container" onClick={() => setOverlay(!overlay)}>
      <div className="input-div" onClick={(e) => e.stopPropagation()}>
        <div className="back-icon">
          <IoIosArrowBack onClick={() => setOverlay(!overlay)} />
        </div>
        <div className="input">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Events"
            onFocus={() => setDropdownHeight(false)}
          />
        </div>
        <div className="cross-icon">
          <RxCross2 onClick={() => setSearchValue("")} />
        </div>
        <div className="search-icon-div">
          <HiOutlineSearch
            onClick={() => searchValue && setDropdownHeight(!dropdownHeight)}
          />
        </div>
      </div>
      {searchValue && dropDownData.length && (
        <div
          className="search-data-dropdown"
          onClick={(e) => e.stopPropagation()}
          style={{
            height: dropdownHeight && "calc(100vh -   17.0666666667vw)",
          }}
        >
          <ul>
            {dropDownData.map((curElm) => {
              return (
                <>
                  <li>
                    <span>12:30</span> {curElm}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
