import { useState } from "react";
import InPlayCollapse from "../../component/inPlayWeb/inPlayCollapse";
import TabsComponent from "../../component/inPlayWeb/inPlayWebTabs";
// import { AiFillMinusSquare } from "react-icons/ai";

import TodayComponent from "../../component/inPlayWeb/TodayTabs";
///style
import "./styles.scss";

const InPlayWeb = () => {
  const [activeTabs, setActiveTabs] = useState(0);

  const tabsComponent = {
    0: <InPlayCollapse />,
    1: <TodayComponent />,
    2: <TodayComponent />,
  };

  return (
    <div>
      <div className="tabs-container">
        <TabsComponent setActiveTabs={setActiveTabs} activeTabs={activeTabs} />
      </div>
      {tabsComponent[activeTabs]}
    </div>
  );
};

export default InPlayWeb;
