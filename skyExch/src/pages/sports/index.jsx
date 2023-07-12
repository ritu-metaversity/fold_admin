import { useState } from "react";
import Banner from "../../component/banner";
import HighLightEvent from "../../component/highLightEvent";
import HighLightTabs from "../../component/highLightTabs";
import MobileNavigationHeader from "../../component/navigationHeader/mobile";

const Sports = () => {
  const [tabsActive, settabsActive] = useState(false);
  return (
    <div>
      <Banner />
      <MobileNavigationHeader />
      <HighLightTabs settabsActive={settabsActive} tabsActive={tabsActive} />
      <HighLightEvent tabsActive={tabsActive} />
    </div>
  );
};

export default Sports;
