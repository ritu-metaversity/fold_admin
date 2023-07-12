import React from "react";
import SelectionHeading from "./SelectionHeading";
import SelectionRow from "./SelectionRow";

const Selection = () => {
  return (
    <>
      <SelectionHeading />
      {["Scotland", "UAE"].map((curElm, index) => {
        return (
          <React.Fragment key={curElm + index}>
            <SelectionRow name={curElm} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Selection;
