import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { useContext } from "react";

import { LoaderContext } from "../../../App";
import { notifyToast } from "../../toast/Tost";
const AddDepositUpiForm = ({ id, userData, endingPoint }) => {
  const { setLoading } = useContext(LoaderContext);
  const [data, setData] = useState({
    accountNumber: "",
    accountHolderName: "",
    id: id,
  });

  //   const url = {
  //     0: "admin-new-apis/deposit-type/save-sub",

  //     2: "admin-new-apis/deposit-type/update_sub",
  //     3: "admin-new-apis/deposit-type/update_bank",
  //   };
  const [error, setError] = useState({
    upiId: false,
    upiDisplayName: false,
  });

  useEffect(() => {
    if (userData) {
      setData((prev) => {
        return {
          ...prev,
          accountHolderName: userData?.accountHolderName,
          accountNumber: userData?.accountNumber,
        };
      });
    }
  }, [userData]);
  ////////image

  // console.log(fileList[0].name, "outer");

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
    const nerror = {
      upiId: !Boolean(data.accountNumber),
      upiDisplayName: !Boolean(data.accountHolderName),
    };
    setError((prev) => {
      return {
        ...prev,
        ...nerror,
      };
    });

    if (nerror.accountNumber || nerror.accountHolderName) {
    } else {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      setLoading((prev) => ({ ...prev, CreateQr: true }));
      await axios

        .post(
          `http://18.143.24.35/admin-new-apis/deposit-type/${endingPoint}`,
          // ` ${process.env.REACT_APP_BASE_URL}/${""}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === false) {
            notifyToast().error(res.data.message);
          } else {
            notifyToast().succes(res.data.message);
            setData({
              upiId: "",
              upiDisplayName: "",
            });
          }
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.data.status === 401) {
          //   setLoading((prev) => ({ ...prev, CreateQr: false }));
          //   navigate("/");
          //   localStorage.clear();
          // }
        });
      setLoading((prev) => ({ ...prev, CreateQr: false }));
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({ ...prev, CreateQr: false }));
    };
  }, [setLoading]);
  return (
    <div className="form-upi-card">
      <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
        ADD UPI
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>UPI</label>
        <input
          type="text"
          placeholder="Enter UPI"
          name="accountNumber"
          value={data.accountNumber}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountNumber ? "1px solid red" : "1px solid #ced4da"
            }`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>UPI Display Name</label>
        <input
          type="text"
          placeholder="UPI Display Name"
          value={data.accountHolderName}
          name="accountHolderName"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.accountHolderName ? "1px solid red" : "1px solid #ced4da"
            }`,
            borderRadius: "5px",
          }}
          onChange={handleChange}
        />

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

export default AddDepositUpiForm;
