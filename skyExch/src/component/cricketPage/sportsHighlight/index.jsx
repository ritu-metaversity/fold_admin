///styles
import { Select } from "antd";
import "./styles.scss";
const SportsHighLight = () => {
  const option = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "Yiminghe",
      label: "yiminghe",
    },
    {
      value: "disabled",
      label: "Disabled",
      disabled: true,
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="sports-highlight">
      <p>Sports Highlights</p>
      <p>
        View by
        <span>
          <Select
            defaultValue="lucy"
            style={{
              width: 10ẇ0,
            }}
            onChange={handleChange}
            options={option}
          />
        </span>
      </p>
    </div>
  );
};

export default SportsHighLight;
