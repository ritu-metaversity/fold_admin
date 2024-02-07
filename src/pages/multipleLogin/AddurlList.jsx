import React, { useContext, useMemo } from "react";
import { LoaderContext } from "../../App";
import axios from "axios";
import { Button, Input, Select } from "antd";
import { useState } from "react";
import { notifyToast } from "../../components/toast/Tost";
import { useEffect } from "react";

const AddurlList = ({ useData, handleCance }) => {
  const { setLoading } = useContext(LoaderContext);
  const [getDomainValue, setGetDomainValue] = useState([]);
  const addUrlList = async (options) => {
    setLoading((prev) => ({ ...prev, addUrlList: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"appid-login/save"}`,
        { userId: useData?.userid, appUrl: options },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          handleCance();
          notifyToast().succes(res.data.message);
        } else {
          notifyToast().error(res.data.message);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, addUrlList: false }));

    // setLoading(false);
  };
  const optionValue = useMemo(
    () =>
      getDomainValue?.map((curElm, index) => {
        return {
          value: curElm.appurl + "::" + index,
          label: curElm.appurl,
        };
      }),
    [getDomainValue]
  );

  // const options = getDomainValue?.map((curELm) => {
  //   console.log(curELm,"cur")
  //   return {
  //     label: curELm.label,
  //     value: curELm.value,
  //   };
  // });
  const getDomainList = async () => {
    setLoading((prev) => ({ ...prev, getDomainList: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"appid-login/getforlistdomain"}`,
        { userId: useData?.userid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setGetDomainValue(res.data.data);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, getDomainList: false }));

    // setLoading(false);
  };
  useEffect(() => {
    getDomainList();
  }, [useData?.userid]);

  //   for (let i = 0; i < optionValue; i++) {
  //     const value = `${i.toString(36)}${i}`;
  //     options.push({
  //       label: value,
  //       value,
  //       disabled: i === 10,
  //     });
  //   }
  const [selectValue, setSelectValue] = useState([]);
  const [selectError, setselectError] = useState(false);
  const handleChange = (value) => {
    const newVal = value?.map((rem) => rem?.split("::")[0]);
    // const newVal = value[0].split("::");
    setSelectValue(newVal);
    if (value) {
      setselectError(false);
    } else {
      setselectError(true);
    }
  };

  const onSubmit = () => {
    if (selectValue.length > 0) {
      setselectError(false);
      addUrlList(selectValue);
    } else {
      setselectError(true);
    }
  };
  return (
    <div>
      <label htmlFor="" style={{ display: "block", marginBlock: "10px" }}>
        User Id
      </label>
      <Input type="text" disabled value={useData?.userName} />
      <label htmlFor="" style={{ display: "block", marginBlock: "10px" }}>
        Select Domain{" "}
      </label>
      <Select
        mode="multiple"
        style={{
          width: "80%",
          border: selectError ? "1px solid red" : "",
        }}
        placeholder="Please select Domain"
        value={selectValue}
        onChange={handleChange}
        options={optionValue}
      />
      <div className="submit" style={{ textAlign: "right" }}>
        <Button
          style={{ background: "orange", color: "white", border: "none" }}
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddurlList;
