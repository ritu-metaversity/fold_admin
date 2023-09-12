import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { HelperActiveUser_Screen } from "../../routes/Routes";

const NoteFound = () => {
  const userType = localStorage.getItem("userType");
  const poweruser_permisions = JSON.parse(
    localStorage.getItem("poweruser_permisions") || "[]"
  );

  const redirect = {
    DEPOSIT: "Deposit-Pending-Request",
    WITHDRAW: "Widrwal-Pending-Request",
    ALL: "Deposit-Pending-Request",
    USER_LOCK: HelperActiveUser_Screen,
    ACTIVE_USER: HelperActiveUser_Screen,
    USER_PASSWORD_CHANGE: HelperActiveUser_Screen,
    BET_LOCK: HelperActiveUser_Screen,
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
                  ? redirect[poweruser_permisions[0]]
                  : "/marketAnalysis}"
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


