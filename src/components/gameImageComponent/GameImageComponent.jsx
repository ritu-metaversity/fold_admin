import React, { useContext, useState } from "react";
import casinoImage from "../../assets/img/cmeter1.jpg";
import "./styles.scss";
import { useEffect } from "react";
import { LoaderContext } from "../../App";
import axios from "axios";
import { CasinoImage } from "../../routes/Routes";
const GameImageComponent = ({ setOpen }) => {
  const { loading, setLoading } = useContext(LoaderContext);
  const [casinoImageData, setCasinoImage] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getCasinoImage = async () => {
      setLoading((prev) => ({ ...prev, getCasinoImage: true }));
      await axios
        .get(CasinoImage)
        .then((res) => {
          setCasinoImage(res.data.data);
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, getCasinoImage: false }));
    };
    getCasinoImage();
  }, []);
  return (
    <>
      <div className="game-image-container">
        <div className="heading-game-image">
          <h4>OUR LIVE CASINO</h4>
        </div>
        <div className="img-div-col">
          {casinoImageData?.map((image) => {
            return (
              <div className="image-card-div">
                <img src={image?.imageUrl} alt="" />
                <div className="login-overlay" onClick={showDrawer}>
                  login
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GameImageComponent;
