import { Modal } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoaderContext } from "../../App";
import { Get_View_Bets } from "../../routes/Routes";
import CasionBetTable from "./CasionBetTable";
import "./styles.scss";
const CasionCard = ({ data, count }) => {
  // console.log(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMoreData, setViewMoreData] = useState([]);
  const { setLoading } = useContext(LoaderContext);
  const showModal = (id) => {
    setIsModalOpen(true);
    viewmorebets(id);
    // console.log(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const viewmorebets = async (id) => {
    setLoading((prev) => ({ ...prev, viewmorebets: true }));
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${Get_View_Bets}`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setViewMoreData(res.data.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, viewmorebets: false }));
  };
  if (!data) {
    return <h1 style={{ margin: "auto" }}>Not found</h1>;
  }

  return (
    <>
      <Modal
        title="Bet List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
        destroyOnClose
      >
        <CasionBetTable data={viewMoreData} />
      </Modal>
      {data?.map((res) => {
        return (
          <React.Fragment key={res.imageUrl + res.gameId}>
            <div className={"casino-card"}>
              <img src={res.imageUrl} alt="" />
              <div className="card-overlay">
                <h4 onClick={() => showModal(res.gameId)}>View more</h4>
              </div>
              <span>
                Count:
                {
                  count?.find((i) => i.matchId === res.gameId)?.betCount || 0
                  // ? count[index]?.matchId
                  // : 0
                }
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CasionCard;
