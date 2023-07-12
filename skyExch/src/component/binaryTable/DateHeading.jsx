import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import RulesOfBinary from "../rulesOfBinary";
import ModalComponent from "../modal";
import { useState } from "react";
///style
import "./styles.scss";
const DateHeading = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <ModalComponent
        comp={<RulesOfBinary />}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="gametab-head">
        <h4 className="select">
          <span>
            Daily<strong>2023-06-19</strong>
          </span>
        </h4>
        <div className="btn_rules">
          <HiOutlineQuestionMarkCircle onClick={showModal} />
        </div>
      </div>
    </>
  );
};

export default DateHeading;
