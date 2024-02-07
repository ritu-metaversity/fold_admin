import { Button, Modal, Table } from "antd";
import React, { useContext } from "react";
import { columns } from "./Colums";
import { LoaderContext } from "../../App";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { notifyToast } from "../../components/toast/Tost";

const ViewUrlList = ({ useData, handleCance }) => {
  const { setLoading } = useContext(LoaderContext);
  const [domainValue, setDomainValue] = useState([]);
  const dataSource = domainValue?.map((curElm) => {
    return {
      key: curElm.id + curElm.appId + curElm.appUrl,
      appid: curElm.appId,
      userid: curElm.appUrl,
      action: (
        <Button
          style={{ background: "orange", color: "white", border: "none" }}
          onClick={() => showModal(curElm.id)}
        >
          Delete
        </Button>
      ),
    };
  });

  const viewDomainList = async () => {
    setLoading((prev) => ({ ...prev, viewDomainList: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"appid-login/get"}`,
        { userId: useData?.userid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data) {
          setDomainValue(res?.data?.data);
        }
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // if (error.response.status === 401) {
        //   navigate("/");
        //   localStorage.removeItem("token");
        // }
      });
    setLoading((prev) => ({ ...prev, viewDomainList: false }));

    // setLoading(false);
  };
  useEffect(() => {
    viewDomainList();
  }, [useData]);

  const deleteDomain = async (id) => {
    setLoading((prev) => ({ ...prev, deleteDomain: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"appid-login/delete"}`,
        { appid: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          notifyToast().succes(res.data.message);
          handleCancel();
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
    setLoading((prev) => ({ ...prev, deleteDomain: false }));

    // setLoading(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domainId, setDomainId] = useState("");

  const showModal = (id) => {
    setDomainId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    deleteDomain(domainId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    handleCance();
  };
  return (
    <div>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Continue"
      >
        Are you sure you want to Continue....
      </Modal>
      <p style={{ fontSize: "18px", fontWeight: "600", margin: "0px" }}>
        Sub Admin Domain List
      </p>
      <Table
        columns={columns}
        dataSource={dataSource}
        className="accountTable"
      />
    </div>
  );
};

export default ViewUrlList;
