import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab_Transaction } from "../../../../routes/Routes";
import { useContext } from "react";
import { LoaderContext } from "../../../../App";
import "./styles.scss";

const Transaction = ({ data, dataTransaction }) => {
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoaderContext);
  const dataSource = [];

  transaction?.map((res) => {
    dataSource?.push({
      key: res.sno + res?.remark + res?.pts,
      sno: res?.sno,
      remark: res?.remark,
      pts: res?.pts,
      fromto: res?.fromto,
      debit: res?.debit,
      date: res?.date,
      credit: res?.credit,
    });
  });
  const columns = [
    {
      title: "S_no",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "pts",
      dataIndex: "pts",
      key: "pts",
    },

    {
      title: "fromto",
      dataIndex: "fromto",
      key: "fromto",
    },
    {
      title: "debit",
      dataIndex: "debit",
      key: "debit",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "credit",
      dataIndex: "credit",
      key: "credit",
    },
  ];
  const value = {
    noOfRecords: 25,
    index: 0,
    toDate: "00:00:0000",
    fromDate: "00:00:0000",
    userid: dataTransaction.userId,
    type: data,
  };
  useEffect(() => {
    const getTransaction = async () => {
      setLoading((prev) => ({ ...prev, getTransaction: true }));
      await axios

        .post(`${process.env.REACT_APP_BASE_URL}/${Tab_Transaction}`, value, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setTransaction(res?.data?.data?.dataList);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/");
            localStorage.removeItem("token");
            message.error(error.response.data.message);
          }
        });
      setLoading((prev) => ({ ...prev, getTransaction: false }));
    };
    getTransaction();
  }, []);
  return (
    <div style={{ paddingTop: "10px" }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="acountTable"
      />
    </div>
  );
};

export default Transaction;
