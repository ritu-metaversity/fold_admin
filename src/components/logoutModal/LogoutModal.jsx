import { Modal } from "antd";
import React from "react";

const LogoutModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <>
      <Modal
        title="Log Out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are You Sure You Want to Continue</p>
      </Modal>
    </>
  );
};

export default LogoutModal;
