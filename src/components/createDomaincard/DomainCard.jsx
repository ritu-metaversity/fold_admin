import { Button, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { Create_app_detail, getCasinoTypeImageData } from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";
const DomainCard = () => {
  const { setLoading } = useContext(LoaderContext);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [casionTypeImageData, setCasionTypeImageData] = useState([]);
  const [casinoType, setCasinoType] = useState("");
  const [type, setType] = useState("");

  const [data, setData] = useState({
    appName: "",
    appUrl: "",
    transactionCode: "",
    isSelfAllowed: "",
  });

  const [error, setError] = useState({
    appName: false,
    appUrl: false,
    transactionCode: false,
    isSelfAllowed: false,
    image: false,
    image2: false,
  });
  const fileSize = fileList[0]?.size / 1024;
  ////////image
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setError((prev) => {
      return {
        ...prev,
        image: !Boolean(fileList),
      };
    });
  };
  const onChange2 = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
    setError((prev) => {
      return {
        ...prev,
        image2: !Boolean(fileList2),
      };
    });
  };
  // console.log(fileList[0].name, "outer");
  const handleSelect2 = (value) => {
    setCasinoType(value);
  };
  const handleChangeSelct = (value) => {
    setType(value);
    setError((prev) => {
      return {
        ...prev,
        isSelfAllowed: !Boolean(value),
      };
    });
  };
  // console.log(casionTypeImageData);
  const casinoOption = casionTypeImageData?.map((res) => {
    return {
      value: res.id,
      label: res.casinoImageGroupName,
    };
  });
  const options = [
    {
      value: "live",
      label: "live",
    },
    {
      value: "admin",
      label: "admin",
    },
  ];
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
  const onPreview2 = async (file) => {
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
        appName: !Boolean(data.appName),
      };
    });
    setError((prev) => {
      return {
        ...prev,
        appUrl: !Boolean(data.appUrl),
      };
    });
    setError((prev) => {
      return {
        ...prev,
        transactionCode: !Boolean(data.transactionCode),
      };
    });

    setError((prev) => {
      return {
        ...prev,
        isSelfAllowed: !Boolean(type),
      };
    });

    let formData = new FormData();
    if (!fileList.length || fileSize > 512) {
      setError((prev) => {
        return {
          ...prev,
          image: true,
          image2: true,
        };
      });
      // console.log("not hit");
      return notifyToast().error("image size should be less then 512kb");
    }

    formData.append("appname", data.appName);
    formData.append("appurl", data.appUrl);
    formData.append("logo", fileList[0].originFileObj);
    formData.append("lupassword", data.transactionCode);
    formData.append("favicon", fileList2[0].originFileObj);
    formData.append("casinoImageType", casinoType);
    formData.append(
      "isSelfAllowed",
      type === "live" ? true : type === "admin" ? false : false
    );

    if (
      !!error?.appName ||
      !!error?.appUrl ||
      !!error?.isSelfAllowed ||
      !!error?.transactionCode
    ) {
      return;
    } else {
      // console.log("hit");
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Create_app_detail}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          notifyToast().succes(res.data.message);
          setFileList([]);
          setFileList2([]);
          setData({
            appName: "",
            appUrl: "",
            transactionCode: "",
            isSelfAllowed: "",
          });
          setError({});
          setType("");
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };
  useEffect(() => {
    return () => {
      setLoading((prev) => ({ ...prev, createDomain: false }));
    };
  }, [setLoading]);

  useEffect(() => {
    const getCasinoTypeImag = async () => {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${getCasinoTypeImageData}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setCasionTypeImageData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCasinoTypeImag();
  }, []);
  return (
    <div className="form-domain-card">
      <p style={{ color: "#555", marginTop: "0px", fontWeight: "600" }}>
        General Information
      </p>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>App Name:</label>
        <input
          type="text"
          placeholder="App Name"
          name="appName"
          value={data.appName}
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.appName ? "1px solid red" : "1px solid #ced4da"}`,

            borderRadius: "5px",
          }}
          onChange={handleChange}
        />

        <label>App Url:</label>
        <input
          type="text"
          placeholder="App"
          value={data.appUrl}
          name="appUrl"
          style={{
            padding: "0.375rem 0.75rem",
            lineHeight: "1.5",
            border: `${error.appUrl ? "1px solid red" : "1px solid #ced4da"}`,
            borderRadius: "5px",
          }}
          onChange={handleChange}
        />
        <label>Type</label>
        <Select
          // defaultValue="please select Type"
          style={{
            width: "100%",
            border: `${error.isSelfAllowed ? "1px solid red" : ""}`,
          }}
          value={type || "please select Type"}
          onChange={handleChangeSelct}
          options={options}
        />
        <div className="img-div">
          <label>logo</label>
          <p
            style={{
              // width: "calc(100% - 10px)",
              border: error.image ? "1px solid red" : "1px solid #c6bdbd",
              padding: fileList.length > 0 ? "0px" : "10px",
              borderRadius: "5px",
            }}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              // className={error.image ? "image-upload" : ""}
              accept="image/png, image/jpeg,image/jpg ,image/webp,image/svg"
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </p>
        </div>
        <div className="img-div">
          <label>Favicon</label>
          <p
            style={{
              // width: "calc(96% - 10px)",
              borderRadius: "5px",
              border: error.image2 ? "1px solid red" : "1px solid #c6bdbd",
              padding: fileList2.length > 0 ? "0px" : "10px",
            }}
          >
            <Upload
              listType="picture"
              fileList={fileList2}
              onChange={onChange2}
              onPreview={onPreview2}
              // className={error.image2 ? "image-upload" : ""}
              accept="image/png, image/jpeg,image/jpg ,image/webp,image/svg"
            >
              {fileList2.length < 1 && "+ Upload"}
            </Upload>
          </p>
        </div>
        <label>Casino Image Type</label>
        <Select
          // defaultValue="please select Type"
          style={{
            width: "100%",
            border: `${error.isSelfAllowed ? "1px solid red" : ""}`,
          }}
          value={type || "Select Casino Image Type"}
          onChange={handleSelect2}
          options={casinoOption}
        />
        <label>Transaction Code:</label>
        <input
          type="password"
          placeholder="Transaction Code"
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

export default DomainCard;
