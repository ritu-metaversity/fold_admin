import { Button } from "antd";
///styles
import "./styles.scss";

const ButtonComponent = ({ name, bg, icon, height, gradient, color, m }) => {
  return (
    <>
      <Button
        style={{
          backgroundColor: bg,
          height: height,
          backgroundImage: gradient,
          color: color,
        }}
        className="btn-com"
        icon={m && icon}
      >
        {name}
        {!m && icon}
      </Button>
    </>
  );
};

export default ButtonComponent;
