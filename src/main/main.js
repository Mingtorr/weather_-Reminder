import React, { Component } from "react";
import "./main.css";
import umb from "./umbrella.png";
import Main2 from "./main2";
import Raining from "../login/rain";
import Rain from "./rain.png";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: <button onClick={this.onclick}>신청하기</button>,
      progress2: "",
      main: <Main2 tounder={this.tounder} />,
      data: "",
      cart: [],
    };
  }
  componentWillMount() {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/";
      alert("로그인하세요");
    }
  }

  tounder = (box) => {
    this.setState({
      cart: box,
    });
    console.log(box);
  };
  onclick = () => {
    this.setState({
      progress: <button onClick={this.onclickcancle}>취소하기</button>,
      progress2: <div className="circle"></div>,
      main: "",
      data: <p>선택한시간 3:00 지역:창원시</p>,
    });
  };
  onclickcancle = () => {
    this.setState({
      progress: <button onClick={this.onclick}>신청하기</button>,
      progress2: "",
      main: <Main2 tounder={this.tounder} />,
      data: "asdasd",
    });
  };

  logout = () => {
    localStorage.removeItem("user"); //로컬스토리지 지우기
    window.location.href = "/";
  };

  render() {
    return (
      <div className="main">
        <Raining />

        <div className="main1">
          <p style={{ marginRight: 10 }}>우산 알리미</p>
          <img src={umb} height="30px" width="30px" />
        </div>
        <div className="main2">
          {this.state.data}
          {this.state.main}
        </div>
        <div id="logout">
          <button onClick={this.logout}>로그아웃</button>
        </div>
        <div className="main3">
          {this.state.progress}
          {this.state.progress2}
        </div>
      </div>
    );
  }
}
