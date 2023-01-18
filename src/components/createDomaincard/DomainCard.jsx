import { Button, message, Spin, Upload } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import "./styles.scss";
import axios from "axios";
import { Create_app_detail } from "../../routes/Routes";
const DomainCard = () => {
  const [data, setData] = useState({
    appName: "",
    appUrl: "",
    transactionCode: "",
  });

  const [error, setError] = useState({
    appName: false,
    appUrl: false,
    transactionCode: false,
  });
  const [loader, setlaoder] = useState(false);
  ////////image
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // console.log(fileList[0].name, "outer");

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
        appName: !Boolean(data.appName),
      };
    });
    setError((prev) => {
      return {
        ...prev,
        appUrl: !Boolean(data.appUrl),
      };
    });
    setError((prev) => {
      return {
        ...prev,
        transactionCode: !Boolean(data.transactionCode),
      };
    });

    let formData = new FormData();
    if (!fileList.length) {
      console.log("no file");
      return;
    }

    console.log(data.appName, data.appUrl, "before");
    formData.append("appname", data.appName);
    formData.append("appurl", data.appUrl);
    formData.append("logo", fileList[0].originFileObj);
    formData.append("lupassword", data.transactionCode);
    console.log("formData", formData.get("file"));
    if (error.appName || error.appUrl || error.transactionCode) {
    } else {
      setlaoder(true);
      setData({
        appName: "",
        appUrl: "",
        transactionCode: "",
      });
      setFileList([]);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Create_app_detail}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setlaoder(false);
          console.log(res.data);
          message.success(res.data.data.message);
        })
        .catch((error) => {
          setlaoder(false);
          console.log(error.response);
          message.error(error.response.data.message);
        });
    }
  };
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div className="form-domain-card">
      <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
        General Information
      </p>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>App Name:</label>
        <input
          type="text"
          placeholder="App Name"
          name="appName"
          value={data.appName}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.appName ? "1px solid red" : "1px solid #ced4da"}`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>App Url:</label>
        <input
          type="text"
          placeholder="App"
          value={data.appurl}
          name="appUrl"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.appUrl ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>Transaction Code:</label>
        <input
          type="text"
          placeholder="Transaction Code"
          value={data.transactionCode}
          name="transactionCode"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.transactionCode ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <div className="img-div">
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

export default DomainCard;
