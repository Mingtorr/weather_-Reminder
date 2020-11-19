import React, { Component } from 'react';
import './login.css';
import Rain from './rain.png'
import water from './water.png'
import ReactRain from 'react-rain-animation';
 
// import all the styles
import "react-rain-animation/lib/style.css";
class Login extends React.Component{
  render(){
    return(
      <div>
          <div className="rain_bar">
          <div className="rain5">
              <img src={water} width="20px" height="20px"/>
            </div>
            <div className="rain1">
            <img src={water} width="20px" height="20px"/>
           </div>
           <div className="rain2">
           <img src={water} width="20px" height="20px"/>
           </div>
           <div className="rain3">
           <img src={water} width="20px" height="20px"/>
           </div>
           <div className="rain4">
           <img src={water} width="20px" height="20px"/>
           </div>
          </div>
          <div className="login_picture">
              <div className="login_picture_in">
                  <img src={Rain}/>
              </div>
          </div>
          <div className="login_title">
              <p>우산 알리미</p>
          </div>
          <div className="login_input">
              <div className="login_input_in">
                  <div className="login_input1">
                     <div className="login_1abel">
                         <p>아이디</p>
                    </div>
                    <div className="input1">
                            <input/>
                    </div>
                  </div>
                  <div className="login_input1">
                     <div className="login_1abel">
                         <p>비밀번호</p>
                    </div>
                    <div className="input1">
                            <input/>
                    </div>
                  </div>
                  <div className="login_input2">
                      <button>로그인</button>
                  </div>
                  <div className="go_sign">
                      <a href="">가입하기</a>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default Login;
