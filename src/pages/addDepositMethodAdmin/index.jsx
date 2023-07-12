import { Button, Image, Input, Switch, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import {
  Add_banner,
  Banner_Delete,
  Banner_List,
  add_Deposit_Screen,
  add_withdrawal_Screen,
} from "../../routes/Routes";
import { NavLink } from "react-router-dom";
import { notifyToast } from "../../components/toast/Tost";

const AddDepositMethodAdmin = () => {
  const { setLoading } = useContext(LoaderContext);

  const [fileList, setFileList] = useState([]);
  const [bannerList, setBannerList] = useState([]);

  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    image: false,
    url: false,
  });
  ////////image
  const fileSize = fileList[0]?.size / 1024;
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setError((prev) => {
      return {
        ...prev,
        image: !Boolean(fileList),
      };
    });
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

  const onSubmit = async () => {
    const currentError = {
      image: !Boolean(fileList),
      url: !Boolean(url),
    };
    setError(currentError);
    let formData = new FormData();
    if (!fileList.length) {
      setError((prev) => {
        return {
          ...prev,
          image: Boolean(fileList),
        };
      });
    }

    formData.append("file", fileList[0].originFileObj);
    formData.append("method", url);

    if (fileSize > 1024) {
      return notifyToast().error("image size should be less then 1500kb");
    } else {
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(
          "http://18.143.24.35/admin-new-apis/deposit-type/save",
          // "http://192.168.68.131/withType/save",
          //   `${process.env.REACT_APP_BASE_URL}/${"withType/save"}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            setFileList([]);
            setUrl("");
            BannerListData();
            notifyToast().succes(res.data.message);
          } else {
            console.log("oute");

            notifyToast().error(res.data.message);
          }
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };

  const dataSource = bannerList?.map((res, index) => {
    return {
      key: res.type + index,
      id: res.id,
      image: (
        <Image
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
          src={res.image}
        />
      ),
      withdrawMethod: res.depositMethod,
      Action: (
        <>
          <Switch
            checked={res.active}
            size="small"
            onClick={() => update({ id: res.id })}
          />
        </>
      ),
    };
  });

  const BannerListData = async () => {
    setLoading((prev) => ({ ...prev, BannerList: true }));

    await axios
      .post(
        "http://18.143.24.35/admin-new-apis/deposit-type/get",
        // `${process.env.REACT_APP_BASE_URL}/${"deposit-type/get"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setBannerList(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, BannerList: false }));
  };
  //
  const update = async (id) => {
    await axios
      .post(
        // `${process.env.REACT_APP_BASE_URL}/${"withType/update"}`,
        "http://18.143.24.35/admin-new-apis/deposit-type/update",

        id,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        BannerListData();
        notifyToast().succes(res.data.message);

        // setBannerList(bannerList.filter((row) => row.id !== id));
      })
      .catch((error) => {
        // console.log(error);
        // message.error(error.response.data.message);
      });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Withdraw Method",
      dataIndex: "withdrawMethod",
      key: "withdrawMethod",
      // width: "30px",
      width: "27%",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  useEffect(() => {
    BannerListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ////////list Pyment method
  /////bank/list-payment-method
  useEffect(() => {
    return () => {
      setLoading((prev) => ({
        ...prev,
        BannerList: false,
      }));
    };
  }, [setLoading]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setError((prev) => {
      return {
        ...prev,
        url: !Boolean(value),
      };
    });
  };
  return (
    <>
      <div className="hading-create-accounts">
        <h4>Add Deposit</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to={add_Deposit_Screen} style={{ color: "#74788d" }}>
            Add Deposit
          </NavLink>
        </p>
      </div>
      <div className="banner-container">
        <div className="form-domain-card1">
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              className="img-div"
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
            >
              <label> Image</label>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                className={error.image ? "image-upload" : ""}
                accept="image/png, image/jpeg,image/jpg ,image/webp, image/svg, image/gif"
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>

            <div
              className="img-div"
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
            >
              <label style={{ width: "60px" }}>Link</label>
              <Input
                type="text"
                value={url}
                onChange={handleChange}
                name="clickUrl"
                style={{
                  border: `${error.url ? "1px solid red" : ""}`,
                }}
              />
            </div>
            <div className="btn" style={{ textAlign: "right" }}>
              <Button
                style={{
                  background: "black",
                  color: "white",
                  width: "auto",
                  border: "none",
                }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="form-domain-card2">
          <p style={{ marginTop: "8px", marginBottom: "8px" }}>Deposit List</p>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="table">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 500 }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDepositMethodAdmin;
