import { Button, Checkbox, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { Get_saveSelect, Get_Social_Media } from "../../routes/Routes";
import { notifyToast } from "../../components/toast/Tost";
const SocialMediaManager = () => {
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
      const newObje = {};
      const newValue = {};
      const data = response.data.data;
      for (let key in data) {
        if (key.includes("s_")) {
          newObje[key.replace("s_", "")] = data[key];
          newValue[key.replace("s_", "") + "Link"] = data[key]?.link || "";
        } else if (key.includes("u_")) {
          newObje[key.replace("u_", "")] = data[key];
          newValue[key.replace("u_", "") + "Link"] = data[key]?.link || "";
        }
      }
      setvalue((o) => ({
        ...o,
        ...newValue,
        support: data.support,
        mobileNo: data.mobileNo,
      }));
      setSocialIcondata(newObje);
    }
  };

  useEffect(() => {
    getSocialImage();
  }, []);

  const [value, setvalue] = useState({
    whatsapp: false,
    telegram: false,
    twitter: false,
    youtube: false,
    instagram: false,
    facebook: false,
    whatsappLink: "",
    telegramLink: "",
    twitterLink: "",
    youtubeLink: "",
    instagramLink: "",
    facebookLink: "",
    support: "",
    mobileNo: "",
  });
  const [supportState, setsupportState] = useState({
    support: false,
    mobileNo: false,
  });
  const handleChangeValue = (e) => {
    if (e.target.name.includes("Link")) {
      setvalue((o) => ({ ...o, [e.target.name]: e.target.value }));
    } else {
      setvalue((o) => ({ ...o, [e.target.name]: !o[e.target.name] }));
    }
  };

  const Submit = async () => {
    let isChecked = false;
    for (let key in value) {
      if (value[key] === true && !value[key + "Link"]) {
        return notifyToast().error("Pls Enter Value");
      } else if (value[key] === true) {
        isChecked = true;
      }
    }
    if (
      (supportState.support && !value.support) ||
      (supportState.mobileNo && !value.mobileNo)
    ) {
      return notifyToast().error("Pls Enter Value");
    } else if (supportState.support || supportState.mobileNo) {
      isChecked = true;
    }
    if (isChecked) {
      const response = await axios.post(`${Get_saveSelect}`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response);
      }
    } else {
      notifyToast().error("Pls select Atleast One");
    }
  };
  //   support;

  const handleChangeSupport = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.checked;
    setsupportState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeSupportValue = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    setvalue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="social-manager-icon-conatainer">
        {Object?.keys(socialIcondata).map(function (key) {
          if (!["paytm", "phonePe", "upi", "googlePay"].includes(key))
            return (
              <div className="social-col">
                <div className="img">
                  <img src={socialIcondata[key]?.icon} alt="" />
                </div>

                <div className="checkbox">
                  <Checkbox
                    name={key}
                    value={value[key]}
                    onChange={handleChangeValue}
                  />
                </div>
                <div className="input">
                  <Input
                    style={{
                      border:
                        value[key] && !value[key + "Link"]
                          ? "2px solid red"
                          : "",
                    }}
                    name={key + "Link"}
                    value={value[key + "Link"] || ""}
                    onChange={handleChangeValue}
                    disabled={!value[key]}
                  />
                </div>
              </div>
            );
        })}
        <div className="support-container">
          <div className="social-col">
            <div className="img">
              <p>24/7 Support</p>
            </div>

            <div className="checkbox">
              <Checkbox
                name="support"
                value={supportState.support}
                onChange={handleChangeSupport}
              />
            </div>
            <div className="input">
              <Input
                name="support"
                value={value.support}
                onChange={handleChangeSupportValue}
                disabled={!supportState.support}
              />
            </div>
          </div>
          <div className="social-col">
            <div className="img">
              <p>Mobile No</p>
            </div>

            <div className="checkbox">
              <Checkbox
                name="mobileNo"
                value={supportState.mobileNo}
                onChange={handleChangeSupport}
              />
            </div>
            <div className="input">
              <Input
                name="mobileNo"
                value={value.mobileNo}
                onChange={handleChangeSupportValue}
                disabled={!supportState.mobileNo}
              />
            </div>
          </div>
        </div>
        <div className="submit-btn-social-live">
          <Button onClick={Submit}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default SocialMediaManager;
