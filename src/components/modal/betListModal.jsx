import { Modal } from "antd";
import React from "react";
import PtsModal from "./PtsModal";
import { useState } from "react";

const BetListModal = ({
  setIsModalOpen,
  isModalOpen,
  ptsId,
  remark,
  search,
}) => {
  const [ptsdata, setPtsdata] = useState([]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Bet List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
      width={700}
      // style={{ height: "500px", overflow: "scroll" }}
    >
      <PtsModal
        id={ptsId}
        remark={remark}
        setPtsdata={setPtsdata}
        ptsdata={ptsdata}
        search={search}
      />
    </Modal>
  );
};

export default BetListModal;
