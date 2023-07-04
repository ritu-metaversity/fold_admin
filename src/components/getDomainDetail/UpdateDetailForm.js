import { Button, Select, Switch, Upload } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  getAppDetailById,
  getCasinoTypeImageData,
  updateUserDetail,
} from "../../routes/Routes";
import { notifyToast } from "../toast/Tost";
import { LoaderContext } from "../../App";

function blobCreationFromURL(inputURI) {
  var binaryVal;

  // mime extension extraction
  var inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];

  // Extract remaining part of URL and convert it to binary value
  if (inputURI.split(",")[0].indexOf("base64") >= 0)
    binaryVal = atob(inputURI.split(",")[1]);
  // Decoding of base64 encoded string
  else binaryVal = unescape(inputURI.split(",")[1]);

  // Computation of new string in which hexadecimal
  // escape sequences are replaced by the character
  // it represents

  // Store the bytes of the string to a typed array
  var blobArray = [];
  for (var index = 0; index < binaryVal.length; index++) {
    blobArray.push(binaryVal.charCodeAt(index));
  }

  return new Blob([blobArray], {
    type: inputMIME,
  });
}

const UpdateDetailForm = ({ id, handleCancel }) => {
  //   const [fileList, setFileList] = useState([]);
  //   const [fileList2, setFileList2] = useState([

  //   ]);
  const [changed, setChanged] = useState([false, false]);
  const { setLoading } = useContext(LoaderContext);
  const [fileList, setFileList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  // const [isDemoIdLoginAllowed, setIsDemoIdLoginAllowed] = useState(false);
  const [fileList2, setFileList2] = useState([
    // {
    //   url: img,
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    // },
  ]);
  const [casionTypeImageData, setCasionTypeImageData] = useState([]);
  const [casinoType, setCasinoType] = useState("");
  const [type, setType] = useState("");

  const [data, setData] = useState({
    appName: "",
    appUrl: "",
    transactionCode: "",
    isSelfAllowed: "",
    isDemoIdLoginAllowed: false,
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
    setChanged((prev) => [true, prev[1]]);
    setError((prev) => {
      return {
        ...prev,
        image: !Boolean(fileList),
      };
    });
  };
  const onChange2 = ({ fileList: newFileList }) => {
    setChanged((prev) => [prev[0], true]);
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
    console.log("Select changed: ", value);
    setCasinoType(value);
  };
  const handleChangeSelct = (value) => {
    setData((prev) => {
      return {
        ...prev,
        isSelfAllowed: value,
      };
    });
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

  const getValueFromApi = () => {
    if (!!casinoOption && !!casinoOption?.length && userDetail) {
      const { casinoImageType } = userDetail;
      const findValueWithLabel = casinoOption.find(
        (el) => el?.label === casinoImageType
      );

      return findValueWithLabel?.value ?? "";
    }
  };

  const onSubmit = async () => {
    const newError = { ...error };
    newError.appName = !Boolean(data.appName);
    newError.appUrl = !Boolean(data.appUrl);
    newError.transactionCode = !Boolean(data.transactionCode);
    newError.isSelfAllowed = !Boolean(data.isSelfAllowed);

    let formData = new FormData();
    if (!fileList.length || fileSize > 512) {
      newError.image = true;
      newError.image2 = true;
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
    setError(newError);

    formData.append("appId", id);
    // formData.append("appurl", data.appUrl);
    if (changed[0] && fileList[0])
      if (!fileList[0].originFileObj) {
        formData.append("logo", blobCreationFromURL(fileList[0].url));
      } else {
        formData.append("logo", fileList[0].originFileObj);
      }
    else formData.append("logo", null);

    formData.append("lupassword", data.transactionCode);
    if (changed[1] && fileList2[0])
      if (!fileList2[0].originFileObj) {
        formData.append("favicon", blobCreationFromURL(fileList2[0].url));
      } else {
        formData.append("favicon", fileList2[0].originFileObj);
      }
    else formData.append("favicon", null);

    // formData.append("favicon", fileList2[0].originFileObj);
    formData.append(
      "casinoImageType",
      getValueFromApi() && !casinoType ? getValueFromApi() : casinoType
    );
    formData.append(
      "isSelfAllowed",
      data.isSelfAllowed === "admin" ? false : true
    );
    formData.append("isDemoIdLoginAllowed", data.isDemoIdLoginAllowed);

    console.log(Object.values(newError).some((item) => item));
    if (Object.values(newError).some((item) => item)) {
      return;
    } else {
      // console.log("hit");
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(
          // "http://192.168.68.114/admin/update-app-detail",
          `${process.env.REACT_APP_BASE_URL}/${updateUserDetail}`,
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
          handleCancel();
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

  const getData = async () => {
    // if (!fileList2?.length) {

    // //
    // }
    const userId = id;
    await axios
      .post(
        // "http://192.168.68.114/admin/app-detail-byid",
        `${process.env.REACT_APP_BASE_URL}/${getAppDetailById}`,
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // const user = casionTypeImageData.find((ele) => ele);
        // console.log(casionTypeImageData);

        setUserDetail(res.data.data);
        setData((prev) => {
          return {
            ...prev,
            appName: res?.data?.data?.appName,
            appUrl: res?.data?.data?.appUrl,
            //   transactionCode: "",
            // casinoType: "",
            isSelfAllowed: res?.data?.data?.selfAllowed ? "live" : "admin",
            isDemoIdLoginAllowed: res.data.data.isDemoIdLoginAllowed,
          };
        });

        setFileList2([
          {
            url: res?.data?.data?.favicon,
            uid: "-1",
            name: "image.png",
            status: "done",
          },
        ]);
        setFileList([
          {
            url: res?.data?.data?.appLogoImg,
            uid: "-1",
            name: "image.png",
            status: "done",
          },
        ]);
      });
  };

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
        //   setData((prev) => {
        //     return {
        //       ...prev,
        //       ...res.data.data,
        //       //   appUrl: "",
        //       //   transactionCode: "",
        //       //   isSelfAllowed: "",
        //     };
        //   });
        //   setData((o) => ({ ...o, ...res.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCasinoTypeImag();
    getData();
  }, []);

  useEffect(() => {
    if (!!casinoOption && !!casinoOption?.length && userDetail) {
      const { casinoImageType } = userDetail;
      const findValueWithLabel = casinoOption.find(
        (el) => el?.label === casinoImageType
      );
      if (findValueWithLabel) {
        console.log({ findValueWithLabel });
        // setCasionImageTypeDefaut(findValueWithLabel);
      }
    }
  }, [casinoOption, userDetail]);
  console.log(data.isSelfAllowed);
  return (
    <div>
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
          //   defaultValue={type}
          value={type || data.isSelfAllowed}
          onChange={handleChangeSelct}
          options={options}
        />
        <div className="img-div">
          <label>logo</label>
          <p
            style={{
              // width: "calc(100% - 10px)",
              border: error.image ? "1px solid red" : "",
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
              border: error.image2 ? "1px solid red" : "",
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
          style={{
            width: "100%",
            border: `${error.isSelfAllowed ? "1px solid red" : ""}`,
          }}
          // defaultValue={data.casinoType}
          value={
            getValueFromApi() && !casinoType ? getValueFromApi() : casinoType
          }
          // defaultValue={casionImageTypeDefaut}
          onChange={handleSelect2}
          options={casinoOption}
          // defaultValue={"Dimond"}
        />
        <label>Demo Id Allowed:</label>
        <Switch
          style={{ width: "20px" }}
          size="small"
          checked={data.isDemoIdLoginAllowed}
          onChange={(checked) => {
            setData((prev) => {
              return {
                ...prev,
                isDemoIdLoginAllowed: checked,
              };
            });
          }}
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

export default UpdateDetailForm;
