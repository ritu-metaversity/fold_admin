import HighLightEvent from "../../component/highLightEvent";
import InPlayTabs from "../../component/inPlayTabs/Index";
import HeadingInPlay from "./Heading";

const InPlayMobile = () => {
  return (
    <>
      <InPlayTabs />
      <HeadingInPlay name="Cricket" />
      <HighLightEvent />
      <HeadingInPlay name="Soccer" />
      <HighLightEvent />
    </>
  );
};

export default InPlayMobile;
