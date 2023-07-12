///style
import "./styles.scss";
const Social = ({ img, name, bg, color,width }) => {
  return (
    <div className="social" style={{ background: bg,width:width }}>
      <ul>
        <li style={{ color: color }}>
          <img src={img} alt="" />
          <span>{name}</span>
        </li>
      </ul>
    </div>
  );
};

export default Social;
