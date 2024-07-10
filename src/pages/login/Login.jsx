import React from "react";
import { Layout } from "antd";
import "./styles.scss";

import LoginHeader from "../../components/loginHHeader/LoginHeader";
import UpComingComponent from "../../components/upComingComponent/UpComingComponent";
import Slider from "../../components/slider/Slider";
import GameImageComponent from "../../components/gameImageComponent/GameImageComponent";
import { useState } from "react";
import { Footer } from "antd/es/layout/layout";
import LoginFooter from "../../components/loginFooter/LoginFooter";
import { useMediaQuery } from "../../components/modalForm/UseMedia";
import HeaderSliderComponent from "../../components/headerSlider/HeaderSliderComponent";


const { Header, Content } = Layout;
const Login = ({ logo, message }) => {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1275px)");

 
  return (
    <div className="layout-body">
      <Layout className="layout-comp">
        <Header className="header-div">
          <LoginHeader setOpen={setOpen} open={open} logo={logo} />
        </Header>
        <Content className="login-content">
          <UpComingComponent message={message} />
          {isMobile && <HeaderSliderComponent />}
          <Slider />
          {/* <GameImageComponent setOpen={setOpen} open={open} /> */}
          {/* <TopWinnerSlider /> */}
          {/* <Footer style={{ background: "transparent" }}>
            <LoginFooter />
          </Footer> */}
        </Content>
      </Layout>
    </div>
  );
};

export default Login;
