import { Alert, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

axios.interceptors.response.use(
  function (config) {
    offlineRef(false);
    return config;
  },
  function (err) {
    // console.log(err, "sdfghjk");
    if (err.response?.status === 401) {
      localStorage.clear();
      // message.error(err.message);
      navRef("/");
    } else if (err?.response?.data?.message) {
      message.error(err?.response?.data?.message);
    }
    // message.error(err?.response?.data?.message);
    if (err.code === "ERR_NETWORK") {
      if (offlineRef) {
        offlineRef(true);
      }
    } else {
      offlineRef(false);
    }
    return err;
  }
);

let offlineRef;
let navRef;

export const OfflineAlert = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  offlineRef = setOpen;
  navRef = nav;
  return open ? (
    <Alert
      message="You Seem To Be Offline"
      banner
      closable
      style={{ zIndex: "10000000", position: "absolute", width: "100%" }}
      onClose={() => setOpen(false)}
    />
  ) : (
    <></>
  );
};
