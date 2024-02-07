import axios from "axios";
import moment from "moment";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const DownloadReport = ({
  reportType,
  dataReport,
  header,
  reportFile,
  pnlHeader,
  pnlAmount,
}) => {
  const newDate = new Date();

  const downloadReport = () => {
    let data = JSON.stringify({
      ...dataReport,
      // reportColumnName: header,
      // reportType: reportType,
      // balanceDataName: pnlHeader,
      // pnlBetAmountResponse: pnlAmount,
    });
    let config = {
      responseType: "blob",
      method: "POST",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL}/maggibookExcel/maggiBook-excel-file-download`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        function download(blob) {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.setAttribute(
            "download",
            `${reportFile}_${moment(newDate).format("DD-MM-YYYY, hh:mm")}.xlsx`
          );
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
        function showInOtherTab(blob) {
          download(blob, "myledger-report.xlsx");
        }
        showInOtherTab(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button
        onClick={() => downloadReport()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 10px 8px 10px",
          borderRadius: "4px",
          border: "none",
          marginBottom: "10px",
          background: "green",
          color: "white",
          cursor: "pointer",
        }}
      >
        Download Report <AiOutlineDownload />
      </button>
    </>
  );
};

export default DownloadReport;
