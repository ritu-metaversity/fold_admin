import React, { useState } from "react";
////styles
import "./styles.scss";
import { Button, Checkbox } from "antd";

const HeadingTodaySection = () => {
  const [filterToggle, setfilterToggle] = useState(false);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const checkBoxLabel = ["All", "Soccer", "Tennis", "Cricket", "E-Soccer"];
  return (
    <div className="heading-today-section">
      <ul>
        <li>Sport Filters:</li>
        <li>Cricket</li>
        <li className="e-soccer">E-Soccer</li>
        <li className="e-soccer">Soccer</li>
        <li className="e-soccer">Tennis</li>
      </ul>
      <Button
        className="today-section-filter-btn"
        onClick={() => setfilterToggle(!filterToggle)}
      >
        Filter
      </Button>
      {filterToggle && (
        <div className="filter-toggle-div">
          <ul className="filter-ul">
            {checkBoxLabel.map((curElm, index) => {
              return (
                <React.Fragment key={curElm + index}>
                  <li>
                    <Checkbox onChange={onChange} >{curElm}</Checkbox>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>

          <div className="filter-toggle-btn-div">
            <Button>Save </Button>
            <Button onClick={() => setfilterToggle(!filterToggle)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadingTodaySection;
