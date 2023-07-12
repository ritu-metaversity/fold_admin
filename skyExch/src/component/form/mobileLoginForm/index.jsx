import logo from "../../../assets/img/logo2.png";
import whtsAppImg from "../../../assets/img/whtsapp3.svg";
import { RxCross2 } from "react-icons/rx";
import supportImg from "../../../assets/img/whtapp2.svg";
import { Button, Input } from "antd";
import Support from "../../supportDiv/index";
import Social from "../../socialDiv";
import skype from "../../../assets/img/skype2.svg";
import telegram from "../../../assets/img/telegram2.svg";
import insta from "../../../assets/img/insta2.svg";
///styles
import "./styles.scss";
import { Link } from "react-router-dom";
const MobileLoginForm = () => {
  return (
    <div>
      <div className="mobile-login-form-container">
        <div className="mobile-login-form-top-col">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          <div className="betfair-wrap">
            <p>Powered by</p>
            <span>
              {/* <img
                src="images/mobile/login/betfair_black.png"
                alt=""
                draggable="false"
              /> */}
            </span>
          </div>
          <Link to="/">
            <div className="cross-icon">
              <RxCross2 />
            </div>
          </Link>
        </div>
        <div className="mobile-login-form-bottom-col">
          <div className="login-form-input-div">
            <Input placeholder="Username" />
            <Input placeholder="password" />
            <Input placeholder="Validation Code" />
            <Button>Login </Button>
          </div>
          <ul className="mobile-login-policy-link">
            <li>
              <span> Privacy Policy</span>
            </li>
            <li>
              <span> Terms and Conditions</span>
            </li>
            <li>
              <span> Rules and Regulations</span>
            </li>
            <li>
              <span> KYC</span>
            </li>
            <li>
              <span> Responsive Gaming</span>
            </li>
            <li>
              <span> About Us</span>
            </li>
            <li>
              <span> Self-exclusion Policy</span>
            </li>
            <li>
              <span> Underage Policy</span>
            </li>
          </ul>
          <div className="mobile-login-support-div">
            <Support
              img={supportImg}
              name1="Customer support1"
              name2="support2"
              bg="rgba(255, 255, 255, 0.6)"
              color="rgba(0,0,0,.7)"
            />
            <Support
              img={whtsAppImg}
              name1="WhatsApp 3"
              name2="WhatsApp 4"
              bg="rgba(255, 255, 255, 0.6)"
              color="rgba(0,0,0,.7)"
            />
          </div>
          <div className="mobile-login-social-div">
            <Social
              img={skype}
              name="Skype"
              bg="rgba(255, 255, 255, 0.6)"
              color="rgba(0,0,0,.7)"
              width="31%"
            />
            <Social
              img={telegram}
              name="telegram"
              bg="rgba(255, 255, 255, 0.6)"
              color="rgba(0,0,0,.7)"
              width="31%"
            />
            <Social
              img={insta}
              name="instagram"
              width="31%"
              bg="rgba(255, 255, 255, 0.6)"
              color="rgba(0,0,0,.7)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLoginForm;
