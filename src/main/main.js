import React, { Component } from 'react';
import './main.css';
import umb from './umbrella.png'
import Main2 from './main2'
import Raining from '../login/rain'
export default class Main extends React.Component{
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
            progress:<button onClick={this.onclick}>신청하기</button>,
            progress2:'',
            main:<Main2/>,
            data:''
        }
    }
    componentDidMount(){

    }
    onclick=()=>{
      this.setState({
        progress:<button onClick={this.onclickcancle}>취소하기</button>,
        progress2:<div className="circle"></div>,
        main:'',
        data:<p>선택한시간 3:00 지역:창원시</p>
      })
    }
    onclickcancle=()=>{
      this.setState({
        progress:<button onClick={this.onclick}>신청하기</button>,
            progress2:'',
            main:<Main2/>,
            data:''
      })
    }
    render(){
        return(
            <div className="main">
              <Raining/>
                <div className="main1">
                    <p style={{marginRight:10}}>우산 알리미</p>
                    <img src={umb} height="30px" width="30px"/>
                </div>
                <div className="main2">
                  {this.state.data}
                  {this.state.main}
                </div>
                <div className="main3">
                  {this.state.progress}
                  {this.state.progress2}
                </div>
            </div>
        )
    }
}