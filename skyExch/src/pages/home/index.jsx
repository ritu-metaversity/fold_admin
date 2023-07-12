import { Col, Row } from "antd";
import Banner from "../../component/banner";
import Card from "../../component/homePageCard";
import { grid } from "./gridObj";
import FooterComponent from "../../layout/footer/webFooter";

////styles
import "./styles.scss";

const Home = () => {
  return (
    <div className="home-page-container">
      <div className="home-page-center-col">
        <Banner />
        <Row gutter={5}>
          {grid.map((gridPoint, index) => {
            return (
              <Col
                key={gridPoint?.lg + gridPoint.img + gridPoint.match + index}
                lg={gridPoint?.lg}
                sm={gridPoint.sm}
                xs={gridPoint.xs}
                md={gridPoint?.lg}
                className="card-col"
              >
                <Card
                  notification={gridPoint["match"]}
                  img={gridPoint["img"]}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Home;
