import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Mainlayout from "../../common/Mainlayout";
import TestPageLeftCollapse from "../../components/collapse/TestPageLeftCollapse";
import TestPageRightCollapse from "../../components/collapse/TestPageRightCollapse";
import MyBets from "../../components/collapsetable/MyBets";

///styles
import "./styles.scss";
const Testmatch = () => {
  return (
    <Mainlayout>
      <div className="container-test-match">
        <div className="left-body-container">
          <div className="heading">
            <h4>TEST MATCHES PAKISTAN V NEW ZEALAND</h4>
            <h4>26/12/2022 10:30:00</h4>
          </div>
          <div className="Collapse">
            <TestPageLeftCollapse />
          </div>
        </div>
        <div className="right-body-container">
          <TestPageRightCollapse />
          <MyBets />
        </div>
      </div>
    </Mainlayout>
  );
};

export default Testmatch;
