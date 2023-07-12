import { RiSettings4Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../modal";
import WebLoginForm from "../../form/webLoginForm";
import LiveComponent from "../../liveComponent";
import { menu } from "./Menu";

///style
import "./styles.scss";
import SkyTraderComponent from "../../skyTraderComponent";

const NavigationHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenKey, setModalOpenKey] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { pathname } = useLocation();

  const modalOpenObj = {
    0: <WebLoginForm />,
    9: <SkyTraderComponent />,
  };
  return (
    <>
      <ModalComponent
        showModal={showModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        comp={modalOpenObj[modalOpenKey]}
      />
      <div className="navigation-header-container">
        <div className="left-col-navigation-header">
          <ul>
            {menu.map((item, index) => {
              var isActive = pathname === item.url;
              var classNam = isActive ? "active" : "";
              return (
                <Link
                  to={item.name === "Sky-Trader" ? "" : item.url}
                  className={classNam}
                  key={item.url + index}
                >
                  <li
                    className="li-list"
                    onClick={() => {
                      item.name === "Sky-Trader" && showModal();
                      setModalOpenKey(index);
                    }}
                  >
                    {item.name}
                    {item.notification && (
                      <LiveComponent item={item.notification} />
                    )}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="right-col-navigation-header">
          <ul>
            <li className="time-zone">
              Time Zone : <span className="span-gmt">GMT+5:30</span>
            </li>
            <li
              className="click-bet"
              onClick={() => {
                setModalOpenKey(0);
                showModal();
              }}
            >
              <div className="click-bet-check-box"></div>
              One Click Bet
              {/* <Checkbox onChange={"onChange"} className="">
              </Checkbox> */}
            </li>
            <li
              className="setting"
              onClick={() => {
                setModalOpenKey(0);
                showModal();
              }}
            >
              Setting
              <RiSettings4Fill />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;
