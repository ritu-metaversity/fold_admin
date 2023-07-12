import { Button, Input } from "antd";
import "./styles.scss";
import { IoIosLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { modalHandleCancelRef } from "../../modal";
const WebLoginForm = () => {
  return (
    <div className="login-form-container">
      <div className="left-form-left-col"></div>
      <div className="right-form-left-col">
        <div className="right-center-col">
          <p>Please login to continue</p>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Input placeholder="Validation Code" />
          <Button>
            Login <IoIosLogOut />
          </Button>
        </div>
        <div className="modal-cross-icon">
          <RxCross2 onClick={modalHandleCancelRef} />
        </div>
      </div>
    </div>
  );
};

export default WebLoginForm;
