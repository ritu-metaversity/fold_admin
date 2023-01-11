import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const NoteFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <NavLink to="/marketAnalysis" style={{ color: "white" }}>
              Back Home
            </NavLink>
          </Button>
        }
      />
    </div>
  );
};

export default NoteFound;
