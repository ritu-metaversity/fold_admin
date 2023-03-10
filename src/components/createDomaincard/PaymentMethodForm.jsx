import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Payment_method_api } from "../../routes/Routes";

const PaymentForm = () => {
  const { setLoading } = useContext(LoaderContext);
  const [data, setData] = useState({
    transactionCode: "",
  });

  const [error, setError] = useState({
    transactionCode: false,
  });
  ////////image
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // console.log(fileList[0].name, "outer");

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
    setError((prev) => {
      return {
        ...prev,
        transactionCode: !Boolean(data.transactionCode),
      };
    });

    let formData = new FormData();
    if (!fileList.length) {
      console.log("no file");
      return;
    }

    formData.append("methodName", data.transactionCode);

    formData.append("logo", fileList[0].originFileObj);

    if (error.appName) {
    } else {
      setLoading((prev) => ({ ...prev, paymentMethodForm: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Payment_method_api}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setData((prev) => {
            return {
              ...prev,
              transactionCode: "",
            };
          });
          setFileList([]);
          message.success(res.data.message);
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          // if (error.response.data.status === 401) {
          //   setLoading((prev) => ({ ...prev, paymentMethodForm: false }));
          //   navigate("/");
          //   localStorage.removeItem("token");
          // }
        });
      setLoading((prev) => ({ ...prev, paymentMethodForm: false }));
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({ ...prev, paymentMethodForm: false }));
    };
  }, [setLoading]);
  return (
    <>
      <div className="form-domain-card">
        {/* <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
          Payment Method
        </p> */}
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Method Name</label>
          <input
            type="text"
            placeholder="Method Name"
            value={data.transactionCode}
            name="transactionCode"
            style={{
              padding: "0.375rem 0.75rem",
              lineHeight: "1.5",
              border: `${
                error.transactionCode ? "1px solid red" : "1px solid #ced4da"
              }`,

              borderRadius: "5px",
            }}
            onChange={handleChange}
          />

          <div className="img-div">
            <label> logo</label>
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                accept="image/png, image/jpeg,image/jpg ,image/webp, image/svg"
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
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
    </>
  );
};

export default PaymentForm;
