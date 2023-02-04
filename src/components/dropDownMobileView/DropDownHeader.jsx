import { Modal } from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Changpasswordheader from "../moreCard/components/changepassword/headerchangePassword";
import SelfDepositForm from "../selfDeposit/SelfDeposit";
import "./styles.scss";
const DropDownHeader = ({ pts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-self-deposit"
        destroyOnClose
      >
        {modalKey == 0 ? (
          <SelfDepositForm handleCancel={handleCancel} />
        ) : (
          <Changpasswordheader handleCancelfunction={handleCancel} />
        )}
      </Modal>
      <div
        role="menu"
        // tabindex="-1"
        className="dropdown-menu dropdown-menu-right show"
      >
        <div className="">
          <div className="bal-box">
            <span className="balance nowrap">
              pts:
              <span className="balance-value">
                <b>{pts}</b>
              </span>
            </span>
          </div>
        </div>
        <a className="dropdown-item d-sm-none">Rules</a>
        <a
          className="dropdown-item"
          onClick={() => {
            showModal();
            setModalKey(1);
          }}
        >
          Change Password
        </a>
        <div className="dropdown-divider"></div>
        <a
          className="dropdown-item text-danger"
          style={{ color: "red" }}
          onClick={logout}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default DropDownHeader;
