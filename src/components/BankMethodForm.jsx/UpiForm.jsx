import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Add_Bank, Add_Upi } from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
const UpiForm = () => {
  const { loading, setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    upiId: "",
    upiDisplayName: "",
  });

  const [error, setError] = useState({
    upiId: false,
    upiDisplayName: false,
  });
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
      upiId: !Boolean(data.upiId),
      upiDisplayName: !Boolean(data.upiDisplayName),
    };
    setError((prev) => {
      return {
        ...prev,
        ...nerror,
      };
    });

    if (nerror.upiId || nerror.upiDisplayName) {
      console.log("not hit");
    } else {
      setLoading((prev) => ({ ...prev, CreateQr: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Add_Upi}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          message.success(res.data.message);
          setData({
            upiId: "",
            upiDisplayName: "",
          });
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
  }, []);
  return (
    <div className="form-domain-card">
      <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
        ADD UPI
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>UPI</label>
        <input
          type="text"
          placeholder="Enter UPI"
          name="upiId"
          value={data.upiId}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.upiId ? "1px solid red" : "1px solid #ced4da"}`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>UPI Display Name</label>
        <input
          type="text"
          placeholder="UPI Display Name"
          value={data.upiDisplayName}
          name="upiDisplayName"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${
              error.upiDisplayName ? "1px solid red" : "1px solid #ced4da"
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

export default UpiForm;
