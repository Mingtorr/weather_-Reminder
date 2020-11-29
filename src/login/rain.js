import React from "react";
import "./login.css";
import water from "./water.png";

export default class Raining extends React.Component {
  render() {
    return (
      <div className="rain_bar">
        <div className="rain5">
          <img src={water} alt="" width="20px" height="20px" />
        </div>
        <div className="rain1">
          <img src={water} alt="" width="20px" height="20px" />
        </div>
        <div className="rain2">
          <img src={water} alt="" width="20px" height="20px" />
        </div>
        <div className="rain3">
          <img src={water} alt="" width="20px" height="20px" />
        </div>
        <div className="rain4">
          <img src={water} alt="" width="20px" height="20px" />
        </div>
      </div>
    );
  }
}
