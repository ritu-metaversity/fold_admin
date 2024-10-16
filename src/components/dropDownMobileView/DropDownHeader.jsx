import { Modal } from "antd";
import React, { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Changpasswordheader from "../moreCard/components/changepassword/headerchangePassword";
import SelfDepositForm from "../selfDeposit/SelfDeposit";
import { RiWalletLine } from "react-icons/ri";
import "./styles.scss";

const DropDownHeader = ({ pts, logout, showRuleModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const userType = localStorage.getItem("userType");
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
        {modalKey === 0 ? (
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
        {userType == 4 && (
          <Link
            className="dropdown-item"
            onClick={() => {
              showModal();
              setModalKey(0);
            }}
          >
            Self Deposit
          </Link>
        )}

        <span
          className="dropdown-item"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={showRuleModal}
        >
          <BsFillInfoCircleFill /> Rules
        </span>
        <Link
          className="dropdown-item"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={() => {
            showModal();
            setModalKey(1);
          }}
        >
          <RiWalletLine /> Change Password
        </Link>
        <div className="dropdown-divider"></div>
        <Link
          className="dropdown-item text-danger"
          style={{ color: "red" }}
          onClick={logout}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default DropDownHeader;
