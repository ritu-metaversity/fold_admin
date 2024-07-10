import { Drawer } from "antd";
import React from "react";
import Loginform from "../form/Form";
import "./styles.scss";
import ChangePasswordLoginForm from "../form/ChangePassworldLoginForm";
const DrawerComponent = ({ open, setOpen, logo }) => {
  const onClose = () => {
    setOpen(false);
  };
  const type = localStorage.getItem("passwordtype");
  return (
    <div className="fold_login">
      {/* <Drawer
        title="ADMIN LOGIN"
        placement="right"
        onClose={onClose}
        open={open}
        className="drawer"
      > */}
        {type === "old" ? <ChangePasswordLoginForm /> : <Loginform  logo={logo}/>}
      {/* </Drawer> */}
    </div>
  );
};

export default DrawerComponent;
