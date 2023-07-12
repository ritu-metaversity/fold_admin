import { Input } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import logo from "../../assets/img/logo.png";
import { IoIosLogOut } from "react-icons/io";
import ButtonComponent from "../../component/button";
import { useMediaQuery } from "../../component/useMedia";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

///styles
import "./styles.scss";

const HeaderComponent = () => {
  const isMobile = useMediaQuery("(min-width: 780px)");

  return (
    <>
      <div className="header-container">
        <div className="left-col-header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="event-search-bar">
            <Input placeholder="Search Events" prefix={<SearchOutlined />} />
          </div>
        </div>
        <div className="right-col-header">
          <ul>
            {isMobile && (
              <>
                <li>
                  <Input placeholder="Username" />
                </li>
                <li>
                  <Input placeholder="Password" />
                </li>
                <li>
                  <Input placeholder="Validation" />
                </li>
              </>
            )}

            <li>
              {!isMobile ? (
                <Link to="/login">
                  <ButtonComponent
                    name="Login"
                    bg="#e83523"
                    icon={<FaUser />}
                    height={!isMobile ? "36px" : "25px"}
                    color="white"
                    m={true}
                    gradient="linear-gradient(-180deg, #f72424 0%, #bb1c00 100%)"
                  />
                </Link>
              ) : (
                <ButtonComponent
                  name="Login"
                  bg="#e83523"
                  icon={<IoIosLogOut />}
                  height={!isMobile ? "36px" : "25px"}
                  color="white"
                  gradient="linear-gradient(-180deg, #f72424 0%, #bb1c00 100%)"
                />
              )}
            </li>
            <li>
              <ButtonComponent
                name="Sign up"
                bg="#666"
                //   icon={<IoIosLogOut />}
                height={!isMobile ? "36px" : "25px"}
                color="white"
                gradient="linear-gradient(-180deg, #666666 0%, #333333 100%)"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
