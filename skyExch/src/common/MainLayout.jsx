import { Layout } from "antd";
import HeaderComponent from "../layout/header";
import { Outlet } from "react-router-dom";
import NavigationHeader from "../component/navigationHeader/web";
import { useMediaQuery } from "../component/useMedia";
import MobileFooter from "../layout/footer/mobileFooter";
////styles
import "./styles.scss";

const { Header, Content } = Layout;
const MainLayout = () => {
  const isMobile = useMediaQuery("(min-width: 1280px)");

  return (
    <Layout className="mainlayout">
      <Header className="mainlayout-header">
        <HeaderComponent />
        {isMobile && <NavigationHeader />}
      </Header>
      <Content className="mainlayout-content">
        <Outlet />
      </Content>

      {/* <Footer className="mainlayout-footer"> */}
      <MobileFooter />
      {/* </Footer> */}
    </Layout>
  );
};

export default MainLayout;
