import React from "react";
import casinoImage from "../../assets/img/cmeter1.jpg";
import "./styles.scss";
const GameImageComponent = ({ setOpen }) => {
  const showDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="game-image-container">
        <div className="heading-game-image">
          <h4>OUR LIVE CASINO</h4>
        </div>
        <div className="img-div-col">
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
          <div className="image-card-div">
            <img src={casinoImage} alt="" />
            <div className="login-overlay" onClick={showDrawer}>
              login
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameImageComponent;
