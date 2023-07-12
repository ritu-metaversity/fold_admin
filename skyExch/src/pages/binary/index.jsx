import { IoMdRefresh } from "react-icons/io";
import DateHeading from "../../component/binaryTable/DateHeading";
import BinaryTable from "../../component/binaryTable";

////style
import "./styles.scss";

const Binary = () => {
  return (
    <>
      <div>
        <div className="binary-container">
          <div className="binary-left-col">
            <div className="game-heading">
              <h3>Binary</h3>
              <p>
                <IoMdRefresh />
              </p>
            </div>
            <div className="date-heading-container">
              <DateHeading />
              <BinaryTable />
            </div>
          </div>
          <div className="binary-right-col"></div>
        </div>
      </div>
    </>
  );
};

export default Binary;
