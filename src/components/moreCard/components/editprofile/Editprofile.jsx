import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin, Switch } from "antd";
import { MdOutlineLogin } from "react-icons/md";
import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../../../../_api/_api";
import { Tab_EditProfileForm } from "../../../../routes/Routes";
///styles
// import './styles.scss'
const EditProfile = ({ data }) => {
  const {
    handleCancel,
    setName,
    name,
    setCity,
    city,
    setMobileNo,
    mobileNo,
    setStatus,
    isStatus,
  } = useContext(UserModalContext);

  const [error, setError] = useState({});
  const [loader, setloader] = useState(false);

  const editProfile = {
    userId: data.userId,
    username: data.username,
    mobile: mobileNo,
    city: city,
    lupassword: localStorage.getItem("pass"),
    favMaster: isStatus,
  };

  const updateProfile = async () => {
    setError({
      name: !name,
      city: !city,
      mobileNo: !mobileNo,
    });

    if (name && city && mobileNo) {
      setName("");
      setCity("");
      setMobileNo("");
      setStatus(false);
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_EditProfileForm}`,
          editProfile,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success(res.data.message);
          handleCancel();
          setloader(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          handleCancel();
          setloader(false);
        });
    } else {
    }
  };
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <div className="row-1">
          <label>Full Name</label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${error.name ? "1px solid red" : "1px solid #ced4da"}`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="text"
              id="pwd"
              name="pwd"
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error.name ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
          </div>
        </div>
        <div className="row-1">
          <label>City</label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${error.city ? "1px solid red" : "1px solid #ced4da"}`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="text"
              id="pwd"
              name="pwd"
              value={city}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
            />
            {error.city ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
          </div>
        </div>
        <div className="row-1">
          <label>mobile no </label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${
                error.mobileNo ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="number"
              id="pwd"
              name="pwd"
              value={mobileNo}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="mobile no"
              onChange={(e) => setMobileNo(e.target.value)}
            />
            {error.mobileNo ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row-1">
          <label>Favorite Master</label>
          <div className="input">
            <Switch
              onChange={() => setStatus(!isStatus)}
              checked={isStatus}
              size="small"
            />
          </div>
        </div>
        <div className="row-1">
          <label>Transaction Code</label>
          <div className="input">
            <input
              type="password"
              id="pwd"
              name="pwd"
              style={{ width: "100%", textAlign: "left" }}
              placeholder="Transaction Code"
            />
          </div>
        </div>
        <div className="row-button">
          <Button
            style={{ background: "black", borderColor: "black" }}
            onClick={updateProfile}
          >
            Submit
            <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
