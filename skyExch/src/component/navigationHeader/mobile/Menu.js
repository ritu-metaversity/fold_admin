import socceryellow from "../../../assets/img/socceryellow.svg";
import cricketBlack from "../../../assets/img/cricketblack.svg";
import tennisYellow from "../../../assets/img/tennisyellow.svg";
import esoccerYellow from "../../../assets/img/esocceryelow.svg";
import cricket from "../../../assets/img/cricket.svg";
import soccer from "../../../assets/img/soccer.svg";
import tennis from "../../../assets/img/tennis.svg";
import skytrader from "../../../assets/img/skytrader.svg";
import esoccer from "../../../assets/img/e-socces.svg";

export const menu = [
  {
    name: "Cricket",
    url: "/",
    notification: "1",
    img: cricketBlack,
    img2: cricket,
  },
  {
    name: "Soccer",
    url: "In-Play",
    notification: "2",
    img: soccer,
    img2: socceryellow,
  },

  {
    name: "Tennis",
    url: "Tennis",
    notification: "2",
    img: tennis,
    img2: tennisYellow,
  },

  {
    name: "E-Soccer",
    url: "E-Soccer",
    notification: "",
    img: esoccer,
    img2: esoccerYellow,
  },

  {
    name: "Sky-Trader",
    url: "Sky-Trader",
    img: skytrader,
    img2: skytrader,
  },
];
