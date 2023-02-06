import React from "react";
import { Layout } from "antd";
import "./styles.scss";
import Loginform from "../../components/form/Form";
const { Header, Content } = Layout;
const Login = () => {
  return (
    <>
      <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
        <Header className="login-header">
          <h3>ADMIN LOGIN</h3>
        </Header>
        <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
          <Content className="login-container">
            <div className="center-div">
              <Loginform />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Login;
