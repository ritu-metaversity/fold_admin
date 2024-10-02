import { Button, Checkbox, Image, Modal, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import axios from "axios";
import { columns } from "./TableColumn";

import AddDepositBankForm from "../../components/addDepositMethodForm/addDepositBankForm";
import AddDepositUpiForm from "../../components/addDepositMethodForm/addDepositUpiForm";
import AddDepositQrForm from "../../components/addDepositMethodForm/addDepositQrForm";
import AddDepositGpay from "../../components/addDepositMethodForm/AddDepositGpay";

const AllDepositMethods = () => {
  const { setLoading } = useContext(LoaderContext);
  const [id, setId] = useState("");
  const [bannerList, setBannerList] = useState([]);
  // const [checkBoxArray, setcheckBoxArray] = useState([]);
  // const [value, setvalue] = useState({});
  const [modalFormValue, setModalFormValue] = useState();
  const BankFormObj = {
    0: (
      <AddDepositBankForm
        id={id}
        endingPoint={"save-sub"}
        setModalFormValue={setModalFormValue}
      />
    ),
    1: <AddDepositUpiForm id={id} endingPoint={"save-sub"} />,
    2: <AddDepositQrForm id={id} endingPoint={"save-sub"} />,
    3: <AddDepositGpay id={id} endingPoint={"save-sub"} name="GPAY"/>,
    4: <AddDepositGpay id={id} endingPoint={"save-sub"} name="PHONE PE"/>,
  };

  // const onChange = (obj) => {
  //   let name = obj.id;
  //   let value = obj.value.target.checked;
  //   if (name && value) {
  //     setvalue((prev) => {
  //       return {
  //         ...prev,
  //         [name]: value,
  //       };
  //     });
  //     setcheckBoxArray((prev) => {
  //       return [...prev, name];
  //     });
  //   } else {
  //     setvalue((prev) => {
  //       return {
  //         ...prev,
  //         [name]: false,
  //       };
  //     });
  //     let value = checkBoxArray?.find((curElm) => curElm == name);
  //     let indexval = checkBoxArray.indexOf(value);
  //     checkBoxArray.splice(indexval, 1);
  //   }
  // };

  const name = {
    0:"Add Bank",
    1:"Add UPI",
    2:"Add QR",
    3:"Add GPAY",
    4:"Add PHONE PE"
    }

  const dataSource = bannerList?.map((res, index) => {
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
      depositMethod: res.depositMethod,
      Action: (
        <>
          <Button
            style={{ background: "black", color: "white", border: "none" }}
            onClick={() => {
              setId(res.id);
              setModalFormValue(
                res.depositMethod === "BANK"
                  ? 0
                  : res.depositMethod === "UPI"
                  ? 1
                  : res.depositMethod === "QR"
                  ? 2
                  : res.depositMethod === "G PAY"
                  ? 3
                  : 4
              );
              showModal();
            }}
          >
            Add
          </Button>
          {/* <Checkbox
            checked={value[res.withdrawMethod]}
            onChange={(e) => onChange({ id: res.withdrawMethod, value: e })}
          ></Checkbox> */}
        </>
      ),
    };
  });

  const BannerListData = async () => {
    setLoading((prev) => ({ ...prev, BannerListData: true }));

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/deposit-type/get`,
        // `${import.meta.env.VITE_BASE_URL}/${"withType/get"}`,
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
    setLoading((prev) => ({ ...prev, BannerListData: false }));
  };
  useEffect(() => {
    BannerListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const submitForm = async () => {
  //   if (checkBoxArray.length > 0) {
  //     setLoading((prev) => ({ ...prev, BannersubmitForm: true }));
  //     await axios
  //       .post(
  //         `${import.meta.env.VITE_BASE_URL}/${"withTypeSub/Save"}`,
  //         // "http://192.168.68.133/withTypeSub/Save",
  //         {
  //           withdrawType: checkBoxArray,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             // "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.status) {
  //           setvalue({});
  //           setcheckBoxArray([]);

  //           notifyToast().succes(res.data.message);
  //         } else {
  //           setLoading((prev) => ({ ...prev, BannersubmitForm: false }));

  //           notifyToast().error(res.data.message);
  //         }
  //       });
  //     setLoading((prev) => ({ ...prev, BannersubmitForm: false }));
  //   } else {
  //     notifyToast().error("Please Select Any One Value");
  //   }
  // };

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
         title={name[modalFormValue]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {BankFormObj[modalFormValue]}
      </Modal>
      <Table dataSource={dataSource} columns={columns} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default AllDepositMethods;
