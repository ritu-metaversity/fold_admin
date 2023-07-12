////styles
import { Link } from "react-router-dom";
import HighLightList from "./List";
import "./styles.scss";
import { game_Detail } from "../../routes/pagesRoutes";
const HighLightEvent = () => {
  return (
    <div>
      <div className="high-light-container">
        {[1, 2, 3, 4, 5, 5, 67, 7, 1, 2, 3, 4, 5, 5, 67, 7].map((curElm) => {
          return (
            <>
              <Link to={game_Detail}>
                <HighLightList />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HighLightEvent;
