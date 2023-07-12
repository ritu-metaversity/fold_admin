import React, { useState } from "react";

const FancyTabs = () => {
  const [activeValue, setActiveValue] = useState(0);
  const tabsValue = [
    "ALL",
    "Fancy",
    "Ball by Ball",
    "Khadda",
    "Lottery",
    "Odd/Even",
  ];
  return (
    <div className="fancy-tabs-container">
      <ul>
        {tabsValue.map((curElm, index) => {
          return (
            <React.Fragment key={curElm + index}>
              <li
                className={activeValue === index && "active"}
                onClick={() => setActiveValue(index)}
              >
                {curElm}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default FancyTabs;
