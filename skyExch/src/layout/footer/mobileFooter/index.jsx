import gameGif from "../../../assets/img/gameGif.gif";
import cup from "../../../assets/img/cup.svg";
import clock from "../../../assets/img/clock.svg";
import home from "../../../assets/img/home.svg";
import pin from "../../../assets/img/pin.svg";
import account from "../../../assets/img/account.svg";

import Support from "../../../component/supportTeam";
import { Link } from "react-router-dom";
import {
  home_Screen,
  in_Play_Mobile,
  sports_Screen,
} from "../../../routes/pagesRoutes";


////styles
import "./styles.scss";

const MobileFooter = () => {
  return (
    <>
      <Support />
      <div className="mobile-footer-container">
        <div className="mobile-nav">
          <ul>
            <li className="game-gif">
              <img src={gameGif} alt="gameGif" />
            </li>
            <Link to={sports_Screen}>
              <li>
                <img src={cup} alt="" />
                <p>Sports</p>
              </li>
            </Link>
            <Link to={in_Play_Mobile}>
              <li>
                <img src={clock} alt="" />
                <p>In-Play</p>
              </li>
            </Link>
            <Link to={home_Screen}>
              <li>
                <img src={home} alt="" />
                <p>Home</p>
              </li>
            </Link>
            <li>
              <img src={pin} alt="" />
              <p>Multi Markets</p>
            </li>
            <li>
              <img src={account} alt="" />

              <p>Account</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
