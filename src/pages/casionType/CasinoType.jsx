import React, { useContext, useState } from "react";
import "./styles.scss";
import { Button, Input } from "antd";
import { LoaderContext } from "../../App";
import { Casino_Type_Image, Casino_Type_Screen } from "../../routes/Routes";
import axios from "axios";
import { notifyToast } from "../../components/toast/Tost";
import { NavLink } from "react-router-dom";
const CasinoType = () => {
  const { setLoading } = useContext(LoaderContext);
  const [value, setvalue] = useState({
    casinoImageGroupName: "",
  });
  const [error, seterror] = useState(false);
  const casionTypeImage = async () => {
    setLoading((prev) => ({ ...prev, DasboardLoading: true }));
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/${Casino_Type_Image}`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          notifyToast().succes(res.data.message);
        } else {
          notifyToast().error(res.data.message);
        }
        // setDashBoardDataState(res.data.data);
        //   setCricket(res?.data?.data);
      })
      .catch((error) => {});
    setLoading((prev) => ({ ...prev, DasboardLoading: false }));
  };
  const valueCheck = () => {
    if (value.casinoImageGroupName) {
      casionTypeImage();
    } else {
      seterror(true);
      notifyToast().error("Please Enter value");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setvalue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (!value) {
      seterror(true);

      notifyToast().error("Please Enter value");
    } else {
      seterror(false);
    }
  };
  return (
    <div>
      <div className="hading-create-accounts">
        <h4>Casino type Image</h4>
        <p>
          <NavLink to="/marketAnalysis">Home / </NavLink>
          <NavLink to={Casino_Type_Screen} style={{ color: "#74788d" }}>
            Casino type Image
          </NavLink>
        </p>
      </div>

      <div className="casino-type-form-container">
        <p>
          <label>Enter Casino Type Image</label>
        </p>
        <p>
          <Input
            name="casinoImageGroupName"
            value={value.casinoImageGroupName}
            onChange={(e) => handleChange(e)}
            style={{ borderColor: error ? "red" : "" }}
          ></Input>
        </p>
        <p style={{ width: "100%", textAlign: "right" }}>
          <Button onClick={valueCheck}>Submit</Button>
        </p>
      </div>
    </div>
  );
};

export default CasinoType;
