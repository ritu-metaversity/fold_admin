import React from "react";
import plus from "../../assets/img/18plus.png";
import gt from "../../assets/img/gt.png";
import gameCare from "../../assets/img/gamecare.png";

import "./styles.scss";
const LoginFooter = () => {
  return (
    <div className="footer-div">
      <p>
        <img src={plus} alt="" />
        <img src={gt} alt="" />
        <img src={gameCare} alt="" />
      </p>
      <p>© Copyright 2021. All Rights Reserved.</p>
    </div>
  );
};

export default LoginFooter;
