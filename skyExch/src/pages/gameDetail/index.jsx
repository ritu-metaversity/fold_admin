import GameDetailHeader from "../../component/gameDetailPageComponent/gameDetailHeader";
import GameDetailTabs from "../../component/gameDetailPageComponent/gameDetailTabs";
import MatchOddsBtn from "../../component/gameDetailPageComponent/matchOddsbtn";
import Odds from "../../component/oddsComponent";

const GameDetail = () => {
  return (
    <>
      <GameDetailHeader />
      <GameDetailTabs />
      <MatchOddsBtn />
      <Odds />
    </>
  );
};

export default GameDetail;
