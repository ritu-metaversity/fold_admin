import { AiFillMinusSquare } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const ChildLayout = () => {
  return (
    <div>
      <div className="in-play-web-container">
        <div className="in-play-web-left-col">
          <Outlet />
        </div>
        <div className="in-play-web-right-col">
          <h1>
            Bet Slip
            <span>
              <AiFillMinusSquare />
            </span>
          </h1>
          <p>Click on the odds to add selections to the betslip.</p>
        </div>
      </div>
    </div>
  );
};

export default ChildLayout;
