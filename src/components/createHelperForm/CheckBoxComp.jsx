import { Checkbox } from "antd";
import React from "react";

const CheckBoxComp = ({ name, fun, checkValue }) => {
  return (
    <div>
      <div className="check-box-block-div">
        <Checkbox onChange={(e) => fun(name, e)} checked={checkValue}>
          {name}
        </Checkbox>
      </div>
    </div>
  );
};

export default CheckBoxComp;
