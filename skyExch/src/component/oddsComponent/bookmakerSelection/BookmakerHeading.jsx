import pin from "../../../assets/img/pin3.svg";
import ques from "../../../assets/img/ques.svg";

///style
import "./styles.scss";
const BookmakerHeading = () => {
  return (
    <>
      <div className="bookmaker-header">
        <ul>
          <li>
            <img src={pin} alt="" />
          </li>
          <li>Bookmaker Market</li>
          <li>| Zero Commission</li>
        </ul>
        <span>
          <img src={ques} alt="" />
        </span>
      </div>
      <div className="back-lay-heading">
        <div className="back-lay-heading-left-col"></div>
        <div className="back-lay-heading-right-col">
          <button>back</button>
          <button>lay</button>
        </div>
      </div>
    </>
  );
};

export default BookmakerHeading;
