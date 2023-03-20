import React, { useEffect, useState } from "react";
import UplaodSocailMediaIcon from "../../components/settingComponent/UplaodSocailMediaIcon";
import "./styles.scss";
import axios from "axios";
import { Get_Social_Media } from "../../routes/Routes";
const Setting = () => {
  const [socialIcondata, setSocialIcondata] = useState([]);
  const data = { appUrl: "admin" };
  const getSocialImage = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${Get_Social_Media}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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

  return (
    <div>
      <p>Already Uploaded</p>
      <div className="icon-col">
        {Object?.keys(newObje).map(function (key) {
          return (
            <div className="img-col">
              <img src={newObje[key]} alt="" />
            </div>
          );
        })}
      </div>

      <div className="social-media-form">
        <UplaodSocailMediaIcon fun={getSocialImage} />
      </div>
    </div>
  );
};

export default Setting;
