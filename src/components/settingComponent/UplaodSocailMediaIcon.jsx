import { Button, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Social_Media_Icon_Upload } from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";
const social = [
  "paytm",
  "whatsapp",
  "telegram",
  "instagram",
  "twitter",
  "facebook",
  "youtube",
  "upi",
  "googlePay",
  "phonePe",
];
const UplaodSocailMediaIcon = ({ fun }) => {
  const [fileList, setFileList] = useState({
    paytm: [],
    whatsapp: [],
    telegram: [],
    instagram: [],
    twitter: [],
    facebook: [],
    youtube: [],
    upi: [],
    googlePay: [],
    phonePe: [],
  });

  let formData = new FormData();

  const submit = async () => {
    for (let file in fileList) {
      formData.append(file, fileList[file][0]?.originFileObj);
    }
    if (!Object.values(fileList).filter((i) => i.length !== 0).length) {
      return notifyToast().error("Pls Select Atleast One");
    }
    if (Object.values(fileList).filter((i) => i[0]?.size / 1024 > 200).length) {
      return notifyToast().error("image size should be less then 200kb");
    }
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${Social_Media_Icon_Upload}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response) {
      notifyToast().succes(response.data.message);
      fun();
      setFileList({
        paytm: [],
        whatsapp: [],
        telegram: [],
        instagram: [],
        twitter: [],
        facebook: [],
        youtube: [],
        upi: [],
        googlePay: [],
        phonePe: [],
      });
    }
  };

  const onChange = ({ fileList }, key) => {
    setFileList((o) => ({ ...o, [key]: fileList }));
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

  return (
    <>
      {social.map((res) => (
        <div className="img-div social-media-card">
          <p style={{ marginTop: "3px", marginBottom: "14px" }}>
            <label>{res}</label>
          </p>
          <Upload
            listType="picture-card"
            fileList={fileList[res] || []}
            onChange={(e) => onChange(e, res)}
            onPreview={onPreview}
            style={{ border: "1px solid red" }}
            // className={error.image ? "image-upload" : ""}
            accept="image/png"
          >
            {fileList[res]?.length < 1 && "+ Upload"}
          </Upload>
        </div>
      ))}
      <div className="submit-btn">
        <Button onClick={submit}>Submit</Button>
      </div>
    </>
  );
};

export default UplaodSocailMediaIcon;
