import React, { useEffect, useState } from "react";
import { Button, Upload } from "antd";
import axios from "axios";
import { useContext } from "react";
import { notifyToast } from "../../toast/Tost";
import { LoaderContext } from "../../../App";

const AddDepositQrForm = ({ id, userData, endingPoint }) => {
  const { setLoading } = useContext(LoaderContext);
  const [data, setData] = useState({
    accountHolderName: "",
    id: id,
  });

  const [error, setError] = useState({
    accountHolderName: false,
    image: false,
  });
  useEffect(() => {
    if (userData) {
      setData((prev) => {
        return {
          ...prev,
          accountHolderName: userData?.accountHolderName,
        };
      });
      setFileList([
        {
          url: userData.accountNumber,
          uid: "-1",
          name: "image.png",
          status: "done",
        },
      ]);
    }
  }, [userData]);
  const [fileList, setFileList] = useState([]);
  const fileSize = fileList[0]?.size / 1024;
  // const [type, setType] = useState("");
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // setData((prev) => {
    //   return {
    //     ...prev,
    //     file: fileList,
    //   };
    // });
    setError((prev) => {
      return {
        ...prev,
        image: !Boolean(fileList),
      };
    });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  //////////////

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setError((prev) => {
      return {
        ...prev,
        [name]: !Boolean(value),
      };
    });
  };

  const onSubmit = async () => {
    setError((prev) => {
      return {
        ...prev,
        displayName: !Boolean(data.accountHolderName),
        image: !Boolean(fileList),
      };
    });

    if (!fileList.length || fileSize > 512) {
      setError((prev) => {
        return {
          ...prev,
          image: Boolean(fileList),
        };
      });
      return notifyToast().error("image size should be less then 512kb");
    }

    // formData.append("displayName", data.accountHolderName);
    // formData.append("qrcode", fileList[0].originFileObj);

    if (error.accountHolderName) {
    } else {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", fileList[0].originFileObj);

      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${`deposit-type/${endingPoint}`}`,

          // `${process.env.REACT_APP_BASE_URL}/${Add_QR}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            notifyToast().succes(res.data.message);
          } else {
            notifyToast().error(res.data.message);
          }
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({ ...prev, createDomain: false }));
    };
  }, [setLoading]);
  return (
    <div className="form-qr-card">
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Display Name</label>
        <input
          type="text"
          placeholder="Display Name"
          name="accountHolderName"
          value={data.accountHolderName}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountHolderName ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />

        <div className="img-div">
          <p style={{ marginTop: "3px", marginBottom: "14px" }}>
            <label>Upload QR Code</label>
          </p>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            style={{ border: "1px solid red" }}
            className={error.image ? "image-upload" : ""}
            accept="image/png, image/jpeg,image/jpg ,image/webp, image/svg"
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </div>
        <div className="btn" style={{ textAlign: "right" }}>
          <Button
            style={{ background: "black", color: "white", width: "auto" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDepositQrForm;
