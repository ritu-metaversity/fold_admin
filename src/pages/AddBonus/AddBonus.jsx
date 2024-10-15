/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Table, Select, Row, Col, Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { StatementPage } from "../../routes/Routes";
import { notifyToast } from "../../components/toast/Tost";

const AddBonus = () => {
  const [bonusData, setBonusData] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState();
  const [paginationData, setPaginationData] = useState({
    index: 0,
    noOfRecords: 100,
    totalPages: 1,
  });

  const columns = [
    {
      title: "Deposit Sequence",
      dataIndex: "approvedby",
    //   className: (record) => (record?.active ? "green-border" : "red-border"),
      render: (text, record) => (
        <div
          style={{
            borderLeft: `4px solid ${record?.active ? "green" : "red"}`,
            paddingLeft: "8px",
          }}
        >
          {record.depositSequence === 1 ? "First Bonus" : "All Bonus"}
        </div>
      ),
    },
    {
      title: "Bonus Percentage",
      dataIndex: "bonusPercentage1",
      align: "right",
    },
    {
      title: "Rolling",
      dataIndex: "rolling1",
      align: "right",
    },
    {
      title: "Maximan bonus",
      dataIndex: "fixAmountBonus1",
      align: "center",
    },
    {
      title: "Created Data",
      dataIndex: "createdOn",
      render: (text, record) => (
        <div>{moment(record?.createdOn).format("DD-MM-YYYY HH:MM:SS A")}</div>
      ),
    },
    {
      title: "Deleted Data",
      dataIndex: "createdOn",
      render: (text, record) => (
        <div>
          {record?.deletedOn
            ? moment(record?.deletedOn).format("DD-MM-YYYY HH:MM:SS A")
            : "--"}
        </div>
      ),
    },
    {
      title: "Bonus Validity",
      dataIndex: "bonusValidity",
      render: (text, record) => <div>{record?.bonusValidity} Days</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <>
        {
            record?.active?
       
        <Button
        onClick={()=>handleOpenDeleteModals(record)}
          style={{
            background: "#23292E",
            color: "white",
          }}>
          Delete
        </Button>:"" }
        </>
      ),
    },
  ];

  const handleOpenDeleteModals=(record)=>{
    setIsModalOpen(true)
    setDeletedData(record?.depositSequence);
  }

  const option = [
    {
      value: 1,
      label: "First Bonus",
    },
    {
      value: 2,
      label: "All Bonus",
    },
  ];

  const getBonus = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/bonus/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setBonusData(res?.data?.data);
      })
      .catch((error) => {
        message.error("Failed to fetch bonus data");
      });
  };

  const addBonus = async (value) => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/bonus/add`,
        {
          depositSequence: Number(value?.depositSequence),
          minDepositRange1: 1,
          maxDepositRange1: 1,
          bonusPercentage1: Number(value?.bonusPercentage1),
          fixAmountBonus1: Number(value?.fixAmountBonus1),
          rolling1: Number(value?.rolling1),
          bonusValidity: Number(value?.bonusValidity),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res?.data, "resresres1234");
        if (res?.data?.status) {
          notifyToast().succes(res?.data?.message);
          getBonus();
          form.resetFields();
        } else {
          notifyToast().error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error, "resresres1234");
        message.error("Failed to fetch bonus data");
      });
  };
  const deleteBonus = async() => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/bonus/delete`,
        {bounusSequence:deletedData},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          notifyToast().succes(res?.data?.message);
          getBonus();
        } else {
          notifyToast().error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error, "resresres1234");
        message.error("Failed to fetch bonus data");
      });
  };

  useEffect(() => {
    getBonus();
  }, []);
  const handleSubmit = (values) => {
    addBonus(values);
  };

  const handleOk = () => {
    deleteBonus();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="hading-create-accounts">
        <h4>Add Bonus</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={StatementPage} style={{ color: "#74788d" }}>
            Add Bonus
          </NavLink>
        </p>
      </div>
      <div className="table" style={{ width: "98%", padding: "10px" }}>
        <Form
          name="add_bonus"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            depositSequence: 1,
            bonusPercentage1: "",
            fixAmountBonus1: "",
            rolling1: "",
            bonusValidity: "",
          }}>
          <Row className="custom-gutter">
            <Col xs={24} md={4} >
              <Form.Item
                label="Deposit Sequence"
                name="depositSequence"
                rules={[
                  { required: true, message: "Please select sequence!" },
                ]}>
                <Select options={option} />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} >
              <Form.Item
                label="Bonus Percentage"
                name="bonusPercentage1"
                rules={[
                  { required: true, message: "Please enter bonus percentage!" },
                ]}>
                <Input
                  name="bonusPercentage1"
                  type="number"
                  placeholder="Bonus Percentage"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} >
              <Form.Item
                label="Maximan bonus"
                name="fixAmountBonus1"
                rules={[
                  { required: true, message: "Please enter Maximan bonus!" },
                ]}>
                <Input
                  name="fixAmountBonus1"
                  type="number"
                  placeholder="Maximan bonus"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} >
              <Form.Item
                label="Rolling"
                name="rolling1"
                rules={[
                  { required: true, message: "Please enter rolling value!" },
                ]}>
                <Input name="rolling1" type="number" placeholder="Rolling" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} >
              <Form.Item
                label="Bonus Validity (in Days)"
                name="bonusValidity"
                rules={[
                  { required: true, message: "Please enter bonus validity!" },
                ]}>
                <Input
                  name="bonusValidity"
                  type="number"
                  placeholder="Bonus Validity"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} >
              <Button
                type="primary"
                className="add_bonus_btn"
                htmlType="submit"
                style={{
                  background: "#23292E",
                  color: "white",
                  
                }}>
                Add Bonus
              </Button>
            </Col>
          </Row>
        </Form>

        <Table
          columns={columns}
          dataSource={bonusData || []}
          className="accountTable"
          pagination={{ pageSize: paginationData.noOfRecords }}
        />

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p style={{
            fontSize:"16px"
          }}>Are you sure want to Delete Bonus</p>
        </Modal>
      </div>
    </>
  );
};

export default AddBonus;
