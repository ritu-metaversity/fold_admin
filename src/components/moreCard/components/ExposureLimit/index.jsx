import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button } from "antd";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { notifyToast } from "../../../toast/Tost";

const ExposureLimit = ({ userData }) => {
  console.log(userData, "sjdnvbdfsjhv");

  const [limit, setLimit] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    userId: userData?.userId,
    netExposure: "",
    luPassword: "",
  });

  useEffect(() => {
    getExposureLimit();
  }, []);

  const getExposureLimit = async () => {
    const response = await axios.post(
      `${
        process.env.REACT_APP_BASE_URL
      }/${"matchBox/matchBox_credit-Exposure-amount"}`,
      { userId: userData?.userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLimit(response?.data);
  };

  const submitHandler = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"matchBox/update-limit"}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          notifyToast().succes(res?.data?.message);
        } else {
          notifyToast().error(res?.data?.message);
        }
      });
  };

  return (
    <form className="form_cont">
      <div className="limit">
        <label>Exposure limit</label>
        <input disabled value={limit?.data?.netexposure} />
      </div>
      <div className="limit">
        <label>Update Exposure Limit</label>
        <input
          type="number"
          placeholder="New Limit"
          onChange={(e) => {
            setUpdatedData((prev) => {
              return {
                ...prev,
                netExposure: e.target.value,
              };
            });
          }}
        />
      </div>

      <div className="limit">
        <label>Transaction Password</label>
        <input
          type="password"
          placeholder="Transaction Password"
          onChange={(e) => {
            if (e.target.value) {
              setPasswordError(false);
            } else {
              setPasswordError(true);
            }
            setUpdatedData((prev) => {
              return {
                ...prev,
                luPassword: e.target.value,
              };
            });
          }}
        />
      </div>

      <div className="row-button">
        <Button
          style={{ background: "black", borderColor: "black" }}
          onClick={submitHandler}
        >
          Submit
          <MdOutlineLogin />
        </Button>
      </div>
    </form>
  );
};

export default ExposureLimit;
