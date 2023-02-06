import { Alert, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let offlineRef;
axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (err) {
    // console.log(err);
    if (err?.response?.data?.message) {
      message.error(err?.response?.data?.message);
    }
    // message.error(err?.response?.data?.message);
    if (err.code === "ERR_NETWORK") {
      if (offlineRef) {
        offlineRef(true);
      }
    }
    if (err.response?.status === 401) {
      localStorage.clear();

      useNavigate("/");
    }
    return err;
  }
);

export const OfflineAlert = () => {
  const [open, setOpen] = useState(false);

  offlineRef = setOpen;
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
