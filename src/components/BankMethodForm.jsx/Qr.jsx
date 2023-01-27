import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Add_Bank, Add_QR } from "../../routes/Routes";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router-dom";
const QrForm = () => {
  const { loading, setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    displayName: "",
  });

  const [error, setError] = useState({
    displayName: false,
  });
  ////////image
  const [fileList, setFileList] = useState([]);
  const [type, setType] = useState("");
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // console.log(fileList[0].name, "outer");
  const handleChangeSelct = (value) => {
    setType(value);
    setError((prev) => {
      return {
        ...prev,
        isSelfAllowed: !Boolean(value),
      };
    });
  };
  const options = [
    {
      value: "live",
      label: "live",
    },
    {
      value: "admin",
      label: "admin",
    },
  ];
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
        displayName: !Boolean(data.displayName),
      };
    });

    let formData = new FormData();
    if (!fileList.length) {
      return;
    }

    formData.append("displayName", data.displayName);
    formData.append("qrcode", fileList[0].originFileObj);

    if (error.displayName) {
    } else {
      setFileList([]);
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Add_QR}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          message.success(res.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          if (error.response.data.status === 401) {
            setLoading((prev) => ({ ...prev, createDomain: false }));
            navigate("/");
            localStorage.removeItem("token");
            message.error(error.response.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };
  return (
    <div className="form-domain-card">
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Display Name</label>
        <input
          type="text"
          placeholder="App Name"
          name="displayName"
          value={data.displayName}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.displayName ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />

        <div className="img-div">
          <p style={{ marginTop: "3px", marginBottom: "14px" }}>
            <label>Upload QR Code</label>
          </p>
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
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

export default QrForm;
