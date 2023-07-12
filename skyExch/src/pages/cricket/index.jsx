import CricketPageBanner from "../../component/cricketPage/Banner";
import InPlayMatchRow from "../../component/inPlayWeb/matchRow";
import MarqueeComponent from "../../component/marquee";
import CricketPageTitle from "../../component/cricketPage/title";
import SportsHighLight from "../../component/cricketPage/sportsHighlight";

const Cricket = () => {
  return (
    <div>
      <MarqueeComponent />
      <CricketPageBanner />
      <SportsHighLight />
      <CricketPageTitle />
      <InPlayMatchRow />
    </div>
  );
};

export default Cricket;
