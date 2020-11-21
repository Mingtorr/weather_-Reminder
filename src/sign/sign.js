import React, { Component } from 'react';
import umb from './umbrella.png'
import './sign.css';
import  Raining from '../login/rain'

export default class Sign extends React.Component{
    render(){
        return(
            <div>
                <Raining/>
                <div className="login_div">
                    <div className="login3">

                    </div>
                    <div className="login1">
                        <div className="sign_title">
                            <p style={{marginRight:10}}>회원가입</p>
                            <img src={umb} height="30px" width="30px"/>
                        </div>
                    </div>
                    <div className="login2">
                        <div className="margin2">
                            <div className="sign_input1">
                                <div className="sign_label">
                                    <p>아이디</p>
                                    <button>중복확인</button>
                                </div>
                                <div className="sign_input_1"> 
                                    <input placeholder="아이디를 입력하세요."/>
                                </div>
                            </div>
                            <div className="sign_input1">
                                <div className="sign_label">
                                    <p>비밀번호</p>
                                </div>
                                <div className="sign_input_1"> 
                                    <input placeholder="비밀번호를 입력하세요."/>
                                </div>
                            </div>
                            <div className="sign_input1">
                                <div className="sign_label">
                                    <p>비밀번호확인</p>
                                </div>
                                <div className="sign_input_1"> 
                                    <input placeholder="비밀번호를 한번더 입력하세요."/>
                                </div>
                                <p id="pw_info">비밀번호가 일치하지 않습니다.</p>
                            </div>
                            <div className="sign_input1">
                                <div className="sign_label">
                                    <p>이메일</p>
                                </div>
                                <div className="sign_input_1"> 
                                    <input placeholder="이메일 입력하세요."/>
                                </div>
                            </div>
                            <div className="sign_input1">
                                <div className="sign_label">
                                    <p>인증번호</p>
                                </div>
                                <div className="email_code"> 
                                    <input placeholder="인증번호 입력하세요."/>
                                    <button>확인</button>
                                </div>
                            </div>
                            <div className="sign_input1">
                                
                            </div>
                            <div className="sign_input3">
                                <button id="sign_button">회원가입</button>
                            </div>
                        </div>
                    </div>
                    <div className="login1">

                    </div>
                </div>
                <div className="end2">
                    <p>Create By 창원대 컴퓨터공학과 정영빈,박민철</p>
                </div>
            </div>
        )
    }
}