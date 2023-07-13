import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import supportTeam from "../../assets/img/supportTeam.png";
import headerIcon from "../../assets/img/supportTeamicon.png";

////style
import "./styles.scss";

const Support = () => {
  const [supportTeamToggle, setsupportTeamToggle] = useState(false);
  if (supportTeamToggle) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return (
    <div
      className={supportTeamToggle ? "suportTeam-div-toogle" : "suportTeam-div"}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!supportTeamToggle && (
        <img
          src={supportTeam}
          alt=""
          onClick={() => setsupportTeamToggle(!supportTeamToggle)}
        />
      )}
      {supportTeamToggle && (
        <>
          <div className="support-team-top">
            <div className="support-team-div-heading">
              <div className="support-team-header-icon">
                <img src={headerIcon} alt="" />
              </div>
              <div className="cross-icon">
                <RxCross2
                  onClick={() => setsupportTeamToggle(!supportTeamToggle)}
                />
              </div>
            </div>
          </div>
          <div className="support-team-body">
            <div className="support-team-body-top">
              <div className="channel-title">
                <p>SkyExchange</p>
              </div>
              <div className="channel-list">
                <div className="channel-list-left">
                  <img
                    src={supportTeam}
                    alt=""
                    // onClick={() => setsupportTeamToggle(!supportTeamToggle)}
                  />
                </div>
                <div className="channel-list-right">
                  <p>
                    SKYEXCH <span>3:32 PM</span>
                  </p>
                  <p>Please choose your preferable language.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Support;
