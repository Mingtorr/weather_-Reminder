import React, { Component } from "react";
import "./main.css";
import umb from "./umbrella.png";
import { markerdata } from "../markerdata";

export default class Main2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      selected_citycode: "",
      selected_city2: "",
      selected_city3: "",
      selected_nx: "",
      selected_ny: "",
      day: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      citycode: ["지역선택", "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치도", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도", "이어도"],
      city2: ["지역선택"],
      city3: ["지역선택"],
      check1: false,
      check2: false,
    };
  }
  selectChange3st = (e) => {
    console.log(e.target.value);

    this.setState({
      selected_city3: e.target.value,
    });

    const state = {
      city3: e.target.value,
      city2: this.state.selected_city2,
      city1: this.state.selected_citycode,
    };
    fetch("api/getCity3", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          selected_nx: json[0].nx,
          selected_ny: json[0].ny,
          check1: true,
        });
      });
  };

  selectChange2st = (e) => {
    this.setState({
      selected_city2: e.target.value,
      city3: ["지역선택"],
    });

    const state = {
      city2: e.target.value,
      city1: this.state.selected_citycode,
    };
    fetch("api/getCity2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((el) =>
          this.setState({
            city3: this.state.city3.concat(el.third),
          })
        );
      });
  };

  selectChange1st = (e) => {
    this.setState({
      selected_citycode: e.target.value,
      city2: ["지역선택"],
      city3: ["지역선택"],
    });

    const state = {
      state: e.target.value,
    };
    fetch("api/getCity", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length === 0) {
          this.setState({
            city2: ["지역선택"],
            city3: ["지역선택"],
          });
        }

        json.map((el) =>
          this.setState({
            city2: this.state.city2.concat(el.second),
          })
        );
      });
  };
  selectChange = (e) => {
    this.setState({
      selected: e.target.value,
      check2: true,
    });
  };
  componentDidUpdate() {
    if (this.state.check1 === true && this.state.check2 === true) {
      const box = [this.state.selected, this.state.selected_citycode, this.state.selected_city2, this.state.selected_city3, this.state.selected_nx, this.state.selected_ny];
      this.props.tounder(box);
    }
  }

  render() {
    return (
      <div className="main2">
        <div>
          <p>지역을 입력하세요</p>
        </div>
        <div>
          <select value={this.state.selected_citycode} onChange={this.selectChange1st}>
            {this.state.citycode.map((d) => (
              <option value={d}> {d}</option>
            ))}
          </select>

          <select valuse={this.state.selected_city2} onChange={this.selectChange2st}>
            {this.state.city2.map((d) => (
              <option value={d}> {d}</option>
            ))}
          </select>

          <select valuse={this.state.selected_city3} onChange={this.selectChange3st}>
            {this.state.city3.map((d) => (
              <option value={d}> {d}</option>
            ))}
          </select>
        </div>
        <div>
          <p>이메일을 받을 시간을 입력하세요</p>
        </div>
        <div id="email_time">
          <select value={this.state.selected} onChange={this.selectChange}>
            {this.state.day.map((d) => (
              <option value={d}> {d}:00</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
