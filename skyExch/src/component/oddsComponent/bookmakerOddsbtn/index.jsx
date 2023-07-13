///style
import "./styles.scss";
const BookmakerOddsBtn = ({ bg, bg2 }) => {
  return (
    <div className="btn-div" style={{ backgroundImage: bg2 }}>
      <button className="bookmaker-odds-btn" style={{ background: bg }}>
        <p>45</p>
        <span>3435</span>
      </button>
    </div>
  );
};

export default BookmakerOddsBtn;
