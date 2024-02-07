import React, { useContext, useEffect, useState } from "react";
///styles
import "./styles.scss";
import { Button, Checkbox, Image, Switch, Table } from "antd";
import { NavLink } from "react-router-dom";
import { add_withdrawal_SubAdmin_Screen } from "../../routes/Routes";
import axios from "axios";
import { LoaderContext } from "../../App";
import { notifyToast } from "../../components/toast/Tost";
import { columns, columns2 } from "./TableColumn";
const AddWithdrawalSub = () => {
  const { setLoading } = useContext(LoaderContext);
  const [bannerList, setBannerList] = useState([]);
  const [checkBoxArray, setcheckBoxArray] = useState([]);
  const [value, setvalue] = useState({});
  const [sSubAdminBannerList, setSubAdminBannerList] = useState([]);
  const onChange = (obj) => {
    let name = obj.id;
    let value = obj.value.target.checked;
    if (name && value) {
      setvalue((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setcheckBoxArray((prev) => {
        return [...prev, name];
      });
    } else {
      setvalue((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
      let value = checkBoxArray?.find((curElm) => curElm == name);
      let indexval = checkBoxArray.indexOf(value);
      checkBoxArray.splice(indexval, 1);
    }
  };
  console.log(value);
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
      withdrawMethod: res.withdrawMethod,
      Action: (
        <>
          <Checkbox
            checked={value[res.withdrawMethod]}
            onChange={(e) => onChange({ id: res.withdrawMethod, value: e })}
          ></Checkbox>
        </>
      ),
    };
  });

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
      withdrawMethod: res.withdrawType,
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
  const update = async (id) => {
    setLoading((prev) => ({ ...prev, subAdminupdate: true }));
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"withdraw-subadmin/update"}`,
        // "http://192.168.68.131/withdraw-subadmin/update",

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

  const BannerListDataSubAdmin = async () => {
    setLoading((prev) => ({ ...prev, BannerListDataSubAdmin: true }));

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"withtype-subadmin/get"}`,
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

  const BannerListData = async () => {
    setLoading((prev) => ({ ...prev, BannerListData: true }));

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${"withType/get"}`,
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
    BannerListDataSubAdmin();
    BannerListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitForm = async () => {
    if (checkBoxArray.length > 0) {
      setLoading((prev) => ({ ...prev, BannersubmitForm: true }));
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/${"withTypeSub/Save"}`,
          // "http://192.168.68.133/withTypeSub/Save",
          {
            withdrawType: checkBoxArray,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              // "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            setvalue({});
            setcheckBoxArray([]);
            BannerListDataSubAdmin();

            notifyToast().succes(res.data.message);
          } else {
            setLoading((prev) => ({ ...prev, BannersubmitForm: false }));

            notifyToast().error(res.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, BannersubmitForm: false }));
    } else {
      notifyToast().error("Please Select Any One Value");
    }
  };
  return (
    <div>
      <div className="hading-create-accounts">
        <h4>Add Withdrawal</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          {/* <NavLink to="/activeUser">User / </NavLink> */}
          <NavLink
            to={add_withdrawal_SubAdmin_Screen}
            style={{ color: "#74788d" }}
          >
            Add Withdrawal
          </NavLink>
        </p>
      </div>
      <div className="addWithdrawalSub-conatiner">
        <div className="addWithdrawalSub-left-col">
          <Table dataSource={dataSource2} columns={columns2} />
        </div>
        <div className="addWithdrawalSub-right-col">
          <p style={{ paddingLeft: "20px", fontWeight: 800 }}>
            All Payment Method
          </p>
          <Table dataSource={dataSource} columns={columns} />
          <div className="save-heading">
            <Button onClick={() => submitForm()}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWithdrawalSub;
