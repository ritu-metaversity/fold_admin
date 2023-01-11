import { Button, Collapse, Modal, Tabs } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Market_Name_MatchId } from "../../routes/Routes";
import ModalViewMore from "../myBetsModal/Modal-View-More";

import "./styles.scss";

const TestPageRightCollapse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabData, setTabData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
    getViewMoreTabData();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getViewMoreTabData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Market_Name_MatchId}`,
        { matchId: 31903483 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTabData(res?.data?.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Modal
        title="View More"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        okText="ok"
        footer={null}
        width={1300}
        style={{ top: "8px" }}
        // cancelButtonProps={{ hidden: isExFlag }}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          destroyInactiveTabPane
          items={tabData?.map((ele) => {
            return {
              label: ele,
              key: ele,
              children: <ModalViewMore keyName={ele} />,
            };
          })}
          className="my-Bets-view-more"
        />
      </Modal>
      <div className="heading-match-bet">
        <h5>MY BETS</h5>
        <Button
          style={{
            padding: "3px",
            background: "#F18521",
            border: "none",
            color: "white",
            borderRadius: "4px",
          }}
          onClick={showModal}
        >
          View more
        </Button>
      </div>
    </div>
  );
};

export default TestPageRightCollapse;
