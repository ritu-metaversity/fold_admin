import React from "react";
import HeadingTodaySection from "./Heading";
import TodaySectionRow from "./TodaySectionRow";

const TodayComponent = () => {
  return (
    <>
      <HeadingTodaySection />
      {[1, 2, 3, 4, 5, 6,7,5,4,2,2,4,5,6,7,7,3,7].map((curElm, index) => {
        return (
          <React.Fragment key={curElm + index}>
            <TodaySectionRow />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TodayComponent;
