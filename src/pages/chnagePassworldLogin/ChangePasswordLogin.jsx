import React from "react";
import { Layout } from "antd";
import ChangePasswordLoginForm from "../../components/form/ChangePassworldLoginForm";

import "./styles.scss";

const { Header, Content } = Layout;
const ChangePasswordLogin = () => {
  return (
    <>
      <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
        {/* <Header className="login-header">
          <h3>ADMIN LOGIN</h3>
        </Header> */}
        <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
          <Content className="change-pwd-container">
            <div className="center-div">
              <ChangePasswordLoginForm />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ChangePasswordLogin;
