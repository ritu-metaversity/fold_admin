import { Button, Image, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { columns } from "./tableData";
import axios from "axios";
import { getAppDetail } from "../../routes/Routes";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateDetailForm from "./UpdateDetailForm";
const GetDomainDetailTable = () => {
  const [appdetailData, setAppdetailData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const showModal = (id) => {
    setIsModalOpen(true);
    setUserId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getDomainDetailData = async () => {
    await axios
      .post(
        // "http://192.168.68.114/admin/app-detail",
        `${process.env.REACT_APP_BASE_URL}/${getAppDetail}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setAppdetailData(res.data.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getDomainDetailData();
  }, []);

  const dataSource = appdetailData.map((res) => {
    return {
      key: res.appName + res.appUrl + res.appId,
      Name: res.appName,
      Url: res.appUrl,
      Id: res.appId,
      Logo: (
        <Image
          src={res.appLogoImg}
          alt="Logo"
          width={40}
          height={40}
          style={{ borderRadius: "100px" }}
        />
      ),
      favicon: (
        <Image
          src={res.favicon}
          alt="favicon"
          width={40}
          height={40}
          style={{ borderRadius: "100px" }}
        />
      ),
      //   selfAllowed: res.selfAllowed,
      Action: (
        <AiOutlineEdit
          style={{ cursor: "pointer" }}
          size={25}
          onClick={() => showModal(res.appId)}
        />
      ),
    };
  });

  return (
    <>
      <Modal
        // title="Update Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <UpdateDetailForm id={userId} handleCancel={handleCancel} />
      </Modal>
      <div className="get-domain-table-container">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
};

export default GetDomainDetailTable;
