import { Button } from "antd";
////styles
import "./styles.scss";
const OddsBtn = ({ bg, setexpand, indexKey }) => {
  return (
    <>
      <button
        className="odds-btn"
        style={{ background: bg }}
        onClick={() => setexpand(indexKey)}
      >
        <p>545</p>
        <p>45</p>
      </button>
    </>
  );
};

export default OddsBtn;
