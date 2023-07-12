/////styles
import { Button } from "antd";
import "./styles.scss";
import { modalHandleCancelRef } from "../modal";
const RulesOfBinary = () => {
  return (
    <>
      <div className="rules-binary-modal-heading">
        <h3>Rules of Binary</h3>
      </div>
      <div className="rules-modal-content">
        <ol>
          <li>All sessions bets will be confirmed at market rate only.</li>
          <li>
            All sessions settlement price means result can be checked from
            exchange official sites.
          </li>
          <li>
            All sessions result will be settlement price provided by exchange
            after market close.
          </li>
          <li>
            Every product has two types of prices SPOT and FUTURE. We provide
            only near months FUTURE price in Binary Session. You can check it
            from the official website of that product.
          </li>
          <li>
            Sessions timings : NFY, B-NFY, AXS, ICI, RIL, SBI, TT STL - Monday
            to Friday 09:20 a.m. to 3:30 p.m. GOLD, SILVER, CRUDE - Monday to
            Friday 09:05 a.m. to 11:30 p.m. CMX CRUDE, DOWJONES, NASDAQ, SNP -
            Monday to Friday 7:30 p.m. to 12:00 a.m.
          </li>
        </ol>
      </div>
      <div className="rules-modal-footer">
        <Button onClick={modalHandleCancelRef }>Ok</Button>
      </div>
    </>
  );
};

export default RulesOfBinary;
