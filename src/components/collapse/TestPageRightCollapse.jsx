import { Button, Collapse, Empty, message, Modal, Tabs } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import { Market_Name_MatchId } from "../../routes/Routes";
import ModalViewMore from "../myBetsModal/Modal-View-More";

import "./styles.scss";

const TestPageRightCollapse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabData, setTabData] = useState([]);
  const { loading, setLoading } = useContext(LoaderContext);
  const [searchparam] = useSearchParams();
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
  const id = searchparam.get("event-id");
  const navigate = useNavigate();
  const getViewMoreTabData = async () => {
    setLoading((prev) => ({ ...prev, getViewMoreTabData: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Market_Name_MatchId}`,
        { matchId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTabData(res?.data?.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);

        if (error.response.data.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          message.error(error.response.data.message);
        } else {
          message.error(error.response.data.message);
        }
      });
    setLoading((prev) => ({ ...prev, getViewMoreTabData: false }));
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
        {tabData?.length > 0 ? (
          <Tabs
            defaultActiveKey="1"
            type="card"
            destroyInactiveTabPane
            items={tabData?.map((ele, index) => {
              return {
                label: ele,
                key: ele + index,
                children: <ModalViewMore keyName={ele} />,
              };
            })}
            className="my-Bets-view-more"
          />
        ) : (
          <Empty />
        )}
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
