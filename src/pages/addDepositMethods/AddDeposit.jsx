import { Button, Image, Modal, Switch, Table } from "antd";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { LoaderContext } from "../../App";
import axios from "axios";
import { notifyToast } from "../../components/toast/Tost";
import { columns2 } from "./TableColumn";

import AddDepositBankForm from "../../components/addDepositMethodForm/addDepositBankForm";
import AddDepositUpiForm from "../../components/addDepositMethodForm/addDepositUpiForm";
import AddDepositQrForm from "../../components/addDepositMethodForm/addDepositQrForm";
import AddDepositGpay from "../../components/addDepositMethodForm/AddDepositGpay";
export let BannerList;
const AddDeposit = () => {
  const [sSubAdminBannerList, setSubAdminBannerList] = useState([]);
  const { setLoading } = useContext(LoaderContext);
  const [id, setId] = useState("");
  const [userData, setuserData] = useState();
  // const [checkBoxArray, setcheckBoxArray] = useState([]);
  // const [value, setvalue] = useState({});
  const [modalFormValue, setModalFormValue] = useState();
  const findUser = (methodName) => {
    const userData = sSubAdminBannerList.find((curElm) => {
      return curElm.depositType === methodName;
    });
    setuserData(userData);
  };
  const BankFormObj = {
    0: (
      <AddDepositBankForm
        id={id}
        userData={userData}
        endingPoint={"update_bank"}
      />
    ),
    1: (
      <AddDepositUpiForm
        id={id}
        userData={userData}
        endingPoint={"update_bank"}
      />
    ),
    2: (
      <AddDepositQrForm
        id={id}
        userData={userData}
        endingPoint={"update_bank"}
      />
    ),
    3: <AddDepositGpay id={id} userData={userData} endingPoint={"update_bank"} name="GPAY" />,
    4: <AddDepositGpay id={id} userData={userData} endingPoint={"update_bank"} name="PHONE PE" />,
  };

  const BannerListDataSubAdmin = async () => {
    setLoading((prev) => ({ ...prev, BannerListDataSubAdmin: true }));

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/deposit-type/get_sub`,
        // `${import.meta.env.VITE_BASE_URL}/${"withtype-subadmin/get"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setSubAdminBannerList(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, BannerListDataSubAdmin: false }));
  };
  const dataSource2 = sSubAdminBannerList?.map((res, index) => {
    return {
      key: res.type + res.image + res.withdrawType + index,
      id: res.id,
      image: (
        <Image
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
          src={res.image}
        />
      ),
      withdrawMethod: res.depositType,
      Action: (
        <>
          <Button
            style={{ background: "black", color: "white", border: "none" }}
            onClick={() => {
              findUser(res.depositType);
              setId(res.id);
              setModalFormValue(
                res.depositType === "BANK"
                  ? 0
                  : res.depositType === "UPI"
                  ? 1
                  : res.depositType === "QR"
                  ? 2
                  : res.depositType === "G PAY"
                  ? 3
                  : 4
              );
              showModal();
            }}
          >
            Update
          </Button>
          <Switch
            checked={res.active}
            size="small"
            onClick={() => update({ id: res.id })}
          />
        </>
      ),
    };
  });

  const update = async (id) => {
    setLoading((prev) => ({ ...prev, subAdminupdate: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"deposit-type/update_sub"}`,

        id,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        notifyToast().succes(res.data.message);
        BannerListDataSubAdmin();
        // setBannerList(bannerList.filter((row) => row.id !== id));
      })

      .catch((error) => {
        // console.log(error);
        // message.error(error.response.data.message);
      });
    setLoading((prev) => ({ ...prev, subAdminupdate: false }));
  };

  useEffect(() => {
    BannerListDataSubAdmin();
  }, []);
  BannerList = BannerListDataSubAdmin;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {BankFormObj[modalFormValue]}
      </Modal>
      <Table dataSource={dataSource2} columns={columns2} />
    </div>
  );
};

export default AddDeposit;
