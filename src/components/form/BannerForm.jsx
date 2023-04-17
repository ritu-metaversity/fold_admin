import { Button, Image, Input, Select, Table, Tooltip, Upload } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import { GoTrashcan } from "react-icons/go";
import { Add_banner, Banner_Delete, Banner_List } from "../../routes/Routes";
import { NavLink } from "react-router-dom";
import DeleteModal from "../deleteModal/DeleteModal";
import { notifyToast } from "../toast/Tost";

const BannerFormComponent = () => {
  const { setLoading } = useContext(LoaderContext);
  const [priority, setPriority] = useState("");

  const [fileList, setFileList] = useState([]);
  const [type, setType] = useState("");
  const [typeValue, setTypeValue] = useState(1);
  const [bannerList, setBannerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [apiCall, setApiCall] = useState(0);
  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    priority: false,
    type: false,
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

  const handleChangeSelctType = (value) => {
    setTypeValue(value);
  };
  const handleChangeSelct = (value) => {
    setType(value);
    setError((prev) => {
      return {
        ...prev,
        type: !Boolean(value),
      };
    });
  };
  const options = [
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
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
  //////////////

  const handleChangeSelctPriority = (value) => {
    setPriority(value);
    setError((prev) => {
      return {
        ...prev,
        priority: !Boolean(value),
      };
    });
  };
  const onSubmit = async () => {
    const currentError = {
      priority: !Boolean(priority),
      type: !Boolean(type),
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

    formData.append("type", type);
    formData.append("priority", priority);
    formData.append("image", fileList[0].originFileObj);
    formData.append("clickUrl", url);

    if (currentError.priority || currentError.type) {
      setError((prev) => {
        return {
          ...prev,
          priority: !Boolean(priority),
          type: !Boolean(type),
          utl: !Boolean(url),
        };
      });
      return;
    }
    if (fileSize > 1024) {
      return notifyToast().error("image size should be less then 1500kb");
    } else {
      setLoading((prev) => ({ ...prev, createDomain: true }));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/${Add_banner}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFileList([]);
          setType();
          setPriority();
          setUrl("");
          notifyToast().succes(res.data.message);
        })
        .catch((error) => {});
      setLoading((prev) => ({ ...prev, createDomain: false }));
    }
  };
  const option = [
    {
      value: 1,
      label: "Top",
    },
    {
      value: 2,
      label: "Left",
    },
  ];
  const optionType = [
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
  ];
  const dataSource = bannerList?.map((res, index) => {
    return {
      key: res.type + index,
      name: res.type,
      age: (
        <Image
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
          src={res.path}
        />
      ),
      address: res.priority,
      Action: (
        <>
          <Tooltip placement="top" title={"Delete"}>
            <Button
              onClick={() => {
                showModal(res.id);
                setApiCall(2);
              }}
              style={{ border: "none" }}
            >
              <GoTrashcan style={{ color: "red" }} />
            </Button>
          </Tooltip>
        </>
      ),
    };
  });
  const deleteRow = async (id) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Banner_Delete}`,
        {
          bannerId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        notifyToast().succes(res.data.message);
        setBannerList(bannerList.filter((row) => row.id !== id));
      })
      .catch((error) => {
        // console.log(error);
        // message.error(error.response.data.message);
      });
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "age",
      key: "age",
      // width: "30px",
      width: "27%",
    },
    {
      title: "priority",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const BannerListData = async () => {
    setLoading((prev) => ({ ...prev, BannerList: true }));

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Banner_List}`,
        { type: typeValue },
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
  useEffect(() => {
    BannerListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValue]);
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

  const showModal = (id) => {
    setIsModalOpen(true);
    setdeleteRowId(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deleteRow(deleteRowId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      <DeleteModal
        showModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        remarkRender={1}
        headerColor={apiCall}
      />
      <div className="hading-create-accounts">
        <h4>ADD BANNER</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink to="/Update-Banner" style={{ color: "#74788d" }}>
            ADD BANNER
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
              <label style={{ width: "60px" }}>Type</label>
              <Select
                defaultValue=""
                value={type || "Select Type"}
                style={{
                  width: "100%",
                  border: `${error.type ? "1px solid red" : ""}`,
                }}
                onChange={handleChangeSelct}
                options={option}
              />
            </div>
            <div
              className="img-div"
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
            >
              <label style={{ width: "60px" }}>Priority</label>
              <Select
                defaultValue=""
                value={priority || "Select Priority"}
                style={{
                  width: "100%",
                  border: `${error.priority ? "1px solid red" : ""}`,
                }}
                onChange={handleChangeSelctPriority}
                options={options}
              />
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
          <p style={{ marginTop: "8px", marginBottom: "8px" }}>Banner List</p>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              className="img-div"
              style={{ display: "flex", gap: "20px", alignItems: "center" }}
            >
              <label style={{ width: "60px" }}>Type</label>
              <Select
                value={typeValue || "Select Type"}
                style={{
                  width: "100%",
                }}
                onChange={handleChangeSelctType}
                options={optionType}
              />
            </div>
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

export default BannerFormComponent;
