import React, { Component } from 'react';
import umb from './umbrella.png'

export default class Sign extends React.Component{
    render(){
        return(
            <div>
                <div className="login_div">
                    asdasd
                </div>
                <div className="login_title">
                    <p>우산 알리미</p>
                    <img src={umb} height="30px" width="30px"/>
                </div>
            </div>
        )
    }
}