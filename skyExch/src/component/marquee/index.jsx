import { BsMic } from "react-icons/bs";
import Marquee from "react-fast-marquee";
/////styles
import "./styles.scss";
const MarqueeComponent = () => {
  return (
    <>
      <div className="game-detail-marquee">
        <div className="game-deatil-marquee-left-col">
          <BsMic />
          <p>News</p>
        </div>
        <div className="game-deatil-marquee-right-col">
          <Marquee>
            I can be a React component, multiple React components, or just some
            text.
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default MarqueeComponent;
