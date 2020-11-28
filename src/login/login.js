import React, { Component } from "react";
import "./login.css";
import Rain from "./rain.png";
import water from "./water.png";
import umb from "./umbrella.png";
import Raining from "./rain";
// import all the styles
import "react-rain-animation/lib/style.css";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      passwd: "",
      success: false,
    };
  }

  handleName = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: this.state.id,
      passwd: this.state.passwd,
    };
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === false) alert("아이디와 비밀번호를 확인하세요");
        else {
          window.localStorage.setItem("user", json[0].user_key);
          window.location.replace("/Main");
        }
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Raining />
          <div className="login_picture">
            <div className="login_picture_in">
              <img src={Rain} />
            </div>
          </div>
          <div className="login_title">
            <p>우산 알리미</p>
            <img src={umb} height="30px" width="30px" />
          </div>
          <div className="login_input">
            <div className="login_input_in">
              <div className="login_input1">
                <div className="login_1abel">
                  <p>아이디</p>
                </div>
                <div className="input1">
                  <input placeholder="ID" type="text" id="id" name="id" value={this.state.id} onChange={this.handleName} />
                </div>
              </div>
              <div className="login_input1">
                <div className="login_1abel">
                  <p>비밀번호</p>
                </div>
                <div className="input1">
                  <input placeholder="Password" type="password" id="passwd" name="passwd" value={this.state.passwd} onChange={this.handleName} />
                </div>
              </div>
              <div className="login_input2">
                <button type="submit">로그인</button>
              </div>
              <div className="go_sign">
                <a href="/sign">가입하기</a>
              </div>
            </div>
          </div>
          <div className="end">
            <p>Create By 창원대 컴퓨터공학과 정영빈,박민철</p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
