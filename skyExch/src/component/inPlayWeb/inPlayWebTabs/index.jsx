///styles
import "./styles.scss";
const TabsComponent = ({ activeTabs, setActiveTabs }) => {
  const tabsItem = ["In-Play", "Today", "Tomorrow"];
  return (
    <div className="tabs-com">
      <ul>
        {tabsItem.map((curElm, index) => {
          return (
            <>
              <li
                className={activeTabs === index && "active"}
                onClick={() => setActiveTabs(index)}
              >
                {curElm}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default TabsComponent;
