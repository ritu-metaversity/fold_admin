import { Link } from "react-router-dom";
import { cricket_Screen } from "../../routes/pagesRoutes";
const labelObj = [
  {
    label: "match",
    key: "2df",
  },
  {
    label: "match",
    key: "match",
  },
];
export const item = [
  {
    label: "Sports",
    key: "0",
  },
  {
    label: <Link to={cricket_Screen}>Cricket</Link>,
    key: "cricket",
    children: [...labelObj],
  },
  {
    label: "Soccer",
    key: "Soccer",
    children: [...labelObj],
  },
  {
    label: "Tennis",
    key: "Tennis",
    children: [...labelObj],
  },
  {
    label: "E_Soccer",
    key: "E_Soccer",
    children: [...labelObj],
  },
  {
    label: "FancyBet",
    key: "FancyBet",
    children: [...labelObj],
  },
  {
    label: "Election",
    key: "6",
    children: [...labelObj],
  },
];
