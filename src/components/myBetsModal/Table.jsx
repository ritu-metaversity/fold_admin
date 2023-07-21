import { Modal, Table, Tooltip, message } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LoaderContext } from "../../App";
import axios from "axios";
import { notifyToast } from "../toast/Tost";
const TableComponent = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchId, setMatchId] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const userType = localStorage.getItem("userType");
  const dataSource = [];
  data?.map((res, index) =>
    dataSource?.push({
      key: res?.userid + index + res?.pricevalue,
      UserName: res?.userid,
      Nation: res?.selectionname,
      Rate: `${res.odds} (${res?.pricevalue})`,
      Amount: res?.stack,
      Date: res?.matchedtime,
      IP: res?.userIp,
      BDetails: (
        <Tooltip title={res?.deviceInfo} placement="top">
          <span style={{ color: "#128412" }}>Detail</span>
        </Tooltip>
      ),

      isback: res?.isback,
      action: (
        <RiDeleteBin5Line
          fontSize={15}
          cursor={"pointer"}
          onClick={() => {
            showModal(res.id);
          }}
        />
      ),
    })
  );
  const columns = [
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Nation",
      dataIndex: "Nation",
      key: "Nation",
    },
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
    },
    {
      title: "B Details",
      dataIndex: "BDetails",
      key: "B Details",
    },
    userType == 4
      ? {
          title: "Action",
          dataIndex: "action",
          key: "action",
        }
      : {},
  ];
  const showModal = (id) => {
    setMatchId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    deleteBets(matchId);
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteBets = async () => {
    setLoading((prev) => ({ ...prev, accountStatement: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${"admin/delete-bet-by-id"}`,
        { id: matchId },
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
          message.error(res.data.message);
        }
      })
      .catch((erro) => {});
    setLoading((prev) => ({ ...prev, accountStatement: false }));
  };
  return (
    <div className="table-container">
      <Modal
        title="Delete bet"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Continue"
      >
        <p>Are you sure you want to continue.....</p>
      </Modal>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record) => {
          return record.isback ? "blue" : "pink";
        }}
        pagination={false}
        scroll={{
          y: 300,
          x: "auto",
        }}
      />
    </div>
  );
};

export default TableComponent;
