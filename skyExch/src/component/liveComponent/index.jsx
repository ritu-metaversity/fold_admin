///styles
import "./styles.scss";
const LiveComponent = ({ item }) => {
  return (
    <>
      <span className="tag-live">
        <strong></strong>
        {item}
      </span>
    </>
  );
};

export default LiveComponent;
