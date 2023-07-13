import {
  binary_Screen,
  in_Play_Web,
  multi_Market,
} from "../../../routes/pagesRoutes";

export const menu = [
  {
    name: "Home",
    url: "/",
    notification: "",
  },
  {
    name: "In-Play",
    url: in_Play_Web,
    notification: "",
  },
  {
    name: "Multi Markets",
    url: multi_Market,
    notification: "",
  },
  {
    name: "Cricket",
    url: "cricket",
    notification: "2",
  },
  {
    name: "Soccer",
    url: "Soccer",
    notification: "1",
  },
  {
    name: "Tennis",
    url: "Tennis",
    notification: "2",
  },
  {
    name: "Virtual Cricket",
    url: "Virtual-Cricket",
  },
  {
    name: "E-Soccer",
    url: "E-Soccer",
    notification: "44",
  },
  {
    name: "Binary",
    url: binary_Screen,
  },
  {
    name: "Sky-Trader",
    url: "Sky-Trader",
  },
];
