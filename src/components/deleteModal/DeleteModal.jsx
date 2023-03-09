import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
const DeleteModal = ({
  showModal,
  handleOk,
  handleCancel,
  headerColor,
  remarkRender,
}) => {
  const [textareaError, settextareaError] = useState(false);
  const [textArea, setTextArea] = useState("");
  console.log(headerColor, "headerColor");
  const titleArray = ["Reject", "Approve", "Delete List"];
  const classArray = [
    "warning-header-reject",
    "warning-header",
    "warning-header-Delete-List",
  ];

  const handleChangetextArea = (e) => {
    const value = e.target.value;
    console.log(value);

    settextareaError(!value);

    setTextArea(value);
  };
  useEffect(() => {
    return () => {
      setTextArea("");
      settextareaError(false);
    };
  }, [showModal]);
  console.log(remarkRender, "remarkRender");
  return (
    <div>
      <Modal
        title={
          titleArray[headerColor] || remarkRender === 1
            ? titleArray[headerColor]
            : ""
        }
        open={showModal}
        onOk={() =>
          textArea || remarkRender == 1
            ? handleOk(textArea)
            : settextareaError(true)
        }
        onCancel={handleCancel}
        destroyOnClose
        className={
          classArray[headerColor] || remarkRender == 1
            ? classArray[headerColor]
            : ""
        }
      >
        <p>Are You Sure You Want To Continue</p>
        {remarkRender == 0 ? (
          <textarea
            style={{
              width: "100%",
              height: "50px",

              border: `${
                !textareaError ? "1px solid #d9d9d9" : "1px solid red"
              }`,
            }}
            value={textArea}
            placeholder="Enter Remark"
            onChange={handleChangetextArea}
          ></textarea>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default DeleteModal;
