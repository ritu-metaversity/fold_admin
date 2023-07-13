import React from "react";
import FancySelectionRow from "./FancySelectionRow";
import FancyTabs from "./FancyTabs";
import FancySelectionHeading from "./fancySelectionHeading";

const FancySelction = () => {
  return (
    <div>
      <FancySelectionHeading />
      <FancyTabs />
      {[1, 2, 3, 4, 5, 6, 7].map((curElm, index) => {
        return (
          <React.Fragment key={curElm + index}>
            <FancySelectionRow />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FancySelction;
