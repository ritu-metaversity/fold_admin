import React from "react";
import { Layout } from "antd";
import "./styles.scss";

import LoginHeader from "../../components/loginHHeader/LoginHeader";
import UpComingComponent from "../../components/upComingComponent/UpComingComponent";
import Slider from "../../components/slider/Slider";
import GameImageComponent from "../../components/gameImageComponent/GameImageComponent";
import { useState } from "react";
import TopWinnerSlider from "../../components/topWinnerSlider/TopWinnerSlider";
import { Footer } from "antd/es/layout/layout";
import LoginFooter from "../../components/loginFooter/LoginFooter";
const { Header, Content } = Layout;
const Login = ({logo}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="layout-body">
      {/* <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
        <Header className="login-header">
          <h3>ADMIN LOGIN</h3>
        </Header>
        <Layout style={{ height: "100vh", backgroundColor: "#16191c" }}>
          <Content className="login-container">
            <div className="center-div"> */}

      {/* </div>
          </Content>
        </Layout>
      </Layout> */}
      <Layout className="layout-comp">
        <Header className="header-div">
          <LoginHeader setOpen={setOpen} open={open} logo={logo}/>
        </Header>
        <Content className="login-content">
          <UpComingComponent />

          <Slider />
          <GameImageComponent setOpen={setOpen} open={open} />
          <GameImageComponent setOpen={setOpen} open={open} />
          {/* <TopWinnerSlider /> */}
          <Footer style={{ background: "transparent" }}>
            <LoginFooter />
          </Footer>
        </Content>
      </Layout>
    </div>
  );
};

export default Login;
