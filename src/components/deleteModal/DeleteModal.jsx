import { Modal } from "antd";
import React, { useState } from "react";
import "./styles.scss";
const DeleteModal = ({ showModal, handleOk, handleCancel, headerColor }) => {
  const titleArray = ["Reject", "Approve", "Delete List"];
  const classArray = [
    "warning-header-reject",
    "warning-header",
    "warning-header-Delete-List",
  ];
  return (
    <div>
      <Modal
        title={titleArray[headerColor]}
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        className={classArray[headerColor]}
      >
        <p>Are You Sure You Want To Continue</p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
