import React, { useContext, useEffect, useState } from "react";
import { Button, message, Switch } from "antd";
import { MdOutlineLogin } from "react-icons/md";
// import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Tab_EditProfileForm } from "../../../../routes/Routes";
import { LoaderContext } from "../../../../App";

///styles
// import './styles.scss'
const EditProfile = ({ data, handleCancelfunction }) => {
  const [error, setError] = useState({});
  const { setLoading } = useContext(LoaderContext);
  const [formData, setformData] = useState({
    username: "",
    mobile: "",
    city: "",
    lupassword: "",
  });
  const switchHandle = (value) => {
    setformData({ ...formData, favMaster: value || false });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      setError((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateProfile = async () => {
    if (
      formData?.username &&
      // formData?.mobile &&
      // formData?.city &&
      formData?.lupassword
    ) {
      setLoading((prev) => ({ ...prev, changePassword: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_EditProfileForm}`,
          {
            ...formData,
            favMaster: formData.favMaster ? formData.favMaster : false,
            userId: data.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            message.success(res.data.message);
            console.log(res.data.message);
            handleCancelfunction();
            setformData({});
          }
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.status === 401) {
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, changePassword: false }));
    } else {
      setError({
        ...error,
        username: !formData.username,
        mobile: !formData.mobile,
        city: !formData.city,
        lupassword: !formData.lupassword,
      });
    }
  };

  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        changePassword: false,
      }));
    };
  }, [setLoading]);
  return (
    <div>
      <div className="form" style={{ padding: "10px" }}>
        <div className="row-1">
          <label>Full Name</label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${
                error.username ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="text"
              name="username"
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="Full name"
              value={formData.username}
              onChange={handleChange}
            />
            {error.username ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row-1">
          <label>City</label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${error.city ? "1px solid green" : "1px solid #ced4da"}`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="text"
              name="city"
              value={formData.city}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="city"
              onChange={handleChange}
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
                error.mobile ? "1px solid green" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                outline: "none",
              }}
              placeholder="mobile no"
              onChange={handleChange}
            />
            {error.mobile ? <RxCross2 style={{ paddingRight: "10px" }} /> : ""}
          </div>
        </div>

        <div className="row-1">
          <label>Favorite Master</label>
          <div className="input">
            <Switch
              type="checkbox"
              onChange={switchHandle}
              checked={formData.favMaster}
              name="favMaster"
              size="small"
            />
          </div>
        </div>
        <div className="row-1">
          <label>Transaction Code</label>
          <div
            className="input"
            style={{
              background: "white",
              border: `${
                error.lupassword ? "1px solid red" : "1px solid #ced4da"
              }`,
              borderRadius: " 0.25rem",
            }}
          >
            <input
              type="password"
              name="lupassword"
              onChange={handleChange}
              value={formData.lupassword}
              style={{ textAlign: "left", border: "none" }}
            ></input>
            {error.lupassword ? (
              <RxCross2 style={{ paddingRight: "10px" }} />
            ) : (
              ""
            )}
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
