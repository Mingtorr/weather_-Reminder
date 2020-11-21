import React, { Component } from 'react';
import './main.css';
import umb from './umbrella.png'

export default class Main2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options: [
                {
                  name: '1:00',
                  value: null,
                },
                {
                  name: '2:00',
                  value: 'a',
                },
                {
                  name: '3:00',
                  value: 'b',
                },
                {
                  name: '4:00',
                  value: 'c',
                },
                {
                  name: '5:00',
                  value: null,
                },
                {
                  name: '6:00',
                  value: 'a',
                },
                {
                  name: '7:00',
                  value: 'b',
                },
                {
                  name: '8:00',
                  value: 'c',
                },
                {
                  name: '9:00',
                  value: null,
                },
                {
                  name: '10:00',
                  value: 'a',
                },
                {
                  name: '11:00',
                  value: 'b',
                },
                {
                  name: '12:00',
                  value: 'c',
                },
                {
                  name: '13:00',
                  value: null,
                },
                {
                  name: '14:00',
                  value: 'a',
                },
                {
                  name: '15:00',
                  value: 'b',
                },
                {
                  name: '16:00',
                  value: 'c',
                },
                {
                  name: '17:00',
                  value: null,
                },
                {
                  name: '18:00',
                  value: 'a',
                },
                {
                  name: '19:00',
                  value: 'b',
                },
                {
                  name: '20:00',
                  value: 'c',
                },
                {
                  name: '21:00',
                  value: null,
                },
                {
                  name: '22:00',
                  value: 'a',
                },
                {
                  name: '23:00',
                  value: 'b',
                },
                {
                  name: '24:00',
                  value: 'c',
                },
              ],
        }
    }
    render(){
        return(
            <div className="main2">
                <div>
                    <p>지역을 입력하세요</p>
                  </div>
                  <div id="region">
                  <select>
                    {this.state.options.map(o => (
                      <option value={o.value}>{o.name}</option>
                    ))}
                  </select>
                  <select>
                    {this.state.options.map(o => (
                      <option value={o.value}>{o.name}</option>
                    ))}
                  </select>
                  <select>
                    {this.state.options.map(o => (
                      <option value={o.value}>{o.name}</option>
                    ))}
                  </select>
                  </div>
                  <div>
                    <p>이메일을 받을 시간을 입력하세요</p>
                  </div>
                  <div id="email_time">
                  <select>
                    {this.state.options.map(o => (
                      <option value={o.value}>{o.name}</option>
                    ))}
                  </select>
                  </div>
                </div>
                
        )
    }
}