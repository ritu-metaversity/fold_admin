import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const NoteFound = () => {
  const userType = localStorage.getItem("userType");
  const poweruser_permisions = localStorage.getItem("poweruser_permisions");

  const redirect = {
    DEPOSIT: "Deposit-Pending-Request",
    WITHDRAW: "Widrwal-Pending-Request",
    ALL: "Deposit-Pending-Request",
  };
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <NavLink
              to={
                userType === "7"
                  ? redirect[poweruser_permisions]
                  : "/marketAnalysis} "
              }
              style={{ color: "white" }}
            >
              Back Home
            </NavLink>
          </Button>
        }
      />
    </div>
  );
};

export default NoteFound;
