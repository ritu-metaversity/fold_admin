import BookmakerSelection from "./bookmakerSelection";
import FancySelction from "./fancySelection";
import Selection from "./selection";

const Odds = () => {
  return (
    <div>
      <Selection />
      <BookmakerSelection />
      <FancySelction />
    </div>
  );
};

export default Odds;
