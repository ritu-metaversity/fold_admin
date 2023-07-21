import { Button, DatePicker, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { LoaderContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { notifyToast } from "../toast/Tost";

const DeletedBetList = ({ handleCancelDeletedModal }) => {
  const { setLoading } = useContext(LoaderContext);
  const [marketName, setMarketName] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payloadData, setPayloadData] = useState({
    fromDateTime: "",
    toDateTime: "",
    marketId: "",
  });

  const [errorData, setErrorData] = useState({
    fromDateTime: false,
    toDateTime: false,
    marketId: false,
  });

  const option = marketName?.map((curELm) => {
    return {
      value: curELm?.marketId,
      label: curELm?.marketName,
    };
  });

  const { id } = useParams();

  const getMatchData = async () => {
    setLoading((prev) => ({ ...prev, getUserBook: true }));
    await axios
      .post(
        `${
          process.env.REACT_APP_BASE_URL
        }/${"bets/market-name-with-id-by-matchid"}`,
        { matchId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setMarketName(res?.data?.data);
        } else {
          notifyToast().error(res.data.message);
        }
        // setCompletedMatch(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, getUserBook: false }));
  };
  useEffect(() => {
    getMatchData();
  }, []);
  //

  const getDeletedBetData = async () => {
    setLoading((prev) => ({ ...prev, getUserBook: true }));
    await axios
      .post(
        `${
          process.env.REACT_APP_BASE_URL
        }/${"admin/delete-bets-by-time-and-type"}`,
        payloadData,
        // {
        //   fromDateTime: "2023-07-08 18:09:34",
        //   toDateTime: "2023-07-08 18:09:57",
        //   marketId: "4.1168741507-OE",
        // },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          // setMarketName(res?.data?.data);
          notifyToast().succes(res.data.message);
          handleCancel();
          handleCancelDeletedModal();
        }
        // setCompletedMatch(res.data.data);
      })
      .catch((error) => {});

    setLoading((prev) => ({ ...prev, getUserBook: false }));
  };

  const handleChange = (value) => {
    setPayloadData((prev) => {
      return {
        ...prev,
        marketId: value,
      };
    });
    setErrorData((prev) => {
      return {
        ...prev,
        marketId: false,
      };
    });
    // getDeletedBetData(value);
  };
  const onChange = (date, dateString) => {
    setPayloadData((prev) => {
      return {
        ...prev,
        fromDateTime: dateString,
      };
    });
    if (dateString) {
      setErrorData((prev) => {
        return {
          ...prev,
          fromDateTime: false,
        };
      });
    }
  };

  const onChange2 = (date, dateString) => {
    setPayloadData((prev) => {
      return {
        ...prev,
        toDateTime: dateString,
      };
    });
    if (dateString) {
      setErrorData((prev) => {
        return {
          ...prev,
          toDateTime: false,
        };
      });
    }
  };
  //   useEffect(() => {
  //     getDeletedBetData();
  //   }, []);
  const showModal = () => {
    let isSuccess = false;

    for (const key of Object.keys(payloadData)) {
      setErrorData((prev) => {
        return { ...prev, [key]: Boolean(!payloadData[key]) };
      });
    }

    for (const key of Object.keys(payloadData)) {
      const value = Boolean(payloadData[key]);
      if (!value) {
        isSuccess = false;
        break;
      } else {
        isSuccess = true;
      }
    }
    if (isSuccess) {
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    getDeletedBetData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Delete bet"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Continue"
      >
        <p>Are you sure you want to continue.....</p>
      </Modal>
      <div>
        from date
        <DatePicker
          onChange={onChange}
          showTime
          style={{
            marginInline: "10px",
            border: errorData.fromDateTime ? "1px solid red" : "",
          }}
        />
        to date
        <DatePicker
          onChange={onChange2}
          showTime
          style={{
            marginLeft: "10px",
            border: errorData.toDateTime ? "1px solid red" : "",
          }}
        />
        <Select
          defaultValue="Select"
          style={{
            width: "140px",
            marginLeft: "10px",
            border: errorData.marketId ? "1px solid red" : "",
          }}
          onChange={handleChange}
          options={option}
        />
        <Button
          onClick={showModal}
          style={{
            marginLeft: "20px",
            background: "rgb(241, 133, 33)",
            border: "none",
            color: "white",
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeletedBetList;
