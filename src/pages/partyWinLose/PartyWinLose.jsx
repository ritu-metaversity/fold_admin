import React from "react";
import { NavLink } from "react-router-dom";

const PartyWinLose = () => {
  return (
    <>
      <div className="hading-create-accounts">
        <h4>PARTY WIN LOSS</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to="" style={{ color: "#74788d" }}>
            PARTY WIN LOSS
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default PartyWinLose;
