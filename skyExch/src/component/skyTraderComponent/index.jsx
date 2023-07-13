import { RxCross2 } from "react-icons/rx";
////styles
import "./styles.scss";
import { Input } from "antd";
const SkyTraderComponent = () => {
  return (
    <div>
      <div className="sky-trader-comp-header">
        <h2>Sky Trader</h2>
        <span>
          <RxCross2 />
        </span>
      </div>
      <div className="balance-div">
        <div className="main-balance-left-col">
          <p>Main Balance</p>
          <p>0.00</p>
        </div>
        <div className="skt-trader-balance-right-col">
          <p>Sky Trader Balance</p>
          <p>0.00</p>
        </div>
        <div className="amount-input">
          <Input placeholder="Amount" />
        </div>
      </div>
    </div>
  );
};

export default SkyTraderComponent;
