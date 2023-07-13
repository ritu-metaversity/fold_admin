import { Menu } from "antd";
import { item } from "./Menu";
////styles
import { useState } from "react";
import "./styles.scss";

const Sider = () => {
  const [openKeys, setOpenKeys] = useState([]);
  return (
    <div className="sider-menu">
      <Menu
        style={{
          width: 243,
        }}
        onOpenChange={(o) => setOpenKeys([o[o.length - 1]])}
        openKeys={openKeys}
        mode="inline"
        items={item}
      />
    </div>
  );
};

export default Sider;
