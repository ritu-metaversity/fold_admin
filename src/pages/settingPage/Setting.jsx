import React, { useEffect, useState } from "react";
import UplaodSocailMediaIcon from "../../components/settingComponent/UplaodSocailMediaIcon";
import "./styles.scss";
import facebook from "../../assets/img/facebook.png";
import axios from "axios";
import { Get_Social_Media } from "../../routes/Routes";
const Setting = () => {
  const [socialIcondata, setSocialIcondata] = useState([]);
  const data = { appUrl: "admin" };
  const getSocialImage = async () => {
    const response = await axios.post(`${Get_Social_Media}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response) {
      console.log(response);
      setSocialIcondata(response.data.data);
    }
  };
  useEffect(() => {
    getSocialImage();
  }, []);

  const newObje = {};
  for (let key in socialIcondata) {
    if (key.includes("s_")) {
      newObje[key.replace("s_", "")] = socialIcondata[key].icon;
    } else if (key.includes("u_")) {
      newObje[key.replace("u_", "")] = socialIcondata[key];
    }
  }
  console.log(newObje);
  return (
    <div>
      <div className="icon-col">
        <p>Already Uploaded</p>
        {Object.keys(newObje).map(function (key) {
          return <img src={newObje[key]} alt="" />;
        })}
      </div>

      <div className="social-media-form">
        <UplaodSocailMediaIcon />
      </div>
    </div>
  );
};

export default Setting;
