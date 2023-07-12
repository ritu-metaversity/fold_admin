import { Modal } from "antd";
////style
import "./styles.scss";
export let modalHandleCancelRef;
const ModalComponent = ({ isModalOpen, setIsModalOpen, comp }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  modalHandleCancelRef = handleCancel;
  return (
    <div className="modal-container">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        {comp}
      </Modal>
    </div>
  );
};

export default ModalComponent;
