import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab_Transaction } from "../../../../routes/Routes";
import { BASE_URL } from "../../../../_api/_api";
import "./styles.scss";

const Transaction = ({ data, dataTransaction }) => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await axios
        .post(`${BASE_URL}/${Tab_Transaction}`, value, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setTransaction(res?.data?.data?.dataList);
        });
    };
    getTransaction();
  }, []);
  return (
    <div style={{ paddingTop: "10px" }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="acountTable"
        loading={loading}
      />
    </div>
  );
};

export default Transaction;
