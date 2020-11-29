import React from "react";
import umb from "./umbrella.png";
import "./sign.css";
import Raining from "../login/rain";

export default class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      passwd: "",
      passwd2: "",
      email: "",
      checked_id: false, // ID 중복검사
      checked_email: false, // 메일 인증 확인
      authNum: "", //보낸 인증번호
      authCheckNum: "", // 사용자가 적은 인증번호
      sendEmailClick: false,
      checked_passwd: "비밀번호가 일치하지 않습니다.",
      checking_passwd: false,
    };
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      this.checkpw
    );
  };

  checkpw = () => {
    if (this.state.passwd === this.state.passwd2 && this.state.passwd !== "") {
      this.setState({
        checked_passwd: "비밀번호가 일치합니다.",
        checking_passwd: true,
      });
    } else {
      this.setState({
        checked_passwd: "비밀번호가 일치하지 않습니다.",
        checking_passwd: false,
      });
    }
  };

  sendEmail = (e) => {
    e.preventDefault();
    this.setState({
      sendEmailClick: true,
    });
    const email = {
      sendEmail: this.state.email,
    };
    fetch("api/Sendmail", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === true) {
          alert("이미 가입된 메일입니다.");
        } else {
          alert("인증 메일이 전송되었습니다.");
          this.setState({
            authNum: json,
          });
        }
      });
  };

  // 인증메일을 확인한다.
  authEmail = (e) => {
    e.preventDefault();
    if (this.state.authNum.toString() === this.state.authCheckNum.toString()) {
      alert("인증성공");
      this.setState({
        checked_email: true,
      });
    } else {
      alert("인증실패");
    }
  };

  check = (re, what, message) => {
    if (re.test(what)) {
      return true;
    }
    alert(message);
    return false;
  };

  checkId = (e) => {
    e.preventDefault();
    var re = /^[a-zA-Z0-9]{4,12}$/; //아이디는 4~12자의 영문 대소문자와 숫자로만 입력
    if (!this.check(re, this.state.id, "아이디는 4~12자의 영문 대소문자와 숫자로만 입력가능합니다.")) {
      return;
    } else {
      const checkId = {
        check_Id: this.state.id,
      };
      fetch("api/CheckId", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(checkId),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert("사용가능한 아이디 입니다.");
            this.setState({
              checked_id: true,
            });
          } else {
            alert("이미 사용중인 아이디 입니다.");
          }
        });
    }
  };
  onSubmit = (e) => {
    e.preventDefault(); //이벤트 발생시 새로고침을 안하게 한다.
    var checkpass = this.state.passwd;
    checkpass = checkpass.replace(/(\s*)/g, "");
    console.log(checkpass.charAt(0));
    if (this.state.id.length > 100 || this.state.passwd.length > 100) {
      alert("아이디와 비밀번호의 길이가 너무 깁니다!!");
      return;
    }
    if (!this.state.checked_id) {
      alert("아이디 중복검사를 해주세요");
    } else if (!(this.state.passwd === this.state.passwd2)) {
      alert("비밀번호가 일지하지 않습니다.");
    } else if (checkpass === "") {
      alert("비밀번호에 공백은 들어가서는 안됩니다.");
    } else if (!this.state.checked_email) {
      alert("메일 인증을 해주세요");
    } else {
      const user_info = {
        id: this.state.id,
        passwd: this.state.passwd2,
        email: this.state.email,
      };
      fetch("api/Signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert("회원가입 성공");
            window.location.href = "/";
          } else {
            alert("회원가입 실패");
          }
        });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Raining />
          <div className="login_div">
            <div className="login3"></div>
            <div className="login1">
              <div className="sign_title">
                <p style={{ marginRight: 10 }}>회원가입</p>
                <img src={umb} alt="" height="30px" width="30px" />
              </div>
            </div>
            <div className="login2">
              <div className="margin2">
                <div className="sign_input1">
                  <div className="sign_label">
                    <p>아이디</p>
                    <button onClick={this.checkId}>중복확인</button>
                  </div>
                  <div className="sign_input_1">
                    <input type="text" id="name" name="id" value={this.state.id} onChange={this.handleChange} placeholder="아이디를 입력하세요." />
                  </div>
                </div>
                <div className="sign_input1">
                  <div className="sign_label">
                    <p>비밀번호</p>
                  </div>
                  <div className="sign_input_1">
                    <input type="password" id="pass" name="passwd" value={this.state.passwd} onChange={this.handleChange} placeholder="비밀번호를 입력하세요." />
                  </div>
                </div>
                <div className="sign_input1">
                  <div className="sign_label">
                    <p>비밀번호확인</p>
                  </div>
                  <div className="sign_input_1">
                    <input type="password" id="pass2" name="passwd2" value={this.state.passwd2} onChange={this.handleChange} placeholder="비밀번호를 한번더 입력하세요." />
                  </div>
                  <p id="pw_info">{this.state.checked_passwd}</p>
                </div>
                <div className="sign_input1">
                  <div className="sign_label">
                    <p>이메일</p>
                    <button onClick={this.sendEmail}>인증번호전송</button>
                  </div>
                  <div className="sign_input_1">
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="이메일 입력하세요." />
                  </div>
                </div>
                <div className="sign_input1">
                  <div className="sign_label">
                    <p>인증번호</p>
                  </div>
                  <div className="email_code">
                    <input type="text" id="authCheckNum" name="authCheckNum" value={this.state.authCheckNum} onChange={this.handleChange} placeholder="인증번호 입력하세요." />
                    <button onClick={this.authEmail}>확인</button>
                  </div>
                </div>
                <div className="sign_input1"></div>
                <div className="sign_input3">
                  <button id="sign_button" type="submit">
                    회원가입
                  </button>
                </div>
              </div>
            </div>
            <div className="login1"></div>
          </div>
          <div className="end2">
            <p>Create By 창원대 컴퓨터공학과 정영빈,박민철</p>
          </div>
        </form>
      </div>
    );
  }
}
