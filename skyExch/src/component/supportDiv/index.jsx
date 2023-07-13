////style
import "./styles.scss";
const Support = ({ img, name1, name2, bg, color }) => {
  return (
    <div className="extend-btn" style={{ background: bg }}>
      <ul>
        <li style={{ color: color }}>
          <img src={img} alt="" />
          <span>{name1}</span>
        </li>
        <li style={{ color: color }}>
          <span>{name2}</span>
        </li>
      </ul>
    </div>
  );
};

export default Support;
