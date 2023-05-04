import { Drawer } from "antd";
import React from "react";
import Loginform from "../form/Form";
import "./styles.scss";
const DrawerComponent = ({ open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Drawer
        title="ADMIN LOGIN"
        placement="right"
        onClose={onClose}
        open={open}
       
        className="drawer"
      >
        <Loginform />
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
