import React from "react";
import BookmakerHeading from "./BookmakerHeading";
import BookmakerRow from "./BookmakerRow";


////styles
import "./styles.scss";

const BookmakerSelection = () => {
  return (
    <>
      <BookmakerHeading />
      {["England Women", "Australia Women", "The Draw"].map((curElm, index) => {
        return (
          <React.Fragment key={curElm + index}>
            <BookmakerRow name={curElm} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default BookmakerSelection;
