import { Button } from "antd";
import OddsBtn from "../oddsBtn";
import { useState } from "react";
import BetPlaceBinary from "../betPlaceModuleBinary";

const BinaryTable = () => {
  const [expand, setexpand] = useState(0);
  return (
    <div className="binary-table">
      <table>
        <tr className="no-yes-row">
          <td></td>
          <td></td>
          <td className="no-yes">
            <Button>NO</Button>
            <Button>Yes</Button>
          </td>
          <td className="max-min-bet"></td>
        </tr>
        {[1, 2, 3, 5, 6, 7].map((curElm, index) => {
          return (
            <>
              <tr className="table-data-row" key={curElm}>
                <td>CRUDEOIL</td>
                <td>
                  <li>
                    <span>23:30 PM</span>
                  </li>
                </td>
                <td>
                  <OddsBtn
                    bg="#faa9ba"
                    setexpand={setexpand}
                    indexKey={index + 1}
                  />
                  <OddsBtn
                    bg="#72bbef"
                    setexpand={setexpand}
                    indexKey={index + 1}
                  />
                </td>
                <td className="max-min-bet">
                  <p>Min/Max </p>
                  <p>1.00 / 80.00</p>
                </td>
              </tr>
              <div className={index + 1 === expand ? "expand2" : "expand"}>
                {/* <Button onClick={() => setexpand(!expand)}> */}
                <BetPlaceBinary />
                {/* </Button> */}
              </div>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default BinaryTable;
