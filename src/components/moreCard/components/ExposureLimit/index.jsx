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
  const [updatedData, setUpdatedData] = useState({
    userId: userData?.userId,
    netExposure: "",
    luPassword: "",
  });

  const [error, setError] = useState({
    netExposure: false,
    luPassword: false,
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

  const onSumbit = () => {
    let isSuccess = false;
    for (const key of Object.keys(updatedData)) {
      setError((prev) => {
        return { ...prev, [key]: Boolean(!updatedData[key]) };
      });
    }
    for (const key of Object.keys(updatedData)) {
      const value = Boolean(updatedData[key]);
      if (!value) {
        isSuccess = false;
        break;
      } else {
        isSuccess = true;
      }
    }
    if (isSuccess) {
      submitHandler();
    }
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
    } else if (value) {
      setUpdatedData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setUpdatedData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
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
          name="netExposure"
          value={updatedData.netExposure}
          onChange={(e) => handleChange(e)}
          style={{ border: error.netExposure && "1px solid red" }}
        />
      </div>

      <div className="limit">
        <label>Transaction Password</label>
        <input
          type="password"
          placeholder="Transaction Password"
          name="luPassword"
          value={updatedData.luPassword}
          style={{ border: error.luPassword && "1px solid red" }}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="row-button">
        <Button
          style={{ background: "black", borderColor: "black" }}
          onClick={onSumbit}
        >
          Submit
          <MdOutlineLogin />
        </Button>
      </div>
    </form>
  );
};

export default ExposureLimit;
