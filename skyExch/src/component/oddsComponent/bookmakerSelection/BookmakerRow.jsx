import BookmakerOddsBtn from "../bookmakerOddsbtn";
///styles
import "./styles.scss";
const lay =
  "linear-gradient(270deg, rgba(247, 205, 214, 0.75) 5%, #f0c0cb 60%)";
const back = "linear-gradient(90deg, rgba(151, 199, 234, 0.7) 0%, #97c7ea 65%)";
const BookmakerRow = ({ name }) => {
  return (
    <>
      <div className="bookamker-row">
        <div className="bookamker-left-col">{name}</div>
        <div className="bookamker-right-col">
          <BookmakerOddsBtn bg="#72bbef" bg2={back} />
          <BookmakerOddsBtn bg="#faa9ba" bg2={lay} />
        </div>
      </div>
    </>
  );
};

export default BookmakerRow;
