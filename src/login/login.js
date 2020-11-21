import React, { Component } from 'react';
import './login.css';
import Rain from './rain.png'
import water from './water.png'
import umb from './umbrella.png'
import  Raining from './rain'
// import all the styles
import "react-rain-animation/lib/style.css";
class Login extends React.Component{
  render(){
    return(
      <div>
          <Raining/>
          <div className="login_picture">
              <div className="login_picture_in">
                  <img src={Rain}/>
              </div>
          </div>
          <div className="login_title">
              <p>우산 알리미</p>
              <img src={umb} height="30px" width="30px"/>
          </div>
          <div className="login_input">
              <div className="login_input_in">
                  <div className="login_input1">
                     <div className="login_1abel">
                         <p>아이디</p>
                    </div>
                    <div className="input1">
                            <input placeholder="ID"/>
                    </div>
                  </div>
                  <div className="login_input1">
                     <div className="login_1abel">
                         <p>비밀번호</p>
                    </div>
                    <div className="input1">
                            <input placeholder="Password"/>
                    </div>
                  </div>
                  <div className="login_input2">
                      <button>로그인</button>
                  </div>
                  <div className="go_sign">
                      <a href="/sign">가입하기</a>
                  </div>
              </div>
          </div>
          <div className="end">
              <p>Create By 창원대 컴퓨터공학과 정영빈,박민철</p>
          </div>
      </div>
    )
  }
}

export default Login;
