import { Outlet } from "react-router-dom";
import Sider from "../component/sider";

const SubChildLayout = () => {
  return (
    <div className="sub-child-container">
      <div className="left-sider">
        <Sider />
      </div>
      <div className="right-div">
        <Outlet />
      </div>
    </div>
  );
};

export default SubChildLayout;
